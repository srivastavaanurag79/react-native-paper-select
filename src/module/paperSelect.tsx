/* eslint-disable react-native/no-inline-styles */
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import {
  TextInput,
  Button,
  Dialog,
  Portal,
  Searchbar,
  ThemeProvider,
  useTheme,
  Text,
} from 'react-native-paper';
import CheckboxInput from '../components/checkBox';
import RadioInput from '../components/radioButton';
import SectionHeader from '../components/sectionHeader';
import ChipInput from '../components/chipInput';
import BottomSheet from '../components/bottomSheet';
import type {
  ListItem,
  PaperSelectProps,
  PaperSelectTextInputProps,
  Section,
} from '../interface/paperSelect.interface';

type FlatListItem =
  | { _type: 'header'; _id: string; title: string; sectionIndex: number }
  | { _type: 'item'; _id: string; value: string; disabled?: boolean };

const PaperSelect = ({
  // Required props
  label,
  arrayList,
  selectedArrayList,
  multiEnable,
  value,
  onSelection,

  // Core props
  disabled = false,
  hideSearchBox = false,
  selectAllEnable = true,
  textInputMode = 'flat',
  theme: themeOverrides,
  inputRef,
  limit = null,
  limitError,
  limitErrorStyle,

  // NEW: Presentation
  presentationStyle = 'dialog',

  // NEW: Sections
  sections,
  sectionHeaderStyle,
  sectionHeaderContainerStyle,

  // NEW: Chips
  showChips = false,
  chipStyle,
  chipTextStyle,

  // NEW: Single select variant
  singleSelectVariant = 'checkbox',
  radioButtonProps,

  // Localization props
  dialogTitle,
  selectAllText = 'Select all',
  searchText = 'Search',
  dialogCloseButtonText = 'Close',
  dialogDoneButtonText = 'Done',
  errorText,

  // Style props
  containerStyle,
  textInputStyle,
  textInputOutlineStyle,
  dialogStyle,
  dialogTitleStyle,
  searchStyle,
  dialogCloseButtonStyle,
  dialogDoneButtonStyle,
  errorStyle,
  textColor,

  // NEW: Bottom sheet styles
  bottomSheetStyle,
  bottomSheetBackgroundColor,
  bottomSheetHandleColor,
  bottomSheetTitleStyle,

  // Component props
  textInputProps: textInputPropOverrides,
  checkboxProps: checkboxPropsOverrides,
  searchbarProps: searchbarPropsOverrides,
  renderItem: customRenderItem,

  // testID props
  testID,
  dialogTestID,
  searchbarTestID,
  selectAllCheckboxTestID,
  itemCheckboxTestIDPrefix = 'checkbox-',
}: PaperSelectProps) => {
  const theme = useTheme(themeOverrides as any);
  const { height } = useWindowDimensions();

  const textInputIconProps = useMemo(
    () => ({
      style: styles.textInputIcon,
      size: 20,
      icon: 'chevron-down' as const,
    }),
    []
  );

  const textInputProps = useMemo<PaperSelectTextInputProps>(
    () => ({
      underlineColor: textInputPropOverrides?.underlineColor ?? 'black',
      activeUnderlineColor:
        textInputPropOverrides?.activeUnderlineColor ?? 'black',
      outlineColor: textInputPropOverrides?.outlineColor ?? 'black',
      activeOutlineColor: textInputPropOverrides?.activeOutlineColor ?? 'black',
      left: textInputPropOverrides?.left,
      right: textInputPropOverrides?.right ?? (
        <TextInput.Icon {...textInputIconProps} />
      ),
    }),
    [textInputPropOverrides, textInputIconProps]
  );

  const [searchKey, setSearchKey] = useState('');
  const [debouncedSearchKey, setDebouncedSearchKey] = useState('');
  const [selectedList, setSelectedList] = useState<ListItem[]>([
    ...selectedArrayList,
  ]);
  const [showLimitError, setShowLimitError] = useState(false);
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<View>(null);
  const [containerLayout, setContainerLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const selfInputRef = useRef<any>(null);
  const selectInputRef = inputRef ?? selfInputRef;
  const triggeredByOnCheckedSingle = useRef(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const useSections = sections != null && sections.length > 0;

  const effectiveArrayList = useMemo<ListItem[]>(() => {
    if (useSections) {
      return (sections as Section[]).flatMap((s) => s.data);
    }
    return arrayList;
  }, [useSections, sections, arrayList]);

  const filteredSections = useMemo<Section[] | null>(() => {
    if (!useSections) return null;
    if (!debouncedSearchKey) return sections as Section[];
    const lowercased = debouncedSearchKey.toLowerCase();
    return (sections as Section[])
      .map((s) => ({
        ...s,
        data: s.data.filter((item) =>
          item.value.toLowerCase().includes(lowercased)
        ),
      }))
      .filter((s) => s.data.length > 0);
  }, [useSections, sections, debouncedSearchKey]);

  const filteredList = useMemo(() => {
    if (!debouncedSearchKey) return effectiveArrayList;
    const lowercased = debouncedSearchKey.toLowerCase();
    return effectiveArrayList.filter((item) =>
      item.value.toLowerCase().includes(lowercased)
    );
  }, [effectiveArrayList, debouncedSearchKey]);

  const flatListData = useMemo<FlatListItem[]>(() => {
    if (!useSections || !filteredSections) {
      return filteredList.map((item) => ({ _type: 'item' as const, ...item }));
    }
    const result: FlatListItem[] = [];
    filteredSections.forEach((section, sIndex) => {
      result.push({
        _type: 'header',
        _id: `section-header-${sIndex}-${section.title}`,
        title: section.title,
        sectionIndex: sIndex,
      });
      section.data.forEach((item) => {
        result.push({ _type: 'item', ...item });
      });
    });
    return result;
  }, [useSections, filteredSections, filteredList]);

  const sectionDataMap = useMemo(() => {
    if (!useSections || !filteredSections) return new Map<number, ListItem[]>();
    const map = new Map<number, ListItem[]>();
    filteredSections.forEach((section, index) => {
      map.set(index, section.data);
    });
    return map;
  }, [useSections, filteredSections]);

  const selectedIdSet = useMemo(
    () => new Set(selectedList.map((val) => val._id)),
    [selectedList]
  );

  const sectionCheckedMap = useMemo(() => {
    if (!useSections || !filteredSections) return new Map<number, boolean>();
    const map = new Map<number, boolean>();
    filteredSections.forEach((section, index) => {
      const allSelected =
        section.data.length > 0 &&
        section.data.every((item) => selectedIdSet.has(item._id));
      map.set(index, allSelected);
    });
    return map;
  }, [useSections, filteredSections, selectedIdSet]);

  const hasDisabled = useMemo(
    () => effectiveArrayList.some((x) => x.disabled),
    [effectiveArrayList]
  );

  const isCheckedAll = useMemo(
    () =>
      selectedList.length > 0 &&
      selectedList.length === effectiveArrayList.length,
    [selectedList, effectiveArrayList]
  );

  const selectAllDisabled =
    hasDisabled ||
    (limit != null && limit > 0 && limit < effectiveArrayList.length);

  const displayLimitError =
    limitError ?? `You can't select more than ${limit} items.`;

  const errorTextStyle = useMemo(
    () => ({ color: theme.colors.error }),
    [theme.colors.error]
  );

  const useRadio = !multiEnable && singleSelectVariant === 'radio';

  const _hideDialog = useCallback(() => {
    setSearchKey('');
    setDebouncedSearchKey('');
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    setShowLimitError(false);

    const finalText = selectedList.map((val) => val.value).join(', ');

    onSelection({
      text: finalText,
      selectedList,
    });

    setVisible(false);
    selectInputRef?.current?.blur();
  }, [selectedList, onSelection, selectInputRef]);

  const _closeDialog = useCallback(() => {
    setVisible(false);
    setSearchKey('');
    setDebouncedSearchKey('');
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    setShowLimitError(false);
    selectInputRef?.current?.blur();
  }, [selectInputRef]);

  const _onFocus = useCallback(() => {
    Keyboard.dismiss();
    setSearchKey('');
    setDebouncedSearchKey('');
    setSelectedList(selectedArrayList);
    if (presentationStyle === 'menu' && containerRef.current) {
      containerRef.current.measureInWindow((x, y, width, h) => {
        setContainerLayout({ x, y, width, height: h });
        setVisible(true);
      });
    } else {
      setVisible(true);
    }
  }, [selectedArrayList, presentationStyle]);

  const _onChecked = useCallback(
    (item: ListItem) => {
      setSelectedList((prev) => {
        const index = prev.findIndex((val) => val._id === item._id);
        if (index > -1) {
          return prev.filter((val) => val._id !== item._id);
        }
        if (limit != null && prev.length >= limit) {
          setShowLimitError(true);
          return prev;
        }
        setShowLimitError(false);
        return [...prev, item];
      });
    },
    [limit]
  );

  const _onCheckedSingle = useCallback((item: ListItem) => {
    triggeredByOnCheckedSingle.current = true;
    setSelectedList((prev) => {
      if (prev.some((val) => val._id === item._id)) {
        return [];
      }
      return [item];
    });
  }, []);

  const _checkAll = useCallback(() => {
    setSelectedList((prev) =>
      prev.length === effectiveArrayList.length ? [] : [...effectiveArrayList]
    );
  }, [effectiveArrayList]);

  const _toggleSection = useCallback(
    (sectionIndex: number) => {
      const sectionItems = sectionDataMap.get(sectionIndex);
      if (!sectionItems) return;

      const allSelected = sectionCheckedMap.get(sectionIndex) ?? false;

      setSelectedList((prev) => {
        if (allSelected) {
          return prev.filter(
            (item) => !sectionItems.some((s) => s._id === item._id)
          );
        } else {
          const newItems = sectionItems.filter(
            (item) => !prev.some((p) => p._id === item._id)
          );
          if (limit != null && prev.length + newItems.length > limit) {
            setShowLimitError(true);
            return prev;
          }
          setShowLimitError(false);
          return [...prev, ...newItems];
        }
      });
    },
    [sectionDataMap, sectionCheckedMap, limit]
  );

  const _handleItemPress = useCallback(
    (item: ListItem) => {
      if (multiEnable) {
        _onChecked(item);
      } else {
        _onCheckedSingle(item);
      }
    },
    [multiEnable, _onChecked, _onCheckedSingle]
  );

  const _onChipRemove = useCallback((item: ListItem) => {
    setSelectedList((prev) => prev.filter((val) => val._id !== item._id));
  }, []);

  const _onSearchChange = useCallback((text: string) => {
    setSearchKey(text);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      setDebouncedSearchKey(text);
    }, 300);
  }, []);

  useEffect(() => {
    if (showLimitError) {
      const timeoutId = setTimeout(() => setShowLimitError(false), 10000);
      return () => clearTimeout(timeoutId);
    }
    return undefined;
  }, [showLimitError]);

  useEffect(() => {
    if (triggeredByOnCheckedSingle.current) {
      triggeredByOnCheckedSingle.current = false;
      _hideDialog();
    }
  }, [selectedList, _hideDialog]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!visible) {
      setSelectedList([...selectedArrayList]);
    }
  }, [selectedArrayList, visible]);

  const _renderItem = useCallback(
    ({ item }: { item: FlatListItem }) => {
      if (item._type === 'header') {
        const sectionChecked =
          sectionCheckedMap.get(item.sectionIndex) ?? false;
        return (
          <SectionHeader
            title={item.title}
            titleStyle={sectionHeaderStyle}
            containerStyle={sectionHeaderContainerStyle}
            showCheckbox={multiEnable}
            isChecked={sectionChecked}
            onToggle={() => _toggleSection(item.sectionIndex)}
            checkboxProps={checkboxPropsOverrides}
            testID={`section-header-${item.sectionIndex}`}
          />
        );
      }

      const listItem: ListItem = {
        _id: item._id,
        value: item.value,
        disabled: item.disabled,
      };
      const isSelected = selectedIdSet.has(item._id);

      if (customRenderItem) {
        const content = customRenderItem({
          item: listItem,
          isSelected,
          onPress: () => _handleItemPress(listItem),
          disabled: listItem.disabled,
        });
        return useSections ? (
          <View style={styles.sectionItem}>{content}</View>
        ) : (
          <>{content}</>
        );
      }

      if (useRadio) {
        const content = (
          <RadioInput
            {...radioButtonProps}
            isChecked={isSelected}
            label={listItem.value}
            onPress={() => _handleItemPress(listItem)}
            disabled={listItem.disabled}
            testID={`${itemCheckboxTestIDPrefix}${item._id}`}
          />
        );
        return useSections ? (
          <View style={styles.sectionItem}>{content}</View>
        ) : (
          content
        );
      }

      const content = (
        <CheckboxInput
          {...checkboxPropsOverrides}
          isChecked={isSelected}
          label={listItem.value}
          onPress={() => _handleItemPress(listItem)}
          disabled={listItem.disabled}
          testID={`${itemCheckboxTestIDPrefix}${item._id}`}
        />
      );
      return useSections ? (
        <View style={styles.sectionItem}>{content}</View>
      ) : (
        content
      );
    },
    [
      customRenderItem,
      selectedIdSet,
      _handleItemPress,
      checkboxPropsOverrides,
      radioButtonProps,
      useRadio,
      itemCheckboxTestIDPrefix,
      sectionHeaderStyle,
      sectionHeaderContainerStyle,
      sectionCheckedMap,
      multiEnable,
      _toggleSection,
      useSections,
    ]
  );

  const _getItemType = useCallback((item: FlatListItem) => item._type, []);

  const _renderMenuItem = useCallback(
    ({ item }: { item: ListItem }) => {
      const isSelected = selectedIdSet.has(item._id);
      return (
        <Pressable
          style={[
            styles.menuItem,
            isSelected && styles.menuItemSelected,
            item.disabled && styles.menuItemDisabled,
          ]}
          onPress={() => {
            if (!item.disabled) {
              _handleItemPress(item);
            }
          }}
          disabled={item.disabled}
        >
          <Text
            style={[
              styles.menuItemText,
              isSelected && styles.menuItemTextSelected,
            ]}
          >
            {item.value}
          </Text>
        </Pressable>
      );
    },
    [selectedIdSet, _handleItemPress]
  );

  const listContent = useMemo(
    () => (
      <>
        {!hideSearchBox ? (
          <Searchbar
            {...searchbarPropsOverrides}
            value={searchKey}
            placeholder={searchText}
            onChangeText={_onSearchChange}
            style={[styles.searchbar, searchStyle]}
            testID={searchbarTestID}
          />
        ) : null}
        <FlashList
          ListHeaderComponent={
            multiEnable === true && selectAllEnable === true ? (
              <CheckboxInput
                {...checkboxPropsOverrides}
                isChecked={isCheckedAll}
                label={selectAllText}
                onPress={_checkAll}
                disabled={selectAllDisabled}
                testID={selectAllCheckboxTestID}
              />
            ) : null
          }
          data={flatListData}
          renderItem={_renderItem}
          getItemType={_getItemType}
          keyExtractor={(item) => item._id.toString()}
          extraData={selectedIdSet}
          keyboardShouldPersistTaps="handled"
          estimatedItemSize={
            useSections ? 50 : (height - (height * 45) / 100) / 10
          }
        />
        {showLimitError ? (
          <Text style={[errorTextStyle, limitErrorStyle]}>
            {displayLimitError}
          </Text>
        ) : null}
      </>
    ),
    [
      hideSearchBox,
      searchbarPropsOverrides,
      searchKey,
      searchText,
      _onSearchChange,
      searchStyle,
      searchbarTestID,
      multiEnable,
      selectAllEnable,
      checkboxPropsOverrides,
      isCheckedAll,
      selectAllText,
      _checkAll,
      selectAllDisabled,
      selectAllCheckboxTestID,
      flatListData,
      _renderItem,
      _getItemType,
      selectedIdSet,
      useSections,
      height,
      showLimitError,
      errorTextStyle,
      limitErrorStyle,
      displayLimitError,
    ]
  );

  const selectionContent = useMemo(
    () => (
      <>
        {dialogTitle ?? label ? (
          presentationStyle === 'bottomSheet' ? (
            <Text style={[styles.bottomSheetTitle, bottomSheetTitleStyle]}>
              {dialogTitle ?? label}
            </Text>
          ) : (
            <Dialog.Title style={dialogTitleStyle}>
              {dialogTitle ?? label}
            </Dialog.Title>
          )
        ) : null}
        {presentationStyle === 'dialog' ? (
          <Dialog.ScrollArea
            style={[
              styles.dialogScrollArea,
              { height: height - (height * 40) / 100 },
            ]}
          >
            {listContent}
          </Dialog.ScrollArea>
        ) : (
          <View style={styles.bottomSheetScrollArea}>{listContent}</View>
        )}
        <View style={styles.actions}>
          <Button labelStyle={dialogCloseButtonStyle} onPress={_closeDialog}>
            {dialogCloseButtonText}
          </Button>
          <Button
            style={{ marginLeft: 8 }}
            labelStyle={dialogDoneButtonStyle}
            onPress={_hideDialog}
          >
            {dialogDoneButtonText}
          </Button>
        </View>
      </>
    ),
    [
      dialogTitle,
      label,
      presentationStyle,
      bottomSheetTitleStyle,
      dialogTitleStyle,
      listContent,
      height,
      dialogCloseButtonStyle,
      _closeDialog,
      dialogCloseButtonText,
      dialogDoneButtonStyle,
      _hideDialog,
      dialogDoneButtonText,
    ]
  );

  const _onContainerLayout = useCallback(
    (event: {
      nativeEvent: {
        layout: { x: number; y: number; width: number; height: number };
      };
    }) => {
      setContainerLayout(event.nativeEvent.layout);
    },
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <View
        ref={containerRef}
        style={[styles.container, containerStyle]}
        onLayout={_onContainerLayout}
      >
        {showChips ? (
          <ChipInput
            label={label}
            selectedList={selectedList}
            onRemove={_onChipRemove}
            onPress={_onFocus}
            disabled={disabled}
            error={!!errorText}
            errorText={errorText}
            containerStyle={textInputStyle}
            chipStyle={chipStyle}
            chipTextStyle={chipTextStyle}
            textColor={textColor}
          />
        ) : (
          <>
            <TextInput
              {...textInputProps}
              ref={selectInputRef}
              disabled={disabled}
              style={textInputStyle}
              outlineStyle={textInputOutlineStyle}
              label={label}
              mode={textInputMode}
              onFocus={disabled ? undefined : _onFocus}
              showSoftInputOnFocus={false}
              value={value}
              textColor={textColor}
              error={!!errorText}
              testID={testID}
            />
            {errorText ? (
              <Text style={[errorTextStyle, errorStyle]}>{errorText}</Text>
            ) : null}
          </>
        )}
      </View>

      <Portal>
        {presentationStyle === 'bottomSheet' ? (
          <BottomSheet
            visible={visible}
            onDismiss={_closeDialog}
            backgroundColor={bottomSheetBackgroundColor}
            handleColor={bottomSheetHandleColor}
            testID={dialogTestID}
          >
            <View style={[styles.bottomSheetContent, bottomSheetStyle]}>
              {selectionContent}
            </View>
          </BottomSheet>
        ) : presentationStyle === 'menu' ? (
          <>
            {visible && (
              <>
                <Pressable
                  style={StyleSheet.absoluteFill}
                  onPress={_closeDialog}
                />
                <View
                  style={[
                    styles.menuDropdown,
                    {
                      top: containerLayout.y + containerLayout.height,
                      left: containerLayout.x,
                      width: containerLayout.width,
                      height: 300,
                    },
                  ]}
                >
                  {multiEnable ? (
                    <>
                      {!hideSearchBox && (
                        <Searchbar
                          {...searchbarPropsOverrides}
                          value={searchKey}
                          placeholder={searchText}
                          onChangeText={_onSearchChange}
                          style={[styles.menuSearchbar, searchStyle]}
                          testID={searchbarTestID}
                        />
                      )}
                      <View style={{ height: 180 }}>
                        <FlashList
                          ListHeaderComponent={
                            selectAllEnable === true ? (
                              <CheckboxInput
                                {...checkboxPropsOverrides}
                                isChecked={isCheckedAll}
                                label={selectAllText}
                                onPress={_checkAll}
                                disabled={selectAllDisabled}
                                testID={selectAllCheckboxTestID}
                              />
                            ) : null
                          }
                          data={flatListData}
                          renderItem={_renderItem}
                          getItemType={_getItemType}
                          keyExtractor={(item) => item._id.toString()}
                          extraData={selectedIdSet}
                          estimatedItemSize={50}
                          keyboardShouldPersistTaps="handled"
                        />
                      </View>
                      {showLimitError ? (
                        <Text style={[errorTextStyle, limitErrorStyle]}>
                          {displayLimitError}
                        </Text>
                      ) : null}
                      <View style={styles.menuActions}>
                        <Button
                          labelStyle={dialogCloseButtonStyle}
                          onPress={_closeDialog}
                        >
                          {dialogCloseButtonText}
                        </Button>
                        <Button
                          labelStyle={dialogDoneButtonStyle}
                          onPress={_hideDialog}
                        >
                          {dialogDoneButtonText}
                        </Button>
                      </View>
                    </>
                  ) : (
                    <View style={{ height: 280 }}>
                      <FlashList
                        data={filteredList}
                        renderItem={_renderMenuItem}
                        keyExtractor={(item) => item._id.toString()}
                        extraData={selectedIdSet}
                        estimatedItemSize={50}
                        keyboardShouldPersistTaps="handled"
                      />
                    </View>
                  )}
                </View>
              </>
            )}
          </>
        ) : (
          <Dialog
            style={[styles.dialog, dialogStyle]}
            visible={visible}
            dismissable={false}
            testID={dialogTestID}
          >
            {selectionContent}
          </Dialog>
        )}
      </Portal>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 10,
  },
  dialog: {
    borderRadius: 5,
  },
  dialogScrollArea: {
    paddingHorizontal: 14,
  },
  bottomSheetContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  bottomSheetScrollArea: {
    flex: 1,
    minHeight: 200,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    paddingTop: 4,
  },
  sectionItem: {
    paddingLeft: 24,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 8,
  },
  textInputIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
  },
  searchbar: {
    borderColor: '#777777',
    backgroundColor: '#F1F1F2',
    borderWidth: 0.25,
    marginBottom: 10,
    marginHorizontal: 8,
    color: '#000',
    marginTop: 12,
  },
  menuDropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    overflow: 'hidden',
    zIndex: 1000,
  },
  menuSearchbar: {
    borderColor: '#777777',
    backgroundColor: '#F1F1F2',
    borderWidth: 0.25,
    margin: 8,
    color: '#000',
  },
  menuActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  menuItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuItemSelected: {
    backgroundColor: '#f0f0f0',
  },
  menuItemDisabled: {
    opacity: 0.4,
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
  },
  menuItemTextSelected: {
    fontWeight: '600',
    color: '#000',
  },
});

export default memo(PaperSelect);
