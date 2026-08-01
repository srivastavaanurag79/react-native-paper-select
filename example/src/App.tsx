/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';

import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import {
  Button as PaperButton,
  Headline,
  Subheading,
  TextInput,
  RadioButton,
} from 'react-native-paper';
import { PaperSelect } from 'react-native-paper-select';
import type { Section } from 'react-native-paper-select';

export const selectValidator = (value: any) => {
  if (!value || value.length <= 0) {
    return 'Please select a value.';
  }

  return '';
};

const countrySections: Section[] = [
  {
    title: 'Asia',
    data: [
      { _id: 'asia-1', value: 'India' },
      { _id: 'asia-2', value: 'China' },
      { _id: 'asia-3', value: 'Japan' },
      { _id: 'asia-4', value: 'South Korea' },
    ],
  },
  {
    title: 'Europe',
    data: [
      { _id: 'eu-1', value: 'UK' },
      { _id: 'eu-2', value: 'France' },
      { _id: 'eu-3', value: 'Germany' },
      { _id: 'eu-4', value: 'Spain' },
      { _id: 'eu-5', value: 'Italy' },
    ],
  },
  {
    title: 'Americas',
    data: [
      { _id: 'am-1', value: 'USA' },
      { _id: 'am-2', value: 'Canada' },
      { _id: 'am-3', value: 'Brazil' },
      { _id: 'am-4', value: 'Argentina' },
    ],
  },
  {
    title: 'Oceania',
    data: [
      { _id: 'oc-1', value: 'Australia' },
      { _id: 'oc-2', value: 'New Zealand' },
      {
        _id: 'oc-3',
        value:
          '   TESTING VERY VERY VERY VERY VERY VERY VERY VERY VERY VERY VERY VERY LONG NAME  ',
      },
    ],
  },
];

export default function App() {
  const singleSelectRef = useRef<any>();

  const [text, setText] = React.useState('');

  const [gender, setGender] = useState<any>({
    value: '',
    list: [
      { _id: '1', value: 'MALE' },
      { _id: '2', value: 'FEMALE' },
      { _id: '3', value: 'OTHERS', disabled: true },
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
      { _id: 'BLUE', value: 'BLUE' },
      { _id: 'RED', value: 'RED' },
      { _id: 'GREEN', value: 'GREEN' },
      { _id: 'YELLOW', value: 'YELLOW' },
      { _id: 'BROWN', value: 'BROWN' },
      { _id: 'WHITE', value: 'WHITE' },
      { _id: 'CYAN', value: 'CYAN' },
      { _id: 'BLACK', value: 'BLACK' },
    ],
    selectedList: [],
    error: '',
  });

  const [fruits, setFruits] = useState<any>({
    value: '',
    list: [
      { _id: '1', value: 'Apple' },
      { _id: '2', value: 'Banana' },
      { _id: '3', value: 'Mango' },
      { _id: '4', value: 'Orange' },
      { _id: '5', value: 'Grapes' },
      {
        _id: 'oc-3',
        value:
          '   TESTING VERY VERY VERY VERY VERY VERY VERY VERY VERY VERY VERY VERY LONG NAME  ',
      },
    ],
    selectedList: [],
    error: '',
  });

  const [countries, setCountries] = useState<any>({
    value: '',
    list: [
      { _id: '1', value: 'India' },
      { _id: '2', value: 'USA' },
      { _id: '3', value: 'UK' },
      { _id: '4', value: 'Germany' },
      { _id: '5', value: 'France' },
      { _id: '6', value: 'Japan' },
      { _id: '7', value: 'Australia' },
      { _id: '8', value: 'Canada' },
      {
        _id: 'oc-3',
        value:
          '   TESTING VERY VERY VERY VERY VERY VERY VERY VERY VERY VERY VERY VERY LONG NAME  ',
      },
    ],
    selectedList: [],
    error: '',
  });

  const [sectionalCountry, setSectionalCountry] = useState<any>({
    value: '',
    selectedList: [],
    error: '',
  });

  const [tags, setTags] = useState<any>({
    value: '',
    list: [
      { _id: 't1', value: 'React' },
      { _id: 't2', value: 'Angular' },
      { _id: 't3', value: 'Vue' },
      { _id: 't4', value: 'Svelte' },
      { _id: 't5', value: 'Next.js' },
      { _id: 't6', value: 'Nuxt' },
      { _id: 't7', value: 'Remix' },
      {
        _id: 'oc-3',
        value:
          '   TESTING VERY VERY VERY VERY VERY VERY VERY VERY VERY VERY VERY VERY LONG NAME  ',
      },
    ],
    selectedList: [],
    error: '',
  });

  const [priority, setPriority] = useState<any>({
    value: '',
    list: [
      { _id: 'p1', value: 'Low' },
      { _id: 'p2', value: 'Medium' },
      { _id: 'p3', value: 'High' },
      { _id: 'p4', value: 'Critical' },
      {
        _id: 'oc-3',
        value:
          '   TESTING VERY VERY VERY VERY VERY VERY VERY VERY VERY VERY VERY VERY LONG NAME  ',
      },
    ],
    selectedList: [],
    error: '',
  });

  const [skills, setSkills] = useState<any>({
    value: '',
    list: [
      { _id: 's1', value: 'JavaScript' },
      { _id: 's2', value: 'TypeScript' },
      { _id: 's3', value: 'Python' },
      { _id: 's4', value: 'Java' },
      { _id: 's5', value: 'Go' },
      { _id: 's6', value: 'Rust' },
      {
        _id: 'oc-3',
        value:
          '   TESTING VERY VERY VERY VERY VERY VERY VERY VERY VERY VERY VERY VERY LONG NAME  ',
      },
    ],
    selectedList: [],
    error: '',
  });

  useEffect(() => {
    let isMounted = true;
    let _getData = async () => {
      if (isMounted) {
        let _tempList: Array<any> = [];
        for (let i = 0; i < 10000; i++) {
          _tempList.push({
            _id: `TEST_${i}_${Date.now()}_${Math.random()}`,
            value: 'OTHERS ' + i,
          });
        }
        setGender({
          ...gender,
          value: 'OTHERS',
          selectedList: [{ _id: '1', value: 'MALE' }],
        });

        setColors({
          ...colors,
          value: 'BLUE,RED',
          list: [...colors.list, ..._tempList],
          selectedList: [
            { _id: 'BLUE', value: 'BLUE' },
            { _id: 'RED', value: 'RED' },
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
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      style={styles.container}
    >
      <Headline
        style={{ marginBottom: 20, color: 'black', fontWeight: 'bold' }}
      >
        React Native Paper Select
      </Headline>

      <View style={{ width: '100%', marginBottom: 10 }}>
        <TextInput
          label="Email"
          value={text}
          onChangeText={(val) => setText(val)}
          autoCompleteType="email"
        />
      </View>

      <Subheading style={styles.sectionLabel}>
        Single Select (Dialog + Checkbox)
      </Subheading>
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
            text: 'blue',
            placeholder: 'gray',
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

      <Subheading style={styles.sectionLabel}>Multi Select (Dialog)</Subheading>
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
        limit={2}
      />

      <Subheading style={styles.sectionLabel}>Custom Renderer</Subheading>
      <PaperSelect
        label="Select Fruit (Custom Renderer)"
        value={fruits.value}
        onSelection={(value) => {
          setFruits({
            ...fruits,
            value: value.text,
            selectedList: value.selectedList,
            error: '',
          });
        }}
        arrayList={[...fruits.list]}
        selectedArrayList={[...fruits.selectedList]}
        errorText={fruits.error}
        multiEnable={false}
        textInputMode="flat"
        renderItem={({ item, isSelected, onPress, disabled }) => (
          <RadioButton.Item
            label={item.value}
            value={item._id}
            status={isSelected ? 'checked' : 'unchecked'}
            onPress={onPress}
            disabled={disabled}
          />
        )}
      />

      <Subheading style={styles.sectionLabel}>
        Bottom Sheet Presentation
      </Subheading>
      <PaperSelect
        label="Select Country (Bottom Sheet)"
        value={countries.value}
        onSelection={(value) => {
          setCountries({
            ...countries,
            value: value.text,
            selectedList: value.selectedList,
            error: '',
          });
        }}
        arrayList={[...countries.list]}
        selectedArrayList={[...countries.selectedList]}
        errorText={countries.error}
        multiEnable={false}
        presentationStyle="bottomSheet"
        bottomSheetBackgroundColor="#fff"
        bottomSheetHandleColor="#ccc"
      />

      <Subheading style={styles.sectionLabel}>
        Menu Presentation (Dropdown)
      </Subheading>
      <PaperSelect
        label="Select Country (Menu)"
        value={countries.value}
        onSelection={(value) => {
          setCountries({
            ...countries,
            value: value.text,
            selectedList: value.selectedList,
            error: '',
          });
        }}
        arrayList={[...countries.list]}
        selectedArrayList={[...countries.selectedList]}
        errorText={countries.error}
        multiEnable={false}
        presentationStyle="menu"
      />

      <Subheading style={styles.sectionLabel}>
        Sectional List (Grouped)
      </Subheading>
      <PaperSelect
        label="Select Country (Sectional)"
        value={sectionalCountry.value}
        onSelection={(value) => {
          setSectionalCountry({
            ...sectionalCountry,
            value: value.text,
            selectedList: value.selectedList,
            error: '',
          });
        }}
        arrayList={[]}
        selectedArrayList={[...sectionalCountry.selectedList]}
        errorText={sectionalCountry.error}
        multiEnable={true}
        sections={countrySections}
        sectionHeaderStyle={{ color: '#1565C0', fontWeight: '700' }}
        sectionHeaderContainerStyle={{ backgroundColor: '#E3F2FD' }}
      />

      <Subheading style={styles.sectionLabel}>
        Chips Style Selected Items
      </Subheading>
      <PaperSelect
        label="Select Tags (with Chips)"
        value={tags.value}
        onSelection={(value) => {
          setTags({
            ...tags,
            value: value.text,
            selectedList: value.selectedList,
            error: '',
          });
        }}
        arrayList={[...tags.list]}
        selectedArrayList={[...tags.selectedList]}
        errorText={tags.error}
        multiEnable={true}
        showChips={true}
        chipStyle={{ backgroundColor: '#E8EAF6' }}
        chipTextStyle={{ color: '#283593' }}
      />

      <Subheading style={styles.sectionLabel}>
        Single Select (Radio Variant)
      </Subheading>
      <PaperSelect
        label="Select Priority (Radio)"
        value={priority.value}
        onSelection={(value) => {
          setPriority({
            ...priority,
            value: value.text,
            selectedList: value.selectedList,
            error: '',
          });
        }}
        arrayList={[...priority.list]}
        selectedArrayList={[...priority.selectedList]}
        errorText={priority.error}
        multiEnable={false}
        singleSelectVariant="radio"
        radioButtonProps={{
          radioButtonColor: '#4CAF50',
          radioButtonLabelStyle: { color: '#333', fontWeight: '600' },
        }}
      />

      <Subheading style={styles.sectionLabel}>
        Bottom Sheet + Chips Combined
      </Subheading>
      <PaperSelect
        label="Select Skills (Bottom Sheet + Chips)"
        value={skills.value}
        onSelection={(value) => {
          setSkills({
            ...skills,
            value: value.text,
            selectedList: value.selectedList,
            error: '',
          });
        }}
        arrayList={[...skills.list]}
        selectedArrayList={[...skills.selectedList]}
        errorText={skills.error}
        multiEnable={true}
        presentationStyle="bottomSheet"
        showChips={true}
        chipStyle={{ backgroundColor: '#E8F5E9' }}
        chipTextStyle={{ color: '#2E7D32' }}
        bottomSheetBackgroundColor="#fafafa"
      />

      <PaperButton
        style={styles.button}
        labelStyle={styles.text}
        mode={'contained'}
        onPress={() => {
          Alert.alert(
            'All Selected Values',
            [
              `Gender: ${gender.value}`,
              `Colors: ${colors.value}`,
              `Fruits: ${fruits.value}`,
              `Country: ${countries.value}`,
              `Sectional Country: ${sectionalCountry.value}`,
              `Tags: ${tags.value}`,
              `Priority: ${priority.value}`,
              `Skills: ${skills.value}`,
            ].join('\n')
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
        Focus Gender Select
      </PaperButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 20,
  },
  sectionLabel: {
    width: '100%',
    marginTop: 16,
    marginBottom: 4,
    fontWeight: '600',
    color: '#555',
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
