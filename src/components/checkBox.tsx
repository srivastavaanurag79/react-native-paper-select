import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';
import type { PaperSelectCheckboxProps } from 'src/interface/checkbox.interface';

interface CheckboxPropsFull extends PaperSelectCheckboxProps {
  isChecked: boolean;
  label: string;
}

const CheckboxInput = ({
  isChecked,
  label,
  checkboxColor,
  checkboxLabelStyle,
  checkboxUncheckedColor,
}: CheckboxPropsFull) => (
  <View style={styles.container}>
    <Checkbox
      uncheckedColor={checkboxUncheckedColor || '#000007'}
      color={checkboxColor || 'blue'}
      status={isChecked === true ? 'checked' : 'unchecked'}
    />
    <Text style={[styles.labelStyle, checkboxLabelStyle]}>{label.trim()}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginBottom: 1.5,
  },
  labelStyle: {
    flexDirection: 'row',
    flexShrink: 1,
  },
});

export default memo(CheckboxInput);
