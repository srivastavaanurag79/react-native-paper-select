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
}: checkbox) => (
  <View style={styles.container}>
    <Checkbox.Android
      uncheckedColor={checkboxUncheckedColor || '#000007'}
      color={checkboxColor || 'blue'}
      status={isChecked === true ? 'checked' : 'unchecked'}
      style={{ flex: 1 }}
    />
    <Text
      style={{
        ...checkboxLabelStyle,
        flexDirection: 'row',
        flexShrink: 1,
      }}
    >
      {label.trim()}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginBottom: 1.5,
  },
});

export default memo(CheckboxInput);
