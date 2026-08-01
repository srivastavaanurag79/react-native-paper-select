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

## Custom Item Renderer

You can completely replace the default checkbox rendering with your own custom component using the `renderItem` prop. This is useful when you want to use radio buttons, custom icons, or any other visual representation for your list items.

The `renderItem` function receives an object with:
- `item`: The current ListItem being rendered
- `isSelected`: Boolean indicating if the item is currently selected
- `onPress`: Function to call when the item is pressed
- `disabled`: Boolean indicating if the item is disabled

### Example: Using Radio Buttons

```tsx
import { RadioButton } from 'react-native-paper';

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
  renderItem={({ item, isSelected, onPress, disabled }) => (
    <RadioButton.Item
      label={item.value}
      status={isSelected ? 'checked' : 'unchecked'}
      onPress={onPress}
      disabled={disabled}
    />
  )}
/>
```

### Example: Custom Icons

```tsx
import { IconButton } from 'react-native-paper';

<PaperSelect
  label="Select Items"
  value={items.value}
  onSelection={(value: any) => {
    setItems({
      ...items,
      value: value.text,
      selectedList: value.selectedList
    });
  }}
  arrayList={[...items.list]}
  selectedArrayList={[...items.selectedList]}
  multiEnable={true}
  renderItem={({ item, isSelected, onPress, disabled }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
      <IconButton
        icon={isSelected ? 'checkbox-marked' : 'checkbox-blank-outline'}
        onPress={onPress}
        disabled={disabled}
        iconColor={isSelected ? 'blue' : 'gray'}
      />
      <Text>{item.value}</Text>
    </View>
  )}
/>
```

## Presentation Styles

PaperSelect supports three presentation styles for the selection UI:

### Dialog (Default)
The default presentation uses a modal dialog. No additional configuration needed.

```tsx
<PaperSelect
  label="Select Country"
  value={country.value}
  onSelection={handleSelection}
  arrayList={country.list}
  selectedArrayList={country.selectedList}
  multiEnable={false}
  // presentationStyle defaults to 'dialog'
/>
```

### Bottom Sheet
A slide-up bottom sheet that takes up 70% of the screen height. Ideal for mobile UX with gesture support (drag to dismiss).

```tsx
<PaperSelect
  label="Select Country"
  value={country.value}
  onSelection={handleSelection}
  arrayList={country.list}
  selectedArrayList={country.selectedList}
  multiEnable={false}
  presentationStyle="bottomSheet"
  bottomSheetBackgroundColor="#fff"
  bottomSheetHandleColor="#ccc"
/>
```

### Menu (Dropdown)
A centered dropdown modal. Compact and clean, works well for both single and multi-select.

```tsx
<PaperSelect
  label="Select Country"
  value={country.value}
  onSelection={handleSelection}
  arrayList={country.list}
  selectedArrayList={country.selectedList}
  multiEnable={false}
  presentationStyle="menu"
/>
```

## Sectional List (Grouped Items)

Display items grouped under section headers. Each section header has a checkbox (in multi-select mode) that selects/deselects all items in that section.

```tsx
import type { Section } from 'react-native-paper-select';

const countrySections: Section[] = [
  {
    title: 'Asia',
    data: [
      { _id: 'asia-1', value: 'India' },
      { _id: 'asia-2', value: 'China' },
      { _id: 'asia-3', value: 'Japan' },
    ],
  },
  {
    title: 'Europe',
    data: [
      { _id: 'eu-1', value: 'UK' },
      { _id: 'eu-2', value: 'France' },
      { _id: 'eu-3', value: 'Germany' },
    ],
  },
];

<PaperSelect
  label="Select Country"
  value={country.value}
  onSelection={handleSelection}
  arrayList={[]}
  selectedArrayList={country.selectedList}
  multiEnable={true}
  sections={countrySections}
  sectionHeaderStyle={{ color: '#1565C0', fontWeight: '700' }}
  sectionHeaderContainerStyle={{ backgroundColor: '#E3F2FD' }}
/>
```

When `sections` is provided, `arrayList` is derived by flattening all section data. The "Select all" checkbox at the top selects all items across all sections. Each section header checkbox selects/deselects only items within that section.

## Chips Display

Show selected items as removable chips inside the input field instead of comma-separated text. This provides a better UX for multi-select with many items.

```tsx
<PaperSelect
  label="Select Tags"
  value={tags.value}
  onSelection={handleSelection}
  arrayList={tags.list}
  selectedArrayList={tags.selectedList}
  multiEnable={true}
  showChips={true}
  chipStyle={{ backgroundColor: '#E8EAF6' }}
  chipTextStyle={{ color: '#283593' }}
/>
```

Chips can be combined with any presentation style:

```tsx
<PaperSelect
  label="Select Skills"
  value={skills.value}
  onSelection={handleSelection}
  arrayList={skills.list}
  selectedArrayList={skills.selectedList}
  multiEnable={true}
  presentationStyle="bottomSheet"
  showChips={true}
/>
```

## Single Select Radio Variant

Use radio buttons instead of checkboxes for single select. Provides a clearer visual indication that only one item can be selected.

```tsx
<PaperSelect
  label="Select Priority"
  value={priority.value}
  onSelection={handleSelection}
  arrayList={priority.list}
  selectedArrayList={priority.selectedList}
  multiEnable={false}
  singleSelectVariant="radio"
  radioButtonProps={{
    radioButtonColor: '#4CAF50',
    radioButtonLabelStyle: { color: '#333', fontWeight: '600' },
  }}
/>
```

## Combining Features

All new features can be combined:

```tsx
<PaperSelect
  label="Select Skills"
  value={skills.value}
  onSelection={handleSelection}
  arrayList={skills.list}
  selectedArrayList={skills.selectedList}
  multiEnable={true}
  presentationStyle="bottomSheet"
  showChips={true}
  chipStyle={{ backgroundColor: '#E8F5E9' }}
  chipTextStyle={{ color: '#2E7D32' }}
  bottomSheetBackgroundColor="#fafafa"
/>
```
