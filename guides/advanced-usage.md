# Advanced Usage

You can customize, `PaperSelect` as per your requirement. You can view a list of customization options at the [API](api.md) page.

## Translations
Static texts like the button texts, "Select all", the search placeholder can all be replaced through their respective properties:
- `label`: The actual label shown on the TextInput
- `dialogTitle`: The title shown in the dialog, this defaults to the label defined above
- `selectAllText`: The text shown on the "Select all" checkbox in the dialog, only will have an effect when `multiEnable` is true.
- `searchText`: The text shown in the searchbar placeholder
- `dialogCloseButtonText`: The text shown in the close button of the dialog.
- `dialogDoneButtonText`: The text shown in the done button of the dialog.
- `errorText`: A piece of text shown below the TextInput when you want to indicate an error has occured with your item selection.

## Overriding the theme
Like with most react-native-paper components, the theme can be overridden on a per component basis.
We utilize this method too, however the theme is applied to all sub-components below the container component.
If you need to set specific styles of certain components, you can find them in any of the `...Style` properties.

The theme can be provided in any possible configuration you can use in regular react-native-paper components, MD2/MD3 - Light/Dark.
By default it will use the theme as provided by the `PaperProvider`.

```tsx
  // This component will utilize a custom primary colour
  <PaperProvider theme={{ colors: { primary: "blue", secondary: "green" }}}>
    <PaperSelect
      label="Select Gender"
      value={gender.value}
      onSelection={(value: any) => {
      setGender({
              ...gender,
              value: value.text,
              selectedList: value.selectedList
          });
      }}
      arrayList={[...gender.list]}
      selectedArrayList={[...gender.selectedList]}
      multiEnable={false}
      theme={{
        colors: {
          primary: 'black'
        }
      }}
    />
  </PaperProvider>
```

```tsx
  // This component will utilize the default theme as provided by the PaperProvider
  <PaperProvider theme={{ colors: { primary: "blue", secondary: "green" }}}>
    <PaperSelect
      label="Select Gender"
      value={gender.value}
      onSelection={(value: any) => {
      setGender({
              ...gender,
              value: value.text,
              selectedList: value.selectedList
          });
      }}
      arrayList={[...gender.list]}
      selectedArrayList={[...gender.selectedList]}
      multiEnable={false}
    />
  </PaperProvider>
```

### Overriding components properties
Currently we support 2 different properties for overriding additional component properties, these are:
- `textInputProps`: Passes additional properties to the <TextInput> element where the selected value(s) are shown.
- `checkboxProps`: Passes additional properties to the <CheckBox> elements used for picking items in the dialog, aswell as the "Select all" option.
- `searchbarProps`: Passes additional properties to the <Searchbar> element used for searching in the possible items.

```tsx
  <PaperSelect
    label="Select Gender"
    value={gender.value}
    onSelection={(value: any) => {
    setGender({
            ...gender,
            value: value.text,
            selectedList: value.selectedList
        });
    }}
    arrayList={[...gender.list]}
    selectedArrayList={[...gender.selectedList]}
    multiEnable={false}
    textInputProps={{
      underlineColor: "red",
      left: <IconButton icon="delete" onPress={() => setGender(undefined)} />
    }}
    checkboxProps={{
      checkboxColor: "purple",
      checkboxUncheckedColor: "gold"
    }}
    searchbarProps={{
      iconColor: "brown"
    }}
  />
```
