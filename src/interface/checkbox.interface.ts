import type { TextStyle } from 'react-native';

export interface checkbox {
  isChecked: boolean;
  label: string;
  checkboxColor?: string;
  checkboxLabelStyle?: TextStyle;
  checkboxUncheckedColor?: string;
}
