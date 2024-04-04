import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';
import type { PaperSelectCheckboxProps } from 'src/interface/checkbox.interface';

interface CheckboxPropsFull extends PaperSelectCheckboxProps {
  isChecked: boolean;
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

const CheckboxInput = ({
  isChecked,
  label,
  checkboxColor,
  checkboxLabelStyle,
  checkboxUncheckedColor,
  checkboxMode,
  disabled,
  onPress,
}: CheckboxPropsFull) => (
  <View style={styles.container}>
    <Checkbox.Item
      uncheckedColor={checkboxUncheckedColor}
      color={checkboxColor || 'blue'}
      status={isChecked === true ? 'checked' : 'unchecked'}
      label={label.trim()}
      labelStyle={checkboxLabelStyle}
      mode={checkboxMode}
      position={`leading`}
      disabled={disabled}
      onPress={onPress}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
});

export default memo(CheckboxInput);
