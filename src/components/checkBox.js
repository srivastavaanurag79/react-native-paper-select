/* eslint-disable react-native/no-inline-styles */
import React, { memo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Checkbox } from 'react-native-paper';

const CheckboxInput = ({ _isChecked, label }) => (
  <View style={styles.container}>
    <Checkbox.Android status={_isChecked === true ? 'checked' : 'unchecked'} />
    <Text style={{ fontWeight: 'bold' }}> {label} </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default memo(CheckboxInput);
