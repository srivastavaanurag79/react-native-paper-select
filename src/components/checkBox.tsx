/* eslint-disable react-native/no-inline-styles */
import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';
import type { PaperSelectCheckboxProps } from 'src/interface/checkbox.interface';

interface CheckboxPropsFull extends PaperSelectCheckboxProps {
  isChecked: boolean;
  label: string;
  onPress: () => void;
  disabled?: boolean;
  testID?: string;
}

const CheckboxInput = ({
  isChecked,
  label,
  checkboxColor,
  checkboxLabelStyle,
  checkboxLabelVariant,
  checkboxUncheckedColor,
  checkboxMode,
  disabled,
  onPress,
  testID,
}: CheckboxPropsFull) => (
  <View style={styles.container}>
    <Checkbox.Item
      uncheckedColor={checkboxUncheckedColor}
      color={checkboxColor}
      status={
        disabled
          ? 'indeterminate'
          : isChecked === true
          ? 'checked'
          : 'unchecked'
      }
      label={label.trim()}
      labelStyle={{ ...checkboxLabelStyle, textAlign: 'left' }}
      labelVariant={checkboxLabelVariant}
      mode={checkboxMode}
      position={`leading`}
      disabled={disabled}
      onPress={disabled ? () => {} : onPress}
      testID={testID}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
  },
});

export default memo(CheckboxInput);
