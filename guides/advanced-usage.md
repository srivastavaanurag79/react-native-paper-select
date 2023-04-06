# Advanced Usage

You can customize, `PaperSelect` as per your requirement. Some of the customization options are:

* `textInputMode` - you have two material options to choose from `flat` and `outlined` . See [`screenshot`](broken-reference).
* `modalDoneButtonText` - you can change the modal's button text in your language.
* `theme` - you can change the colour of the placeholder/label using:
  * ```
    theme={{colors: {placeholder: 'black'}}}
    ```

```typescript
  // theme={{colors: {placeholder: 'black'}}}
  // changes the label/placeholder color whereas
  // outlineColor changes the border color
  <PaperSelect
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
    outlineColor="black"
    theme={{
      colors: {
        placeholder: 'black'
      }
    }}
  />
```



For more options, see [`Customizations`](customizations.md)

Check out the [`Example`](../example.md#code) code for advance usage.
