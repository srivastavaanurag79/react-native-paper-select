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
| inputRef          | MutableRefObject<any>        | The ref which is applied to the text input.                                    | undefined     | :x:                |
| limit          | number        | Limit the number of items one can select in multi-select, disables the select all if the limit is not equal to list length                                    | null     | :x:                |


### Localization properties

| Name                  | Type      | Description                                                        | Default value    | Required |
| --------------------- | --------- | ------------------------------------------------------------------ | ---------------- | -------- |
| dialogTitle           | ReactNode | Title shown in the dialog                                          | `label` property | :x:      |
| selectAllText         | string    | The text shown in the "Select all" checkbox                        | "Select all"     | :x:      |
| searchText            | string    | The placeholder shown in the search box                            | "Search"         | :x:      |
| dialogCloseButtonText | string    | The text shown in the close button for the dialog                  | "Close"          | :x:      |
| dialogDoneButtonText  | string    | The text shown in the done button for the dialog                   | "Done"           | :x:      |
| errorText             | string    | The helper text shown below the text input if something went wrong | undefined        | :x:      |
| limitError          | string        | error message to show if limit meets.                                    | You can't select more than ${limit} items.     | :x:                |

### Style properties

| Name             | Type      | Description                 | Default value | Required |
| ---------------- | --------- | --------------------------- | ------------- | -------- |
| containerStyle   | ViewStyle | Surrounding container style | undefined     | :x:      |
| textInputStyle   | TextStyle | Text input style            | undefined     | :x:      |
| dialogStyle      | ViewStyle | Dialog style                | undefined     | :x:      |
| dialogTitleStyle | TextStyle | Dialog title style          | undefined     | :x:      |
| searchStyle      | ViewStyle | Searchbar style in dialog   | undefined     | :x:      |
| errorStyle       | TextStyle | error style                 | undefined     | :x:      |
| textInputOutlineStyle       | ViewStyle | select box outline border. (works with react native paper v5) Pass style to override the default style of outlined wrapper. Overrides style when mode is set to outlined Example: borderRadius, borderColor                 | undefined     | :x:      |
| textColor   | string | Text color of the input box            | undefined     | :x:      |
| limitErrorStyle       | TextStyle | limit error text style                 | undefined     | :x:      |

### Component properties

| Name           | Type                                                    | Description                                        | Default value | Required |
| -------------- | ------------------------------------------------------- | -------------------------------------------------- | ------------- | -------- |
| textInputProps | [PaperSelectTextInputProps](https://callstack.github.io/react-native-paper/docs/components/TextInput/) | Additional properties to supply to the text input. | undefined     | :x:      |
| checkboxProps  | [PaperSelectCheckboxProps](https://callstack.github.io/react-native-paper/docs/components/Checkbox/CheckboxItem)   | Additional properties to supply to the checkboxes. | undefined     | :x:      |
| searchbarProps  | [PaperSelectSearchbarProps](https://callstack.github.io/react-native-paper/docs/components/Searchbar) | Additional properties to supply to the searchbar.  | undefined     | :x:      |

### Test properties

| Name           | Type                                                    | Description                                        | Default value | Required |
| -------------- | ------------------------------------------------------- | -------------------------------------------------- | ------------- | -------- |
| testID | string  | test id for paper select | undefined     | :x:      |
| dialogTestID  | string   | test id for dialog box | undefined     | :x:      |
| searchbarTestID  | string | test id for search bar in dialog box  | undefined     | :x:      |
| selectAllCheckboxTestID  | string | test id for select all in dialog box  | undefined     | :x:      |
| itemCheckboxTestIDPrefix  | string | Additional properties to supply to the searchbar.  | checkbox-     | :x:      |


## Types

### ListItem
```ts
export interface ListItem {
  _id: string;
  value: string;
}
```

### PaperSelectTextInputProps
```ts
export interface PaperSelectTextInputProps {
  underlineColor?: string;
  activeUnderlineColor?: string;
  outlineColor?: string;
  activeOutlineColor?: string;
}
```

### PaperSelectCheckboxProps
```ts
export interface PaperSelectCheckboxProps {
  checkboxColor?: string;
  checkboxUncheckedColor?: string;
  checkboxLabelStyle?: TextStyle;
}
```

### PaperSelectSearchbarProps
```ts
export interface PaperSelectSearchbarProps {
  icon?: IconSource;
  iconColor?: string;
}
```
