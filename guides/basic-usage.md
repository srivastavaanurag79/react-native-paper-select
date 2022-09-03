# Basic Usage

You start with a `PaperSelect` component that will render a `TextInput`. It has 7 required properties:

* `label` - The label you would want for the rendered text input box.
* `arrayList` - The list of items you would want the user to select from.
* `selectedArrayList` - if you want to preselect any group of items or it contains the selected items.
* `multiEnable` - it lets the developer switch between single-select or multi-select, if true more than one item can be selected.
* `errorText` - if you want to show an error message to the user on the wrong input, default: set it to an empty string.
* `value` - text to display in the text input i.e. the selected items comma-separated, default: set it to an empty string if no preselect.
* `onSelection` - callback function which returns the selected items and the text to display in the text input.

### Single-select

Below you will find a drop-in example of single-select

{% code title="App.tsx" lineNumbers="true" %}
```typescript
import React, { useState, useEffect } from 'react';

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
  const [gender, setGender] = useState<any>({
    value: '',
    list: [
      { _id: '1', value: 'MALE' },
      { _id: '2', value: 'FEMALE' },
      { _id: '3', value: 'OTHERS' },
    ],
    selectedList: [],
    error: '',
  });

  useEffect(() => {
    let isMounted = true;
    let _getData = async () => {
      if (isMounted) {
        setGender({
          ...gender,
          value: 'OTHERS',
          selectedList: [{ _id: '3', value: 'OTHERS' }],
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
      <Headline style={{ marginBottom: 20, color: 'black', fontWeight: 'bold' }}>
        React Native Paper Select
      </Headline>
      <PaperSelect
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
      />
      
      <PaperButton
        style={styles.button}
        labelStyle={styles.text}
        mode={'outlined'}
        onPress={() => {
          const genderError = selectValidator(gender.value);
          if (genderError) {
            setGender({ ...gender, error: genderError });
            return;
          }
          Alert.alert(
            'Selected Values',
            'Gender: ' + gender.value
          );
        }}
      >
        Submit
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

```
{% endcode %}

### Multi-select

Below you will find a drop-in example of multi-select

{% code title="App.tsx" lineNumbers="true" %}
```typescript
import React, { useState, useEffect } from 'react';

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
      <Headline style={{ marginBottom: 20, color: 'black', fontWeight: 'bold' }}>
        React Native Paper Select
      </Headline>
      <PaperSelect
        label="Select Colors"
        value={colors.value}
        onSelection={(value: any) => {
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
      />
      <PaperButton
        style={styles.button}
        labelStyle={styles.text}
        mode={'outlined'}
        onPress={() => {
          const colorError = selectValidator(colors.value);
          if (colorError) {
            setColors({ ...colors, error: colorError });
            return;
          }
          Alert.alert(
            'Selected Values',
            'Colors: ' + colors.value
          );
        }}
      >
        Submit
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

```
{% endcode %}
