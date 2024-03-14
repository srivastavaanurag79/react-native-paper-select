import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';
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
  checkboxMode,
}: CheckboxPropsFull) => (
  <View style={styles.container}>
    <Checkbox.Item
      uncheckedColor={checkboxUncheckedColor || '#000007'}
      color={checkboxColor || 'blue'}
      status={isChecked === true ? 'checked' : 'unchecked'}
      label={label.trim()}
      labelStyle={checkboxLabelStyle}
      mode={checkboxMode}
      position={`leading`}
    />
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
