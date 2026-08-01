/* eslint-disable react-native/no-inline-styles */
import React, { memo, useMemo } from 'react';
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
}: CheckboxPropsFull) => {
  const labelStyle = useMemo(
    () => ({
      ...checkboxLabelStyle,
      textAlign: 'left' as const,
    }),
    [checkboxLabelStyle]
  );

  return (
    <View style={styles.container}>
      <Checkbox.Item
        uncheckedColor={checkboxUncheckedColor}
        color={checkboxColor}
        status={isChecked ? 'checked' : 'unchecked'}
        label={label.trim()}
        labelStyle={labelStyle}
        labelVariant={checkboxLabelVariant}
        mode={checkboxMode}
        position="leading"
        disabled={disabled}
        onPress={disabled ? () => {} : onPress}
        testID={testID}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
  },
});

export default memo(CheckboxInput);
