---
description: There is only one callback which returns the selected items.
---

# Callback

`onSelection` - Return the selected item when an item is selected

```javascript
onSelection={(value: any) => {
  console.log(value);
  setGender({
    ...gender,
    value: value.text,
    selectedList: value.selectedList,
    error: '',
  });
}}
```
