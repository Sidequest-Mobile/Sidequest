import { collection } from 'firebase/firestore';
import React, { useState } from 'react';
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import firebase from '../firebase.js';

let quests = collection(firebase.firestore, '/quests');
let UID: string = '0';

export default function CreateQuest() {
  // General States
  const [type, setType] = useState('undecided');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  let tagsInit: Array<string> = [];
  const [tags, setTags] = useState(tagsInit);
  const [tagText, setTagText] = useState('');
  // Quiz States
  const [quizQuestion, setQuizQuestion] = useState('');
  const [quizCorrectAnswer, setQuizCorrectAnswer] = useState('');
  let quiz: Array<string> = [];
  const [quizIncorrectAnswer, setQuizIncorrectAnswer] = useState('');
  const [quizIncorrectAnswers, setQuizIncorrectAnswers] = useState(quiz);
  // Media States
  const [satisfyingCondition, setSatisfyingCondition] = useState('');
  const [exampleURL, setExampleURL] = useState('');
  // Location States
  const [assignedLocation, setAssignedLocation] = useState('');

  // each pressable should adjust the "type" state to match it's internal text value. This should also correlate to the conditional display logic.
  // Changing type should also reset the states for the unchosen types
  // When that type is chosen, the pressable should have a change to the style of the view to show that it is the chosen type.
  function changeType(newType: string): void {
    setType(newType);
    setQuizQuestion('');
    setQuizCorrectAnswer('');
    setQuizIncorrectAnswer('');
    setQuizIncorrectAnswers(quiz);
    setSatisfyingCondition('');
    setExampleURL('');
    setAssignedLocation('');
  }
  // Choosing location should have a reference to the native Geolocation API.
  // There should be a way for us to use the native file API to open up an image browser/camera which users can choose a photo/video from
  // we'll need a way to "upload" that file, then store a URL as a state for the optional picture.
  // When we press "submit" there should be some data validation- then if the thing passes then we'll make a document with the published property
  // When we press "save" we will make a document/ update the document with the properties, but published as false.
  let addTag = function (): void {
    setTags([...tags, tagText]);
    setTagText('');
  };

  let addAnswer = function (): void {
    setQuizIncorrectAnswers([...quizIncorrectAnswers, quizIncorrectAnswer]);
    setQuizIncorrectAnswer('');
  };

  return (
    <View style={styles.container}>
      <Text>Create Quest</Text>
      <Text>Tagline</Text>
      <TextInput
        onChangeText={setTagline}
        value={tagline}
        placeholder="This Quest in one sentence"
      />

      <Text>Description</Text>
      <TextInput
        onChangeText={setDescription}
        value={description}
        placeholder="Type a description of your quest here"
      />

      <Text>Picture, optional</Text>
      <Text>Quest Type</Text>

      <Pressable onPress={() => changeType('location')}>
        <View
          style={{
            backgroundColor: 'blue',
            borderRadius: 10,
            height: 20,
          }}>
          <Text>Location</Text>
        </View>
      </Pressable>

      <Pressable onPress={() => changeType('media')}>
        <View
          style={{
            backgroundColor: 'yellow',
            borderRadius: 10,
            height: 20,
          }}>
          <Text> Media </Text>
        </View>
      </Pressable>

      <Pressable onPress={() => changeType('quiz')}>
        <View
          style={{
            backgroundColor: 'red',
            borderRadius: 10,
            height: 20,
          }}>
          <Text> Quiz </Text>
        </View>
      </Pressable>

      <Text>Tags</Text>
      {tags.map(
        (val): JSX.Element => (
          <Text>{val}</Text>
        ),
      )}
      <TextInput
        onChangeText={setTagText}
        value={tagText}
        placeholder="Write a tag for your quest to be identified by"
      />
      <Button title="Add Tag" onPress={addTag} />
      {}
      {type === 'quiz' && (
        <>
          <Text>Quiz Question </Text>
          <TextInput
            onChangeText={setQuizQuestion}
            value={quizQuestion}
            placeholder="What question will the quester answer?"
          />
          <Text>The Correct Answer</Text>
          <TextInput
            onChangeText={setQuizCorrectAnswer}
            value={quizCorrectAnswer}
            placeholder="What is the correct answer to the quiz?"
          />
          <Text>Other Answers</Text>
          <TextInput
            onChangeText={setQuizIncorrectAnswer}
            value={quizIncorrectAnswer}
            placeholder="Add an incorrect Answer"
          />
          <Button title="Add Answer" onPress={addAnswer} />
        </>
      )}
      {quizIncorrectAnswers.map(
        (val): JSX.Element => (
          <Text>{val}</Text>
        ),
      )}
      {type === 'location' && (
        <>
          <Text>Location</Text>
        </>
      )}

      {type === 'media' && (
        <>
          <Text>Satisfying Condition</Text>
          <TextInput
            placeholder="How can one tell if the quest has been completed?"
            value={satisfyingCondition}
            onChangeText={setSatisfyingCondition}
          />

          <Text>Example Media</Text>
        </>
      )}
      <Button title="Save" />
      <Button title="Post" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
