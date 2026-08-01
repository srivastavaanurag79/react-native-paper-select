# Basic Usage

### Single Select

```
<PaperSelect
  inputRef={singleSelectRef}
  label="Select Gender"
  value={gender.value}
  onSelection={(value: any) => {
  setGender({
    ...gender,
    value: value.text,
    selectedList: value.selectedList,
    error: '',
    });
  }}
  arrayList={[...gender.list]}
  selectedArrayList={[...gender.selectedList]}
  errorText={gender.error}
  multiEnable={false}
  hideSearchBox={true}
  textInputMode="outlined"
  />
```

[See Example](https://github.com/srivastavaanurag79/react-native-paper-select/blob/master/example/src/App.tsx)

## New Features (v1.4.0+)

PaperSelect now supports:

- **Bottom Sheet** presentation — slide-up bottom sheet instead of dialog (`presentationStyle="bottomSheet"`)
- **Menu/Dropdown** presentation — compact centered dropdown (`presentationStyle="menu"`)
- **Sectional List** — grouped items with section headers and section-level select all (`sections` prop)
- **Chips Display** — selected items shown as removable chips inside the input field (`showChips` prop)
- **Radio Button** variant — radio button style for single select (`singleSelectVariant="radio"`)

See the [Advanced Usage](advanced-usage.md) guide for detailed examples of each feature.
See the [API](api.md) reference for the complete list of props.

## New Features (v1.4.0+)

PaperSelect now supports:
- **Bottom Sheet** presentation (presentationStyle="bottomSheet")
- **Menu/Dropdown** presentation (presentationStyle="menu")
- **Sectional List** with grouped items and section-level select all (sections prop)
- **Chips Display** showing selected items as removable chips (showChips prop)
- **Radio Button** variant for single select (singleSelectVariant="radio")

See the [Advanced Usage](advanced-usage.md) guide for examples.
