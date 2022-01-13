import type { ViewStyle, TextStyle } from 'react-native';

export interface list {
  _id: string;
  value: string;
}

export interface paperSelect {
  label: string;
  arrayList: Array<list>;
  selectedArrayList: Array<list>;
  multiEnable: boolean;
  errorText: string;
  value: string;
  onSelection: (item: any) => void;
  dialogStyle?: {
    backgroundColor?: ViewStyle['backgroundColor'];
    borderRadius?: ViewStyle['borderRadius'];
  };
  dialogTitleStyle?: TextStyle;
  searchStyle?: {
    backgroundColor?: ViewStyle['backgroundColor'];
    textColor?: TextStyle['color'];
    borderRadius?: number;
    borderColor?: ViewStyle['borderColor'];
    iconColor?: string;
  };
  checkboxUncheckedColor?: string;
  checkboxColor?: string;
  checkboxLabelStyle?: TextStyle;
  errorStyle?: TextStyle;
  textInputMode?: 'flat' | 'outlined';
  underlineColor?: string;
  activeUnderlineColor?: string;
  activeOutlineColor?: string;
  outlineColor?: string;
  textInputBackgroundColor?: string;
  textInputColor?: string;
  textInputHeight?: number;
  dialogButtonLabelStyle?: TextStyle;
}
