/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';

import { Alert, StyleSheet, View } from 'react-native';
import { Button as PaperButton, Headline } from 'react-native-paper';
import { PaperSelect } from 'react-native-paper-select';

export const selectValidator = (value: any) => {
  if (!value || value.length <= 0) {
    return 'Please select a value.';
  }

  return '';
};

export default function App() {
  const singleSelectRef = useRef<any>();
  const [gender, setGender] = useState<any>({
    value: '',
    list: [
      { _id: '1', value: 'MALE' },
      { _id: '2', value: 'FEMALE' },
      { _id: '3', value: 'OTHERS' },
      {
        _id: '4',
        value:
          '   TESTING VERY VERY VERY VERY VERY VERY VERY VERY VERY VERY VERY VERY LONG NAME  ',
      },
    ],
    selectedList: [],
    error: '',
  });

  const [colors, setColors] = useState<any>({
    value: '',
    list: [
      { _id: '1', value: 'BLUE' },
      { _id: '2', value: 'RED' },
      { _id: '3', value: 'GREEN' },
      { _id: '4', value: 'YELLOW' },
      { _id: '5', value: 'BROWN' },
      { _id: '6', value: 'BLACK' },
      { _id: '7', value: 'WHITE' },
      { _id: '8', value: 'CYAN' },
    ],
    selectedList: [],
    error: '',
  });

  useEffect(() => {
    let isMounted = true;
    let _getData = async () => {
      if (isMounted) {
        let _tempList: Array<any> = [...gender.list];
        for (let i = 0; i < 10000; i++) {
          _tempList.push({
            _id: Math.round(Math.random() * 1000) + 22 + 'TEST',
            value: 'OTHERS ' + i,
          });
        }
        // console.log(_tempList);
        setGender({
          ...gender,
          value: 'OTHERS',
          list: [..._tempList],
          selectedList: [{ _id: '3', value: 'OTHERS' }],
        });

        setColors({
          ...colors,
          value: 'BLUE,RED',
          selectedList: [
            { _id: '1', value: 'BLUE' },
            { _id: '2', value: 'RED' },
          ],
        });
      }
    };

    _getData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View style={styles.container}>
      <Headline
        style={{ marginBottom: 20, color: 'black', fontWeight: 'bold' }}
      >
        React Native Paper Select
      </Headline>
      <PaperSelect
        inputRef={singleSelectRef}
        label="Select Gender"
        value={gender.value}
        onSelection={(value: any) => {
          setGender({
            ...gender,
            value: value.text,
            selectedList: value.selectedList,
            error: '',
          });
        }}
        arrayList={[...gender.list]}
        selectedArrayList={[...gender.selectedList]}
        errorText={gender.error}
        multiEnable={false}
        dialogTitleStyle={{ color: 'black' }}
        textInputStyle={{ fontWeight: '700', color: 'yellow' }}
        hideSearchBox={true}
        theme={{
          colors: {
            text: 'blue', // Change this to the desired text color
            placeholder: 'gray', // Change this to the desired placeholder color
          },
        }}
        textInputProps={{
          outlineColor: 'black',
        }}
        checkboxProps={{
          checkboxColor: 'blue',
          checkboxLabelStyle: { color: 'black', fontWeight: '700' },
        }}
        textInputOutlineStyle={{ borderColor: 'red', borderBottomWidth: 10 }}
        textInputMode="outlined"
      />
      <PaperSelect
        label="Select Colors"
        value={colors.value}
        onSelection={(value) => {
          setColors({
            ...colors,
            value: value.text,
            selectedList: value.selectedList,
            error: '',
          });
        }}
        arrayList={[...colors.list]}
        selectedArrayList={[...colors.selectedList]}
        errorText={colors.error}
        multiEnable={true}
        textInputMode="flat"
        dialogCloseButtonStyle={{
          color: 'red',
          backgroundColor: 'yellow',
          padding: 10,
          borderRadius: 5,
        }}
        dialogDoneButtonStyle={{
          color: 'blue',
          backgroundColor: 'green',
          padding: 10,
          borderRadius: 5,
        }}
        searchText="Procurar"
        dialogCloseButtonText="fechar"
        dialogDoneButtonText="terminado"
        searchbarProps={{
          iconColor: 'red',
        }}
      />
      <PaperButton
        style={styles.button}
        labelStyle={styles.text}
        mode={'outlined'}
        onPress={() => {
          const genderError = selectValidator(gender.value);
          const colorError = selectValidator(colors.value);
          if (genderError || colorError) {
            setColors({ ...colors, error: colorError });
            setGender({ ...gender, error: genderError });
            return;
          }
          Alert.alert(
            'Selected Values',
            'Gender: ' + gender.value + ' and Colors: ' + colors.value
          );
        }}
      >
        Submit
      </PaperButton>
      <PaperButton
        onPress={() => {
          singleSelectRef.current.focus();
        }}
      >
        Open
      </PaperButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#f5f5f5',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },

  button: {
    marginVertical: 10,
    width: '100%',
    backgroundColor: 'blue',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
    color: 'white',
  },
});
