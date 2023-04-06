import type { MutableRefObject } from 'react';
import type { ViewStyle, TextStyle } from 'react-native';
import type { SearchbarProps, TextInputProps } from 'react-native-paper';
import type { ThemeProp } from 'react-native-paper/lib/typescript/src/types';
import type { CheckboxProps } from './checkbox.interface';

export interface ListItem {
  _id: string;
  value: string;
}

export interface SelectedItem {
  text: string;
  selectedList: Array<ListItem>;
}

export type SelectionCallback = (item: SelectedItem) => void;

export type PaperSelectTextInputProps = Pick<
  TextInputProps,
  | 'underlineColor'
  | 'activeUnderlineColor'
  | 'outlineColor'
  | 'activeOutlineColor'
>;

export interface PaperSelectProps {
  // Required props
  label: string;
  arrayList: ListItem[];
  selectedArrayList: ListItem[];
  multiEnable: boolean;
  value: string;
  onSelection: SelectionCallback;

  // Core props
  disabled?: boolean;
  hideSearchBox?: boolean;
  selectAllEnable?: boolean;
  textInputMode?: TextInputProps['mode'];
  theme?: ThemeProp;
  inputRef?: MutableRefObject<any>;

  // Localization props
  dialogTitle?: string;
  selectAllText?: string;
  searchText?: string;
  modalCloseButtonText?: string;
  modalDoneButtonText?: string;
  errorText?: string;

  // Style props
  containerStyle?: ViewStyle;
  textInputStyle?: TextStyle;
  dialogStyle?: ViewStyle;
  dialogTitleStyle?: TextStyle;
  searchStyle?: SearchbarProps['style'] & {
    iconColor?: string;
  };
  dialogButtonLabelStyle?: TextStyle;
  errorStyle?: TextStyle;

  // Component props
  textInputProps?: PaperSelectTextInputProps;
  checkboxProps?: CheckboxProps;
}
