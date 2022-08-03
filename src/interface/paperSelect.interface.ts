/* eslint-disable prettier/prettier */
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
  error?: boolean;
  value: string;
  onSelection: (item: any) => void;
  dialogStyle?: ViewStyle;
  dialogTitleStyle?: TextStyle;
  searchStyle?: ViewStyle;
  searchIconColor?: string;
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
  textInputStyle?: ViewStyle;
  dropdownIconColor?: string;
  dialogButtonLabelStyle?: TextStyle;
  searchPlaceholder?: string;
  modalCloseButtonText?: string;
  modalDoneButtonText?: string;
  theme?: ReactNativePaper.Theme
}
