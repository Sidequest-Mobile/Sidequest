import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Pressable, } from 'react-native';
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
  // General States
  const [type, setType] = useState('undecided');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  let tagsInit: Array<string> = []
  const [tags, setTags] = useState(tagsInit);
  const [tagText, setTagText] = useState('');
  // Quiz States
  const [quizQuestion, setQuizQuestion] = useState('');
  const [quizCorrectAnswer, setQuizCorrectAnswer] = useState('');
  let quiz: Array<string> = []
  const [quizIncorrectAnswers, setQuizIncorrectAnswers] = useState(quiz);
  // Media States
  const [satisfyingCondition, setSatisfyingCondition] = useState('');
  const [exampleURL, setExampleURL] = useState('')
  // Location States
  const [assignedLocation, setAssignedLocation] = useState('')

  // add state that follows each of our TextInputs
  // This would be - Tagline, Description, Quiz and answers, Satisfying Conditions
  // each pressable should adjust the "type" state to match it's internal text value. This should also correlate to the conditional display logic.
  // Changing type should also reset the states for the unchosen types
  // When that type is chosen, the pressable should have a change to the style of the view to show that it is the chosen type.
  // Choosing location should have a reference to the native Geolocation API.
  // There should be a way for us to use the native file API to open up an image browser/camera which users can choose a photo/video from
  // we'll need a way to "upload" that file, then store a URL as a state for the optional picture.
  // When we press "submit" there should be some data validation- then if the thing passes then we'll make a document with the published property
  // When we press "save" we will make a document/ update the document with the properties, but published as false.
  let addTag = function(): void {
    setTags([...tags, tagText])


  }


  return (
    <View style={styles.container}>
      <Text>Create Quest</Text>
      <Text>Tagline</Text>
      <TextInput
      onChangeText={setTagline}
      value={tagline}
      placeholder='This Quest in one sentence'/>

      <Text>Description</Text>
      <TextInput
      onChangeText={setDescription}
      value={description}
      placeholder="Type a description of your quest here"
      />

      <Text>Picture, optional</Text>
      <Text>Quest Type</Text>

      <Pressable>
        <View style={{
          backgroundColor:"blue",
          borderRadius:10,
          height:20,
        }}>
        <Text>Location</Text>
        </View>
      </Pressable>

      <Pressable>
      <View style={{
          backgroundColor:"yellow",
          borderRadius:10,
          height:20,
        }}>
        <Text> Media </Text>
        </View>
      </Pressable>

      <Pressable>
      <View style={{
          backgroundColor:"red",
          borderRadius:10,
          height:20,
        }}>
        <Text> Quiz </Text>
        </View>
      </Pressable>

      <Text>Tags</Text>

      <TextInput
      onChangeText={setTagText}
      value={tagText}
      placeholder='Write a tag for your quest to be identified by'/>
      <Button title='Add Tag' />

      {type === 'quiz' && (
      <>
      <Text>Quiz Question </Text>
      <TextInput/>
      <Text>Quiz Answers</Text>
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
      <Text>Satisfying Condition</Text>
      <TextInput/>
      <Text>Example Media</Text>

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

