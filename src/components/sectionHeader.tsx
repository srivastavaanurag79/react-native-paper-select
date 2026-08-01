import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import type { ViewStyle, TextStyle } from 'react-native';
import CheckboxInput from './checkBox';
import type { PaperSelectCheckboxProps } from '../interface/checkbox.interface';

interface SectionHeaderProps {
  title: string;
  titleStyle?: TextStyle;
  containerStyle?: ViewStyle;
  showCheckbox?: boolean;
  isChecked?: boolean;
  onToggle?: () => void;
  disabled?: boolean;
  checkboxProps?: PaperSelectCheckboxProps;
  testID?: string;
}

const SectionHeader = ({
  title,
  titleStyle,
  containerStyle,
  showCheckbox = false,
  isChecked = false,
  onToggle,
  disabled = false,
  checkboxProps,
  testID,
}: SectionHeaderProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {showCheckbox ? (
        <CheckboxInput
          {...checkboxProps}
          isChecked={isChecked}
          label={title}
          onPress={onToggle ?? (() => {})}
          disabled={disabled}
          testID={testID}
        />
      ) : (
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    paddingHorizontal: 8,
  },
});

export default memo(SectionHeader);
