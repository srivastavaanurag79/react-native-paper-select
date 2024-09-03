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
