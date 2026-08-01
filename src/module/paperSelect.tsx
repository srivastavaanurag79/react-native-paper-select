/* eslint-disable react-native/no-inline-styles */
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, Keyboard, useWindowDimensions } from 'react-native';
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
import type {
  ListItem,
  PaperSelectProps,
  PaperSelectTextInputProps,
} from '../interface/paperSelect.interface';
import type { InternalTheme } from 'react-native-paper/lib/typescript/types';

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

  // Component props
  textInputProps: textInputPropOverrides,
  checkboxProps: checkboxPropsOverrides,
  searchbarProps: searchbarPropsOverrides,
  renderItem: customRenderItem,

  // New testID props
  testID,
  dialogTestID,
  searchbarTestID,
  selectAllCheckboxTestID,
  itemCheckboxTestIDPrefix = 'checkbox-',
}: PaperSelectProps) => {
  const theme = useTheme<InternalTheme>(themeOverrides);
  const { height } = useWindowDimensions();

  // Memoized text input props
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
      activeUnderlineColor: textInputPropOverrides?.activeUnderlineColor ?? 'black',
      outlineColor: textInputPropOverrides?.outlineColor ?? 'black',
      activeOutlineColor: textInputPropOverrides?.activeOutlineColor ?? 'black',
      left: textInputPropOverrides?.left,
      right:
        textInputPropOverrides?.right ?? <TextInput.Icon {...textInputIconProps} />,
    }),
    [textInputPropOverrides, textInputIconProps]
  );

  // State
  const [searchKey, setSearchKey] = useState('');
  const [debouncedSearchKey, setDebouncedSearchKey] = useState('');
  const [selectedList, setSelectedList] = useState<ListItem[]>([...selectedArrayList]);
  const [showLimitError, setShowLimitError] = useState(false);
  const [visible, setVisible] = useState(false);

  const selfInputRef = useRef<any>(null);
  const selectInputRef = inputRef ?? selfInputRef;
  const triggeredByOnCheckedSingle = useRef(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Derived values
  const filteredList = useMemo(() => {
    if (!debouncedSearchKey) return arrayList;
    const lowercased = debouncedSearchKey.toLowerCase();
    return arrayList.filter((item) => item.value.toLowerCase().includes(lowercased));
  }, [arrayList, debouncedSearchKey]);

  const selectedIdSet = useMemo(
    () => new Set(selectedList.map((val) => val._id)),
    [selectedList]
  );

  const hasDisabled = useMemo(() => arrayList.some((x) => x.disabled), [arrayList]);

  const isCheckedAll = useMemo(
    () => selectedList.length > 0 && selectedList.length === filteredList.length,
    [selectedList, filteredList]
  );

  const selectAllDisabled =
    hasDisabled || (limit != null && limit > 0 && limit !== arrayList.length);

  const displayLimitError =
    limitError ?? `You can't select more than ${limit} items.`;

  const errorTextStyle = useMemo(() => ({ color: theme.colors.error }), [theme.colors.error]);

  // Callbacks
  const _hideDialog = useCallback(() => {
    setSearchKey('');
    setDebouncedSearchKey('');

    const finalText = selectedList
      .map((val) => {
        const matchedItem = arrayList.find((el) => val._id === el._id);
        return matchedItem ? matchedItem.value : null;
      })
      .filter(Boolean)
      .join(', ');

    onSelection({
      text: finalText,
      selectedList,
    });

    setVisible(false);
    selectInputRef?.current?.blur();
  }, [arrayList, selectedList, onSelection, selectInputRef]);

  const _closeDialog = useCallback(() => {
    setVisible(false);
    setSearchKey('');
    setDebouncedSearchKey('');
    selectInputRef?.current?.blur();
  }, [selectInputRef]);

  const _onFocus = useCallback(() => {
    Keyboard.dismiss();
    setSearchKey('');
    setDebouncedSearchKey('');
    setSelectedList(selectedArrayList);
    setVisible(true);
  }, [selectedArrayList]);

  const _onChecked = useCallback(
    (item: ListItem) => {
      setSelectedList((prev) => {
        const index = prev.findIndex((val) => val._id === item._id);
        if (index > -1) {
          return prev.filter((val) => val._id !== item._id);
        }
        if (limit && prev.length >= limit) {
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
    setSelectedList((prev) => (prev.length === filteredList.length ? [] : [...filteredList]));
  }, [filteredList]);

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

  const _onSearchChange = useCallback((text: string) => {
    setSearchKey(text);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      setDebouncedSearchKey(text);
    }, 300);
  }, []);

  // Effects
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

  // Render
  const _renderItem = useCallback(
    ({ item }: { item: ListItem }) => {
      const isSelected = selectedIdSet.has(item._id);

      if (customRenderItem) {
        return (
          <>
            {customRenderItem({
              item,
              isSelected,
              onPress: () => _handleItemPress(item),
              disabled: item.disabled,
            })}
          </>
        );
      }

      return (
        <CheckboxInput
          {...checkboxPropsOverrides}
          isChecked={isSelected}
          label={item.value}
          onPress={() => _handleItemPress(item)}
          disabled={item.disabled}
          testID={``}
        />
      );
    },
    [customRenderItem, selectedIdSet, _handleItemPress, checkboxPropsOverrides, itemCheckboxTestIDPrefix]
  );

  return (
    <ThemeProvider theme={theme}>
      <View style={[styles.container, containerStyle]}>
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
      </View>

      <View>
        <Portal>
          <Dialog
            style={[styles.dialog, dialogStyle]}
            visible={visible}
            dismissable={false}
            testID={dialogTestID}
          >
            <Dialog.Title style={dialogTitleStyle}>
              {dialogTitle ?? label}
            </Dialog.Title>
            <Dialog.ScrollArea style={[styles.dialogScrollArea, { height: height - (height * 40) / 100 }]}>
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
                data={filteredList}
                renderItem={_renderItem}
                keyExtractor={(item, index) => item._id.toString() || index.toString()}
                extraData={selectedList}
                keyboardShouldPersistTaps="handled"
                estimatedItemSize={(height - (height * 45) / 100) / 10}
              />
              {showLimitError ? (
                <Text style={[errorTextStyle, limitErrorStyle]}>
                  {displayLimitError}
                </Text>
              ) : null}
            </Dialog.ScrollArea>
            <Dialog.Actions>
              <Button labelStyle={dialogCloseButtonStyle} onPress={_closeDialog}>
                {dialogCloseButtonText}
              </Button>
              <Button labelStyle={dialogDoneButtonStyle} onPress={_hideDialog}>
                {dialogDoneButtonText}
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
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
});

export default memo(PaperSelect);
