import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';
import type { ViewStyle, TextStyle } from 'react-native';
import type { ChipProps } from 'react-native-paper';
import type { ListItem } from '../interface/paperSelect.interface';

interface ChipsDisplayProps {
  selectedList: ListItem[];
  onRemove: (item: ListItem) => void;
  chipStyle?: ChipProps['style'];
  chipTextStyle?: TextStyle;
  containerStyle?: ViewStyle;
}

const ChipsDisplay = ({
  selectedList,
  onRemove,
  chipStyle,
  chipTextStyle,
  containerStyle,
}: ChipsDisplayProps) => {
  if (selectedList.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container, containerStyle]}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  chipWrapper: {
    marginRight: 6,
    marginBottom: 6,
  },
  chip: {
    height: 32,
  },
});

export default memo(ChipsDisplay);
