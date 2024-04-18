import type { TextStyle } from 'react-native';

export interface PaperSelectCheckboxProps {
  checkboxColor?: string;
  checkboxUncheckedColor?: string;
  checkboxLabelStyle?: TextStyle;
  checkboxLabelVariant?: any;
  checkboxMode?: 'android' | 'ios';
}
