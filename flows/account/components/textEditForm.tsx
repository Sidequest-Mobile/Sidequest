import React, { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, TextInput } from 'react-native';

interface TextEditFormProps {
  updateUsername: (newUsername: string) => void;
  updateBio: (newBio: string) => void;
}

export default function TextEditForm({updateUsername, updateBio}: TextEditFormProps) {
  const [usernameText, onChangeUsernameText] = useState('');
  const [bioText, onChangeBioText] = useState('');

  // need a function to update the username and bio on submit

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeUsernameText}
        value={usernameText}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeBioText}
        value={bioText}

      />
      <Button
        title="Save"
        onPress={() => {
          updateUsername(usernameText);
          updateBio(bioText);
        }}
        />
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});