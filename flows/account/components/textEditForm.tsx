import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, TextInput } from 'react-native';

interface TextEditFormProps {
  updateUsername: (newUsername: string) => void;
  updateBio: (newBio: string) => void;
  openCloseEdits: (toggle: boolean) => void;
  username: string;
  bio: string;
}

export default function TextEditForm({updateUsername, updateBio, openCloseEdits, username, bio}: TextEditFormProps) {
  const [usernameText, onChangeUsernameText] = useState('hello');
  const [bioText, onChangeBioText] = useState('');

  useEffect(() => {
    onChangeUsernameText(username);
    onChangeBioText(bio);
  }, [])

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
        title="Cancel"
        onPress={() => {
          openCloseEdits(false);
        }}
      />
      <Button
        title="Save"
        onPress={() => {
          updateUsername(usernameText);
          updateBio(bioText);
          openCloseEdits(false)
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