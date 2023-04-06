# API

## Select props

### Core properties

| Name              | Type                         | Description                                                                    | Default value | Required |
| ----------------- | ---------------------------- | ------------------------------------------------------------------------------ | ------------- | -------- |
| label             | string                       | The label shown on the input element.                                          | N/A           | [X]      |
| arrayList         | Array<[ListItem](#ListItem)> | Array of [ListItem](#ListItem) objects.                                        | N/A           | [X]      |
| selectedArrayList | Array<[ListItem](#ListItem)> | Array of selected items, this array should be a subset of `arrayList`.         | N/A           | [X]      |
| multiEnable       | boolean                      | True to enable multi select, else it's single select.                          | N/A           | [X]      |
| value             | string                       | The value shown in the text input.                                             | N/A           | [X]      |
| onSelection       | (item: SelectedItem) => void | Callback function which is invoked when an item is selected                    | N/A           | [X]      |
| disabled          | boolean                      | Whether the input is disabled                                                  | false         | []       |
| hideSearchBox     | boolean                      | Whether to hide the search box in the dialog                                   | false         | []       |
| selectAllEnable   | boolean                      | Whether to enable the "Select all" checkbox, requires `multiEnable` to be true | true          | []       |
| textInputMode     | "flat" or "outlined"         | The mode of the text input                                                     | "flat"        | []       |
| theme             | ThemeProp                    | React Native Paper theme class                                                 | Default theme | []       |
| inputRef          | MutableRefObject<any>        | The ref which is applied to the text input.                                    | undefined     | []       |

### Localization properties

| Name                  | Type   | Description                                                        | Default value    | Required |
| --------------------- | ------ | ------------------------------------------------------------------ | ---------------- | -------- |
| dialogTitle           | string | Title shown in the dialog                                          | `label` property | []       |
| selectAllText         | string | The text shown in the "Select all" checkbox                        | "Select all"     | []       |
| searchText            | string | The placeholder shown in the search box                            | "Search"         | []       |
| dialogCloseButtonText | string | The text shown in the close button for the dialog                  | "Close"          | []       |
| dialogDoneButtonText  | string | The text shown in the done button for the dialog                   | "Done"           | []       |
| errorText             | string | The helper text shown below the text input if something went wrong | undefined        | []       |

### Style properties

| Name             | Type      | Description                 | Default value | Required |
| ---------------- | --------- | --------------------------- | ------------- | -------- |
| containerStyle   | ViewStyle | Surrounding container style | undefined     | []       |
| textInputStyle   | TextStyle | Text input style            | undefined     | []       |
| dialogStyle      | ViewStyle | Dialog style                | undefined     | []       |
| dialogTitleStyle | TextStyle | Dialog title style          | undefined     | []       |
| searchStyle      | ViewStyle | Searchbar style in dialog   | undefined     | []       |
| errorStyle       | TextStyle | error style                 | undefined     | []       |

### Component properties

| Name           | Type                      | Description                                        | Default value | Required |
| -------------- | ------------------------- | -------------------------------------------------- | ------------- | -------- |
| textInputProps | PaperSelectTextInputProps | Additional properties to supply to the text input. | undefined     | []       |
| checkboxProps  | CheckboxProps             | Additional properties to supply to the checkboxes. | undefined     | []       |

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

### PaperSelectTextInputProps
```ts
export interface CheckboxProps {
  checkboxColor?: string;
  checkboxUncheckedColor?: string;
  checkboxLabelStyle?: TextStyle;
}
```
