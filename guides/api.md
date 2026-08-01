# API

## Select props

### Core properties

| Name              | Type                         | Description                                                                    | Default value | Required           |
| ----------------- | ---------------------------- | ------------------------------------------------------------------------------ | ------------- | ------------------ |
| label             | string                       | The label shown on the input element.                                          | N/A           | :white_check_mark: |
| arrayList         | Array<[ListItem](#ListItem)> | Array of [ListItem](#ListItem) objects.                                        | N/A           | :white_check_mark: |
| selectedArrayList | Array<[ListItem](#ListItem)> | Array of selected items, this array should be a subset of `arrayList`.         | N/A           | :white_check_mark: |
| multiEnable       | boolean                      | True to enable multi select, else it's single select.                          | N/A           | :white_check_mark: |
| value             | string                       | The value shown in the text input.                                             | N/A           | :white_check_mark: |
| onSelection       | (item: SelectedItem) => void | Callback function which is invoked when an item is selected                    | N/A           | :white_check_mark: |
| disabled          | boolean                      | Whether the input is disabled                                                  | false         | :x:                |
| hideSearchBox     | boolean                      | Whether to hide the search box in the dialog                                   | false         | :x:                |
| selectAllEnable   | boolean                      | Whether to enable the "Select all" checkbox, requires `multiEnable` to be true | true          | :x:                |
| textInputMode     | "flat" or "outlined"         | The mode of the text input                                                     | "flat"        | :x:                |
| theme             | ThemeProp                    | React Native Paper theme class                                                 | Default theme | :x:                |
| inputRef          | MutableRefObject\<any\>      | The ref which is applied to the text input.                                    | undefined     | :x:                |
| limit             | number \| null               | Limit the number of items one can select in multi-select. Disables select all if limit !== list length. | null | :x: |
| limitError        | string                       | Error message shown when limit is reached.                                     | "You can't select more than ${limit} items." | :x: |
| limitErrorStyle   | TextStyle                    | Style for the limit error text.                                                | undefined     | :x:                |

### Presentation properties

| Name              | Type                                     | Description                                                                                         | Default value | Required |
| ----------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------- | ------------- | -------- |
| presentationStyle | `'dialog'` \| `'bottomSheet'` \| `'menu'` | Controls how the selection UI is presented. `'dialog'` shows a modal dialog, `'bottomSheet'` shows a slide-up bottom sheet, `'menu'` shows a dropdown menu. | `'dialog'` | :x: |

### Section properties

| Name                        | Type          | Description                                                                                              | Default value | Required |
| --------------------------- | ------------- | -------------------------------------------------------------------------------------------------------- | ------------- | -------- |
| sections                    | Array\<[Section](#Section)\> | Array of Section objects for grouped/sectional list display. Each section has a title and data array. When provided, `arrayList` is derived from sections. | undefined | :x: |
| sectionHeaderStyle          | TextStyle     | Style for section header text.                                                                           | undefined     | :x:      |
| sectionHeaderContainerStyle | ViewStyle     | Style for section header container background.                                                           | undefined     | :x:      |

### Chip properties

| Name                | Type                | Description                                                              | Default value | Required |
| ------------------- | ------------------- | ------------------------------------------------------------------------ | ------------- | -------- |
| showChips           | boolean             | When true, selected items are displayed as removable chips inside the input field. | false   | :x:      |
| chipStyle           | ChipProps['style']  | Style for individual chip components.                                    | undefined     | :x:      |
| chipTextStyle       | TextStyle           | Text style for chip labels.                                              | undefined     | :x:      |
| chipsContainerStyle | ViewStyle           | Container style for the chips row layout.                                | undefined     | :x:      |

### Single select variant properties

| Name                | Type                              | Description                                                                                          | Default value | Required |
| ------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------- | -------- |
| singleSelectVariant | `'checkbox'` \| `'radio'`         | Controls item rendering for single select. `'checkbox'` uses checkboxes, `'radio'` uses radio buttons. | `'checkbox'` | :x: |
| radioButtonProps    | [PaperSelectRadioButtonProps](#PaperSelectRadioButtonProps) | Additional properties for radio button items (used when `singleSelectVariant='radio'`).              | undefined     | :x:      |

### Localization properties

| Name                  | Type      | Description                                                        | Default value    | Required |
| --------------------- | --------- | ------------------------------------------------------------------ | ---------------- | -------- |
| dialogTitle           | ReactNode | Title shown in the dialog                                          | `label` property | :x:      |
| selectAllText         | string    | The text shown in the "Select all" checkbox                        | "Select all"     | :x:      |
| searchText            | string    | The placeholder shown in the search box                            | "Search"         | :x:      |
| dialogCloseButtonText | string    | The text shown in the close button for the dialog                  | "Close"          | :x:      |
| dialogDoneButtonText  | string    | The text shown in the done button for the dialog                   | "Done"           | :x:      |
| errorText             | string    | The helper text shown below the text input if something went wrong | undefined        | :x:      |

### Style properties

| Name                    | Type      | Description                                                                                                                                                  | Default value | Required |
| ----------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- | -------- |
| containerStyle          | ViewStyle | Surrounding container style                                                                                                                                  | undefined     | :x:      |
| textInputStyle          | TextStyle | Text input style                                                                                                                                             | undefined     | :x:      |
| textInputOutlineStyle   | ViewStyle | Select box outline border (works with react native paper v5). Pass style to override the default style of outlined wrapper. Example: borderRadius, borderColor | undefined | :x: |
| dialogStyle             | ViewStyle | Dialog style                                                                                                                                                 | undefined     | :x:      |
| dialogTitleStyle        | TextStyle | Dialog title style                                                                                                                                           | undefined     | :x:      |
| searchStyle             | ViewStyle | Searchbar style in dialog                                                                                                                                    | undefined     | :x:      |
| dialogCloseButtonStyle  | TextStyle | Close button label style                                                                                                                                     | undefined     | :x:      |
| dialogDoneButtonStyle   | TextStyle | Done button label style                                                                                                                                      | undefined     | :x:      |
| errorStyle              | TextStyle | Error text style                                                                                                                                             | undefined     | :x:      |
| textColor               | string    | Text color of the input box                                                                                                                                  | undefined     | :x:      |
| bottomSheetStyle        | ViewStyle | Style for bottom sheet content container                                                                                                                     | undefined     | :x:      |
| bottomSheetBackgroundColor | string | Background color of the bottom sheet                                                                                                                         | '#ffffff'     | :x:      |
| bottomSheetHandleColor  | string    | Color of the drag handle                                                                                                                                     | '#999999'     | :x:      |
| bottomSheetTitleStyle   | TextStyle | Style for the bottom sheet title                                                                                                                             | undefined     | :x:      |

### Component properties

| Name           | Type                                                    | Description                                        | Default value | Required |
| -------------- | ------------------------------------------------------- | -------------------------------------------------- | ------------- | -------- |
| textInputProps | [PaperSelectTextInputProps](#PaperSelectTextInputProps) | Additional properties to supply to the text input. | undefined     | :x:      |
| checkboxProps  | [PaperSelectCheckboxProps](#PaperSelectCheckboxProps)   | Additional properties to supply to the checkboxes. | undefined     | :x:      |
| searchbarProps | [PaperSelectSearchbarProps](#PaperSelectSearchbarProps) | Additional properties to supply to the searchbar.  | undefined     | :x:      |
| renderItem     | (props: [PaperSelectRenderItemProps](#PaperSelectRenderItemProps)) => ReactNode | Custom render function for dropdown items. Receives item, isSelected, onPress, and disabled. | undefined | :x: |

### Test properties

| Name                     | Type   | Description                                              | Default value | Required |
| ------------------------ | ------ | -------------------------------------------------------- | ------------- | -------- |
| testID                   | string | Test id for paper select                                 | undefined     | :x:      |
| dialogTestID             | string | Test id for dialog/bottom sheet                          | undefined     | :x:      |
| searchbarTestID          | string | Test id for search bar                                   | undefined     | :x:      |
| selectAllCheckboxTestID  | string | Test id for select all checkbox                          | undefined     | :x:      |
| itemCheckboxTestIDPrefix | string | Prefix for item checkbox test ids                        | `checkbox-`   | :x:      |


## Types

### ListItem
```ts
export interface ListItem {
  _id: string;
  value: string;
  disabled?: boolean;
}
```

### Section
```ts
export interface Section {
  title: string;
  data: ListItem[];
}
```

### SelectedItem
```ts
export interface SelectedItem {
  text: string;
  selectedList: Array<ListItem>;
}
```

### PaperSelectTextInputProps
```ts
export interface PaperSelectTextInputProps {
  underlineColor?: string;
  activeUnderlineColor?: string;
  outlineColor?: string;
  activeOutlineColor?: string;
  left?: ReactNode;
  right?: ReactNode;
}
```

### PaperSelectCheckboxProps
```ts
export interface PaperSelectCheckboxProps {
  checkboxColor?: string;
  checkboxUncheckedColor?: string;
  checkboxLabelStyle?: TextStyle;
  checkboxLabelVariant?: TypographyVariant;
  checkboxMode?: 'android' | 'ios';
}
```

### PaperSelectRadioButtonProps
```ts
export interface PaperSelectRadioButtonProps {
  radioButtonColor?: string;
  radioButtonUncheckedColor?: string;
  radioButtonLabelStyle?: TextStyle;
  radioButtonLabelVariant?: TypographyVariant;
}
```

### PaperSelectSearchbarProps
```ts
export interface PaperSelectSearchbarProps {
  icon?: IconSource;
  iconColor?: string;
}
```

### PaperSelectRenderItemProps
```ts
export interface PaperSelectRenderItemProps {
  item: ListItem;
  isSelected: boolean;
  onPress: () => void;
  disabled?: boolean;
}
```
