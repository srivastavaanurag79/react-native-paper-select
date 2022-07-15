/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { memo, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  TextInput,
  Button,
  Dialog,
  Portal,
  Searchbar,
} from 'react-native-paper';
import CheckboxInput from '../components/checkBox';
import type { paperSelect } from '../interface/paperSelect.interface';

const PaperSelect = ({
  label,
  arrayList,
  selectedArrayList,
  multiEnable,
  errorText,
  value,
  onSelection,
  dialogStyle,
  dialogTitleStyle,
  searchStyle,
  checkboxColor,
  checkboxLabelStyle,
  checkboxUncheckedColor,
  errorStyle,
  textInputMode,
  underlineColor,
  activeUnderlineColor,
  activeOutlineColor,
  outlineColor,
  textInputBackgroundColor,
  textInputColor,
  textInputHeight,
  dialogButtonLabelStyle,
  searchPlaceholder,
  modalCloseButtonText,
  modalDoneButtonText,
}: paperSelect) => {
  const [searchKey, setSearchKey] = useState<string>('');

  const [arrayHolder, setArrayHolder] = useState<Array<any>>([...arrayList]);
  const [list, setList] = useState<Array<any>>([...arrayList]);
  const [selectedList, setSelectedList] = useState<Array<any>>([...selectedArrayList]);

  const selectInputRef = useRef<any>(null);
  const [visible, setVisible] = useState<boolean>(false);

  const showDialog = () => setVisible(true);

  const _hideDialog = () => {
    var data = [...list];
    var selectedData = [...selectedList];
    console.log(selectedData);
    let selected: Array<any> = [];

    selectedData.forEach((val) => {
      data.forEach((el) => {
        if (val._id === el._id) {
          selected.push(el.value);
        }
      });
    });
    // value = selected.join();
    onSelection({
      text: selected.join(),
      selectedList: selectedData,
    });


    setVisible(false);
    if (selectInputRef && selectInputRef.current) {
      selectInputRef.current.blur();
    }
  };

  const _closeDialog = () => {
    setVisible(false);
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
    console.log(selectedData);
    setSelectedList([...selectedData]);
  };

  const _exists = (item: any) => {
    // console.log(selectedList);
    let _temp = [...selectedList]
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

  const _renderListForMulti = () => {
    return list.map((item, key) => {
      return (
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          key={key}
          onPress={() => {
            _onChecked(item);
          }}
        >
          <CheckboxInput
            isChecked={_exists(item)}
            label={item.value}
            checkboxLabelStyle={checkboxLabelStyle}
            checkboxColor={checkboxColor}
            checkboxUncheckedColor={checkboxUncheckedColor}
          />
        </TouchableOpacity>
      );
    });
  };

  const _renderListForSingle = () => {
    return list.map((item, key) => {
      return (
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          key={key}
          onPress={() => {
            _onCheckedSingle(item);
          }}
        >
          <CheckboxInput
            isChecked={_exists(item)}
            label={item.value}
            checkboxLabelStyle={checkboxLabelStyle}
            checkboxColor={checkboxColor}
            checkboxUncheckedColor={checkboxUncheckedColor}
          />
        </TouchableOpacity>
      );
    });
  };

  const _filterFunction = (text: string) => {
    setSearchKey(text);
    const newData = arrayHolder.filter((item) =>
      item.value.toLowerCase().includes(text.toLowerCase())
    );
    setList(newData);
  };

  return (
    <>
      <View style={styles.container}>
        <TextInput
          ref={selectInputRef}
          style={{
            backgroundColor: textInputBackgroundColor || '#fff',
            color: textInputColor || '#000',
            height: textInputHeight,
          }}
          label={label}
          underlineColor={underlineColor || 'black'}
          activeUnderlineColor={activeUnderlineColor || 'black'}
          activeOutlineColor={activeOutlineColor || 'black'}
          outlineColor={outlineColor || 'black'}
          mode={textInputMode || 'outlined'}
          onFocus={_onFocus}
          showSoftInputOnFocus={false}
          value={value}
          right={
            <TextInput.Icon
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                alignContent: 'center',
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              }}
              size={15}
              name="chevron-down"
            />
          }
        />
        {errorText ? (
          <Text style={{ ...errorStyle, color: errorStyle?.color || 'red' }}>
            {errorText}
          </Text>
        ) : null}
      </View>

      <View>
        <Portal>
          <Dialog
            style={{
              backgroundColor: dialogStyle?.backgroundColor || 'white',
              borderRadius: dialogStyle?.borderRadius || 5,
            }}
            visible={visible}
            dismissable={false}
          >
            <Dialog.Title style={dialogTitleStyle}>{label}</Dialog.Title>
            <Dialog.Content>
              <Dialog.ScrollArea
                style={{
                  height: 300,
                  paddingVertical: 10,
                  paddingHorizontal: 0,
                }}
              >
                <Searchbar
                  value={searchKey}
                  placeholder={searchPlaceholder || "Search"}
                  onChangeText={(text: string) => _filterFunction(text)}
                  iconColor={searchStyle?.iconColor || 'black'}
                  style={{
                    borderRadius: searchStyle?.borderRadius || 5,
                    borderColor: searchStyle?.borderColor || '#e5e5e5',
                    backgroundColor: searchStyle?.backgroundColor || '#e5e5e5',
                    borderWidth: 0.5,
                    marginBottom: 10,
                    marginHorizontal: 8,
                    color: searchStyle?.textColor || '#000',
                  }}
                />
                {multiEnable === true && (
                  <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                    onPress={() => {
                      _checkAll();
                    }}
                  >
                    <CheckboxInput
                      isChecked={_isCheckedAll()}
                      label="Select All"
                      checkboxLabelStyle={checkboxLabelStyle}
                      checkboxColor={checkboxColor}
                      checkboxUncheckedColor={checkboxUncheckedColor}
                    />
                  </TouchableOpacity>
                )}
                <ScrollView
                  style={{ width: '100%' }}
                  persistentScrollbar={true}
                  showsVerticalScrollIndicator={true}
                >
                  {multiEnable === true
                    ? _renderListForMulti()
                    : _renderListForSingle()}
                </ScrollView>
              </Dialog.ScrollArea>
            </Dialog.Content>
            <Dialog.Actions style={{ marginTop: -20 }}>
              <Button labelStyle={dialogButtonLabelStyle} onPress={_closeDialog}>
                {modalCloseButtonText || "Close"}
              </Button>
              <Button labelStyle={dialogButtonLabelStyle} onPress={_hideDialog}>
                {modalDoneButtonText || "Done"}
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 10,
  },
});

export default memo(PaperSelect);
