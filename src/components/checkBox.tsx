/* eslint-disable react-native/no-inline-styles */
import React, { memo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Checkbox } from 'react-native-paper';
import type { checkbox } from 'src/interface/checkbox.interface';

const CheckboxInput = ({
  isChecked,
  label,
  checkboxColor,
  checkboxLabelStyle,
  checkboxUncheckedColor,
  theme,
}: checkbox) => (
  <View style={styles.container}>
    <Checkbox.Android
      theme={theme}
      uncheckedColor={checkboxUncheckedColor}
      color={checkboxColor}
      status={isChecked === true ? 'checked' : 'unchecked'}
    />
    <Text style={checkboxLabelStyle}> {label} </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default memo(CheckboxInput);
