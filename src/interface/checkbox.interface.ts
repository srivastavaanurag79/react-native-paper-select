import type { TextStyle } from 'react-native';

export type TypographyVariant =
  | 'displayLarge'
  | 'displayMedium'
  | 'displaySmall'
  | 'headlineLarge'
  | 'headlineMedium'
  | 'headlineSmall'
  | 'titleLarge'
  | 'titleMedium'
  | 'titleSmall'
  | 'labelLarge'
  | 'labelMedium'
  | 'labelSmall'
  | 'bodyLarge'
  | 'bodyMedium'
  | 'bodySmall';

export interface PaperSelectCheckboxProps {
  checkboxColor?: string;
  checkboxUncheckedColor?: string;
  checkboxLabelStyle?: TextStyle;
  checkboxLabelVariant?: TypographyVariant;
  checkboxMode?: 'android' | 'ios';
}
