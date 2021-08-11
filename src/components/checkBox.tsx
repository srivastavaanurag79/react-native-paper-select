import React, { memo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Checkbox } from 'react-native-paper';

export interface _types {
  _isChecked: boolean;
  label: string;
}
const CheckboxInput = ({ ..._types }) => (
  <View style={styles.container}>
    <Checkbox.Android
      status={_types.isChecked === true ? 'checked' : 'unchecked'}
    />
    <Text style={{ fontWeight: 'bold' }}> {_types.label} </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default memo(CheckboxInput);
