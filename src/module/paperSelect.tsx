import React, { memo, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, FlatList } from 'react-native';
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
import type { InternalTheme } from 'react-native-paper/lib/typescript/src/types';

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
}: PaperSelectProps) => {
  const theme = useTheme<InternalTheme>(themeOverrides);

  const textInputProps: PaperSelectTextInputProps = {
    underlineColor: textInputPropOverrides?.underlineColor || 'black',
    activeUnderlineColor:
      textInputPropOverrides?.activeUnderlineColor || 'black',
    outlineColor: textInputPropOverrides?.outlineColor || 'black',
    activeOutlineColor: textInputPropOverrides?.activeOutlineColor || 'black',
    left: textInputPropOverrides?.left,
    right: textInputPropOverrides?.right ?? (
      <TextInput.Icon
        style={styles.textInputIcon}
        size={20}
        icon="chevron-down"
      />
    ),
  };

  const { height } = Dimensions.get('window');

  // console.log(height);

  const [searchKey, setSearchKey] = useState<string>('');

  const [arrayHolder, setArrayHolder] = useState<Array<ListItem>>([
    ...arrayList,
  ]);
  const [list, setList] = useState<Array<ListItem>>([...arrayList]);
  const [selectedList, setSelectedList] = useState<Array<ListItem>>([
    ...selectedArrayList,
  ]);

  const selfInputRef = useRef<any>(null);
  const selectInputRef = inputRef ?? selfInputRef;

  const [visible, setVisible] = useState<boolean>(false);

  const showDialog = () => setVisible(true);

  const _hideDialog = () => {
    setSearchKey('');
    var data: Array<ListItem> = [...arrayHolder];
    // console.log(selectedList);
    var selectedData: Array<ListItem> = [...selectedList];
    // console.log(selectedData);
    let finalText: string = '';
    selectedData.forEach((val, index) => {
      data.forEach((el) => {
        if (val._id === el._id) {
          finalText +=
            index !== selectedData.length - 1 ? `${el.value}, ` : `${el.value}`;
        }
      });
    });

    onSelection({
      text: finalText,
      selectedList: selectedData,
    });

    setVisible(false);

    if (selectInputRef && selectInputRef.current) {
      selectInputRef.current.blur();
    }
  };

  const _closeDialog = () => {
    setVisible(false);
    setSearchKey('');
    if (selectInputRef && selectInputRef.current) {
      selectInputRef.current.blur();
    }
  };

  const _onFocus = () => {
    setArrayHolder([...arrayList]);
    setList([...arrayList]);
    setSelectedList([...selectedArrayList]);
    showDialog();
  };

  const _onChecked = (item: any) => {
    var selectedData = [...selectedList];
    // const index = data.findIndex(x => x._id === item._id);
    const indexSelected = selectedData.findIndex((val) => val._id === item._id);
    if (indexSelected > -1) {
      selectedData.splice(indexSelected, 1);
    } else {
      selectedData.push(item);
    }
    setSelectedList([...selectedData]);
  };

  const _onCheckedSingle = (item: any) => {
    var selectedData = [...selectedList];
    // const index = data.findIndex(x => x._id === item._id);
    const indexSelected = selectedData.findIndex((val) => val._id === item._id);
    if (indexSelected > -1) {
      // selectedData.splice(indexSelected, 1);
      selectedData = [];
    } else {
      selectedData = [];
      selectedData.push(item);
    }
    // console.log(selectedData);
    setSelectedList([...selectedData]);
  };

  const _exists = (item: any) => {
    // console.log(selectedList);
    let _temp = [...selectedList];
    return _temp.find((val: any) => val._id === item._id) ? true : false;
  };

  const _isCheckedAll = () => {
    const data = [...list];
    const selectedData = [...selectedList];
    return selectedData.length !== 0 && selectedData.length === data.length;
  };

  const _checkAll = () => {
    const data = [...list];
    var selectedData = [...selectedList];
    if (selectedData.length === data.length) {
      selectedData = [];
    } else if (selectedData.length === 0 || selectedData.length > 0) {
      selectedData = data.slice(0);
    }

    setSelectedList([...selectedData]);
  };

  const _renderItem = ({ item }: { item: ListItem }) => (
    <CheckboxInput
      {...checkboxPropsOverrides}
      isChecked={_exists(item)}
      label={item.value}
      onPress={() => {
        multiEnable === true ? _onChecked(item) : _onCheckedSingle(item);
      }}
      disabled={item.disabled}
    />
  );

  const _filterFunction = (text: string) => {
    setSearchKey(text);
    const newData = arrayHolder.filter((item) =>
      item.value.toLowerCase().includes(text.toLowerCase())
    );
    setList(newData);
  };

  return (
    <ThemeProvider theme={theme}>
      <View style={[styles.container, containerStyle]}>
        <TextInput
          {...textInputProps}
          ref={selectInputRef}
          disabled={disabled}
          style={[styles.textInput, textInputStyle]}
          outlineStyle={textInputOutlineStyle}
          label={label}
          mode={textInputMode}
          onFocus={disabled ? undefined : _onFocus}
          showSoftInputOnFocus={false}
          value={value}
          textColor={textColor}
        />
        {errorText ? (
          <Text
            style={[
              {
                color: theme.colors.error,
              },
              errorStyle,
            ]}
          >
            {errorText}
          </Text>
        ) : null}
      </View>

      <View>
        <Portal>
          <Dialog
            style={[styles.dialog, dialogStyle]}
            visible={visible}
            dismissable={false}
          >
            <Dialog.Title style={dialogTitleStyle}>
              {dialogTitle ?? label}
            </Dialog.Title>
            <Dialog.ScrollArea style={{ paddingHorizontal: 14 }}>
              {!hideSearchBox ? (
                <Searchbar
                  {...searchbarPropsOverrides}
                  value={searchKey}
                  placeholder={searchText}
                  onChangeText={(text: string) => _filterFunction(text)}
                  style={[styles.searchbar, searchStyle]}
                />
              ) : null}
              {multiEnable === true && selectAllEnable === true ? (
                <CheckboxInput
                  {...checkboxPropsOverrides}
                  isChecked={_isCheckedAll()}
                  label={selectAllText}
                  onPress={() => _checkAll()}
                />
              ) : null}
              {/* <ScrollView
                style={
                  (styles.dialogScrollView,
                    { maxHeight: height - (height * 40) / 100, marginBottom: 8 })
                }
                keyboardShouldPersistTaps="handled"
              >
                {multiEnable === true
                  ? _renderListForMulti()
                  : _renderListForSingle()}
              </ScrollView> */}
              <FlatList
                data={list}
                renderItem={_renderItem}
                keyExtractor={(item) => item._id.toString()}
                keyboardShouldPersistTaps="handled"
                style={
                  (styles.dialogScrollView,
                  { maxHeight: height - (height * 40) / 100, marginBottom: 8 })
                }
              />
            </Dialog.ScrollArea>
            <Dialog.Actions>
              <Button
                labelStyle={dialogCloseButtonStyle}
                onPress={_closeDialog}
              >
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
  dialogScrollView: {
    width: '100%',
  },
  textInput: {
    // backgroundColor: '#fff',
    // color: '#000',
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
