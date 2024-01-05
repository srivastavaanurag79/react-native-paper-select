import type { ReactNode, MutableRefObject } from 'react';
import type { ViewStyle, TextStyle } from 'react-native';
import type { SearchbarProps, TextInputProps } from 'react-native-paper';
import type { ThemeProp } from 'react-native-paper/lib/typescript/src/types';
import type { PaperSelectCheckboxProps } from './checkbox.interface';

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
  | 'left'
  | 'right'
>;

export type PaperSelectSearchbarProps = Pick<
  SearchbarProps,
  'icon' | 'iconColor'
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
  dialogTitle?: ReactNode;
  selectAllText?: string;
  searchText?: string;
  dialogCloseButtonText?: string;
  dialogDoneButtonText?: string;
  errorText?: string;

  // Style props
  containerStyle?: ViewStyle;
  textInputStyle?: TextStyle;
  textInputOutlineStyle?: ViewStyle;
  dialogStyle?: ViewStyle;
  dialogTitleStyle?: TextStyle;
  searchStyle?: SearchbarProps['style'];
  dialogCloseButtonStyle?: TextStyle;
  dialogDoneButtonStyle?: TextStyle;
  errorStyle?: TextStyle;

  // Component props
  textInputProps?: PaperSelectTextInputProps;
  checkboxProps?: PaperSelectCheckboxProps;
  searchbarProps?: PaperSelectSearchbarProps;
}
