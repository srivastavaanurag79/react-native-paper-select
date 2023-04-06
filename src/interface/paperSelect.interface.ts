import type { MutableRefObject } from 'react';
import type { ViewStyle, TextStyle } from 'react-native';
import type { Fonts } from 'react-native-paper/lib/typescript/src/types';

export interface list {
  _id: string;
  value: string;
}

export interface SelectedItem {
  text: string;
  selectedList: Array<list>;
}

export interface paperSelect {
  inputRef?: MutableRefObject<any>;
  label: string;
  arrayList: Array<list>;
  selectedArrayList: Array<list>;
  multiEnable: boolean;
  errorText: string;
  value: string;
  onSelection: (item: SelectedItem) => void;
  selectAllEnable?: boolean;
  selectAllText?: string;
  containerStyle?: ViewStyle;
  dialogStyle?: {
    backgroundColor?: ViewStyle['backgroundColor'];
    borderRadius?: ViewStyle['borderRadius'];
  };
  dialogTitle?: string;
  dialogTitleStyle?: TextStyle;
  searchStyle?: {
    backgroundColor?: ViewStyle['backgroundColor'];
    textColor?: TextStyle['color'];
    borderRadius?: number;
    borderColor?: ViewStyle['borderColor'];
    iconColor?: string;
  };
  disabled?: boolean;
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
  textInputStyle?: TextStyle;
  hideSearchBox?: boolean;
  searchPlaceholder?: string;
  dialogCloseButtonText?: string;
  dialogDoneButtonText?: string;
  dialogCloseButtonStyle?: TextStyle;
  dialogDoneButtonStyle?: TextStyle;
  theme?: {
    dark?: boolean;
    mode?: 'adaptive' | 'exact';
    roundness?: number;
    colors?: {
      primary?: string;
      background?: string;
      surface?: string;
      accent?: string;
      error?: string;
      text?: string;
      onSurface?: string;
      disabled?: string;
      placeholder?: string;
      backdrop?: string;
      notification?: string;
    };
    fonts?: Fonts;
    animation?: {
      scale: number;
    };
  };
}
