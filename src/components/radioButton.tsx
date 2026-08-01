import React, { memo, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import type { PaperSelectRadioButtonProps } from '../interface/paperSelect.interface';

interface RadioButtonPropsFull extends PaperSelectRadioButtonProps {
  isChecked: boolean;
  label: string;
  onPress: () => void;
  disabled?: boolean;
  testID?: string;
}

const RadioInput = ({
  isChecked,
  label,
  radioButtonColor,
  radioButtonUncheckedColor,
  radioButtonLabelStyle,
  radioButtonLabelVariant,
  disabled,
  onPress,
  testID,
}: RadioButtonPropsFull) => {
  const labelStyle = useMemo(
    () => ({
      ...radioButtonLabelStyle,
      textAlign: 'left' as const,
    }),
    [radioButtonLabelStyle]
  );

  return (
    <View style={styles.container}>
      <RadioButton.Item
        value={label}
        uncheckedColor={radioButtonUncheckedColor}
        color={radioButtonColor}
        status={isChecked ? 'checked' : 'unchecked'}
        label={label}
        labelStyle={labelStyle}
        labelVariant={radioButtonLabelVariant}
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

export default memo(RadioInput);
