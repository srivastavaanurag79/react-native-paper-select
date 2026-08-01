import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Chip, Text } from 'react-native-paper';
import type { ViewStyle, TextStyle } from 'react-native';
import type { ChipProps } from 'react-native-paper';
import type { ListItem } from '../interface/paperSelect.interface';

interface ChipInputProps {
  label: string;
  selectedList: ListItem[];
  onRemove: (item: ListItem) => void;
  onPress: () => void;
  disabled?: boolean;
  error?: boolean;
  errorText?: string;
  containerStyle?: ViewStyle;
  chipStyle?: ChipProps['style'];
  chipTextStyle?: TextStyle;
  labelStyle?: TextStyle;
  textColor?: string;
}

const ChipInput = ({
  label,
  selectedList,
  onRemove,
  onPress,
  disabled = false,
  error = false,
  errorText,
  containerStyle,
  chipStyle,
  chipTextStyle,
  labelStyle,
  textColor,
}: ChipInputProps) => {
  return (
    <View style={[styles.wrapper, containerStyle]}>
      <Pressable
        onPress={disabled ? undefined : onPress}
        disabled={disabled}
        style={({ pressed }) => [
          styles.container,
          error && styles.containerError,
          disabled && styles.containerDisabled,
          pressed && styles.containerPressed,
        ]}
      >
        {label ? (
          <Text
            style={[
              styles.label,
              labelStyle,
              textColor ? { color: textColor } : undefined,
            ]}
            numberOfLines={1}
          >
            {label}
          </Text>
        ) : null}
        {selectedList.length > 0 ? (
          <View style={styles.chipsContainer}>
            {selectedList.map((item) => (
              <View key={item._id} style={styles.chipWrapper}>
                <Chip
                  style={[styles.chip, chipStyle]}
                  textStyle={chipTextStyle}
                  onClose={() => onRemove(item)}
                  compact
                >
                  {item.value}
                </Chip>
              </View>
            ))}
          </View>
        ) : null}
      </Pressable>
      {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: 10,
  },
  container: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
    minHeight: 56,
    justifyContent: 'center',
  },
  containerError: {
    borderColor: '#B00020',
  },
  containerDisabled: {
    opacity: 0.5,
    backgroundColor: '#f5f5f5',
  },
  containerPressed: {
    backgroundColor: '#f0f0f0',
  },
  label: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chipWrapper: {
    marginRight: 6,
    marginBottom: 4,
  },
  chip: {
    height: 32,
    margin: 0,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 12,
    color: '#B00020',
  },
});

export default memo(ChipInput);
