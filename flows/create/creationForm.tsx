import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import  firebase  from '../firebase.js';
import { collection } from 'firebase/firestore'

let quests = collection( firebase.firestore, "/quests")
let UID : string = "0";
// just a dummy as a placeholder for now
// What problems do we need to solve with this component?
// Stated updates to the data

// tags
// Location - getting
// Media upload- picture
// Sharing AUth info with firestore database

export default function CreateQuest() {
  const [type, setType] = useState('undecided')

  return (
    <View style={styles.container}>
      <Text>Create Quest</Text>
      <Text>Tagline</Text>
      <TextInput/>
      <Text>Description</Text>
      <TextInput/>
      <Text>Picture, optional</Text>
      <Text>Quest Type</Text>

      <Text>Tags</Text>
      <TextInput/>
      <Button title='Add Tag'/>

      {type === 'quiz' && (
      <>
      <Text>Quiz</Text>
      <TextInput/>
      <TextInput/>
      <TextInput/>
      <TextInput/>
      </>)}

      {type === 'location' && (
      <>
        <Text>Location</Text>
      </>)}

      {type === 'media' && (<>

      </>)}
      <Button title='Save'/>
      <Button title='Post'/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// tagline
// description
// guest Type
// category

// quiz text inputs

// location

// save
// post
