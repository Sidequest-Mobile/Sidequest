import * as Location from 'expo-location';
import {
  GeoPoint,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { geohashForLocation } from 'geofire-common';
import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { appContext } from '../../App';
import UploadImage from '../account/components/uploadImage';
import firebase from '../firebase.js';

let quests = collection(firebase.firestore, '/quests');
const DEFAULT_QUEST_IMAGE = 'default.jpg';
const DEFAULT_EXAMPLE_IMAGE = 'defaultExample.jpg';

export default function CreateQuest({ navigation }) {
  // General States
  let context = useContext(appContext);
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

  // Location States
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [showMap, setShowMap] = useState(false);
  const [questCount, setQuestCount] = useState(0);
  const [mainPicURL, setMainPicURL] = useState('');
  const [exampleURL, setExampleURL] = useState('');

  const storage = getStorage();
  const mainPicRef = ref(storage, `QuestDefault.jpg`);

  useEffect(() => {
    getLoc();
    setCount();
    getQuestDefault();
  }, []);

  async function getQuestDefault() {
    getDownloadURL(mainPicRef)
      .then(url => {
        console.log('pic----->', url);
        setMainPicURL(url);
      })
      .catch(error => {
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            break;
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
          case 'storage/quota-exceeded':
            // Free storage quota exceeded
            break;
          case 'storage/unauthenticated':
            // User is unauthenticated
            break;
        }
      });
  }

  async function getLoc() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }
    let currentPosition = await Location.getCurrentPositionAsync({});
    setLatitude(currentPosition.coords.latitude);
    setLongitude(currentPosition.coords.longitude);
    console.log(
      'Latitude:',
      currentPosition.coords.latitude,
      '   Longitude:',
      currentPosition.coords.longitude,
    );
  }
  function makeMainQuestStorageLocationString() {
    return (
      'questMain' +
      '_userID_' +
      context.userID +
      '_QuestNumber_' +
      `${questCount}`
    );
  }
  function makeExampleQuestStorageLocationString() {
    return (
      'questExample' +
      '_userID_' +
      context.userID +
      '_QuestNumber_' +
      `${questCount}`
    );
  }

  async function setCount() {
    const q = query(quests, where('creator', '==', context.userID));
    const querySnapshot = await getDocs(q);
    setQuestCount(querySnapshot.docs.length);
  }

  function changeType(newType: string): void {
    setType(newType);
    setQuizQuestion('');
    setQuizCorrectAnswer('');
    setQuizIncorrectAnswer('');
    setQuizIncorrectAnswers(quiz);
    setSatisfyingCondition('');
    setExampleURL('');
  }

  let addTag = function (): void {
    setTags([...tags, tagText]);
    setTagText('');
  };

  let addAnswer = function (): void {
    setQuizIncorrectAnswers([...quizIncorrectAnswers, quizIncorrectAnswer]);
    setQuizIncorrectAnswer('');
  };

  function saveQuest(): void {
    // Datatype Validation
  }

  function PublishQuest(): void {
    // Data Validation
    addDoc(quests, {
      type,
      tagline,
      description,
      tags,
      quest_image_URL: DEFAULT_QUEST_IMAGE,

      quiz_question: quizQuestion,
      incorrect_answers: quizIncorrectAnswers,
      correct_answer: quizCorrectAnswer,

      location: new GeoPoint(latitude, longitude),
      lat: latitude,
      lng: longitude,
      geohash: geohashForLocation([latitude, longitude]),

      pic_satisfying_condition: satisfyingCondition,
      example_image_URL: DEFAULT_EXAMPLE_IMAGE,

      quality_rating: [0, 0, 0, 0, 0],
      difficulty_rating: [0, 0, 0, 0],

      creator: context.userID,
      published: true,
    }).then(() => {
      console.log('Quest Submitted');
      navigation.pop();
    });
  }

  return (
    <ScrollView style={styles.container}>
      <Text>Create Quest</Text>
      <Button title="Post" onPress={PublishQuest} />
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
      <UploadImage
        style={profPicStyles}
        url={mainPicURL}
        storageLocation={makeMainQuestStorageLocationString()}
      />
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
          <Button title="Current Location" onPress={getLoc} />
          <Button title="Find on A Map" onPress={() => setShowMap(true)} />
          <MapView
            style={{ width: '50%', height: '50%' }}
            mapType="satellite"
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              draggable={true}
              coordinate={{ latitude: latitude, longitude: longitude }}
              onDragEnd={e => {
                setLatitude(e.nativeEvent.coordinate.latitude);
                setLongitude(e.nativeEvent.coordinate.longitude);
                console.log('End location', e.nativeEvent.coordinate);
              }}
            />
          </MapView>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const profPicStyles = StyleSheet.create({
  container: {
    display: 'flex',
    position: 'absolute',
    top: '10%',
    left: '5%',
  },
  imageContainer: {
    height: 150,
    width: 150,
    backgroundColor: '#efefef',
    position: 'relative',
    borderRadius: 999,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
  },
  uploadBtnContainer: {
    position: 'absolute',
    right: '10%',
    bottom: 0,
    borderRadius: 999,
    borderWidth: 3,
    borderColor: 'white',
    backgroundColor: 'cornflowerblue',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
