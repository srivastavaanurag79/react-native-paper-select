/* eslint-disable react-native/no-inline-styles */
import React, { memo, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  TextInput as Input,
  Button,
  Dialog,
  Portal,
  Searchbar,
} from 'react-native-paper';
import CheckboxInput from '../components/checkBox';

export interface _type {
  label: string;
  arrayList: Array<{ _id: string; value: any }>;
  selectedArrayList: Array<{ _id: string; value: any }>;
  multiEnable: boolean;
  errorText: string;
  value: string;
  onSelection: Function;
}

const PaperSelect = ({
  label,
  arrayList,
  selectedArrayList,
  multiEnable,
  errorText,
  value,
  onSelection,
  ...props
}) => {
  const [selectText, setSelectText] = useState(value);
  const [searchKey, setSearchKey] = useState('');
  const [arrayHolder, setArrayHolder] = useState([...arrayList]);

  const [list, setList] = useState([...arrayList]);

  const [selectedList, setSelectedList] = useState([...selectedArrayList]);

  const selectInputRef: any = useRef();
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const _hideDialog = () => {
    var data = [...list];
    var selectedData = [...selectedList];
    let selected: Array<any> = [];
    selectedData.forEach((val) => {
      data.forEach((el) => {
        if (val._id === el._id) {
          selected.push(el.value);
        }
      });
    });
    value = selected.join();
    setSelectText(selected.join());
    onSelection({
      text: selected.join(),
      selectedList: selectedData,
    });
    setVisible(false);
    selectInputRef.current.blur();
  };

  const _onFocus = () => {
    setArrayHolder(arrayList);
    setList(arrayList);
    showDialog();
  };

  const _onChecked = (item: any) => {
    const selectedData = [...selectedList];
    // const index = data.findIndex(x => x._id === item._id);
    const indexSelected = selectedData.indexOf(item);
    if (indexSelected > -1) {
      selectedData.splice(indexSelected, 1);
    } else {
      selectedData.push(item);
    }
    setSelectedList(selectedData);
  };

  const _onCheckedSingle = (item: any) => {
    var selectedData = [...selectedList];
    // const index = data.findIndex(x => x._id === item._id);
    const indexSelected = selectedData.indexOf(item);
    if (indexSelected > -1) {
      // selectedData.splice(indexSelected, 1);
      selectedData = [];
    } else {
      selectedData = [];
      selectedData.push(item);
    }
    setSelectedList(selectedData);
  };

  const _exists = (item: any) => {
    return selectedList.indexOf(item) > -1 ? true : false;
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

    setSelectedList(selectedData);
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
          <CheckboxInput isChecked={_exists(item)} label={item.value} />
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
          <CheckboxInput isChecked={_exists(item)} label={item.value} />
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
        <Input
          ref={selectInputRef}
          style={styles.input}
          label={label}
          underlineColor="transparent"
          mode="outlined"
          onFocus={_onFocus}
          showSoftInputOnFocus={false}
          value={selectText}
          right={<Input.Icon name="chevron-down" />}
          {...props}
        />
        {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
      </View>

      <View>
        <Portal>
          <Dialog visible={visible} dismissable={false}>
            <Dialog.Title>{label}</Dialog.Title>
            <Dialog.Content>
              <Dialog.ScrollArea style={{ height: 300, paddingVertical: 10 }}>
                <Searchbar
                  value={searchKey}
                  placeholder="Search"
                  onChangeText={(text: string) => _filterFunction(text)}
                  style={{ marginBottom: 15 }}
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
                    />
                  </TouchableOpacity>
                )}
                <ScrollView>
                  {multiEnable === true
                    ? _renderListForMulti()
                    : _renderListForSingle()}
                </ScrollView>
              </Dialog.ScrollArea>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={_hideDialog}>Done</Button>
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
  input: {
    backgroundColor: 'white',
  },
  error: {
    fontSize: 14,
    color: 'red',
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default memo(PaperSelect);
