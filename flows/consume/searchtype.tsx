import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
//type = quiz, media, location

interface Option {
  label: string;
  value: string;
}


const SearchTypeDropdown =() => {

  const [selected, setSelected] = useState<string>('all')

  const data: Option[] = [
    {label: 'All', value: 'all'},
    {label: 'Quiz', value: 'quiz'},
    {label: 'Media', value: 'media'},
    {label: 'Location', value: 'location'}
  ]

  return (
    <View style={styles.container}>
      <RNPickerSelect
        placeholder={{ label: 'Select an option...', value: null }}
        items={data}
        onValueChange={(value) => setSelected(value)}
        value={selected}
        style={{
          inputIOS: styles.dropdownPicker,
          inputAndroid: styles.dropdownPicker,
          iconContainer: { top: 10, right: 12 },
          placeholder: { color: '#999' },
        }}
        useNativeAndroidPickerStyle={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000000'
  },
  dropdownContainer: {
    width: 200,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  dropdownPicker: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
});

export default SearchTypeDropdown