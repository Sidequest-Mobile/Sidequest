import { useFocusEffect } from '@react-navigation/native';
import * as Location from 'expo-location';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
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
import { appContext } from '../../App';
import UploadImage from '../account/components/uploadImage';
import { creationContext } from '../createQuestStack';
import firebase from '../firebase.js';
import { CreationFormType, questForm } from '../types';
let quests = collection(firebase.firestore, '/quests');
type locationOptions = 'current' | 'map' | 'no selection';

export default function CreateQuest({ navigation, route }: CreationFormType) {
  let context = useContext(appContext);
  let locationContext = useContext(creationContext);
  const [form, setForm] = useState<questForm>({
    type: 'undecided',
    tagline: '',
    description: '',
    tags: [] as Array<string>,
    quest_image_location: 'QuestDefault.jpg',
    example_image_location: 'defaultExample.jpg',
    creator: context.userID,
    incorrect_answers: [],
    difficulty_rating: [0, 0, 0, 0, 0],
    quality_rating: [0, 0, 0, 0, 0],
    published: false,
    creator_number: undefined,
  });

  const storage = getStorage();
  const [tagText, setTagText] = useState('');
  const [quizIncorrectAnswer, setQuizIncorrectAnswer] = useState('');
  const [questImage, setQuestImage] = useState('');
  const [exampleImage, setExampleImage] = useState('');
  const [locationOption, setLocationOption] =
    useState<locationOptions>('no selection');

  useEffect(() => {
    initialize();
    getLoc();
  }, []);

  useFocusEffect(() => {
    if (form.lat !== locationContext.lat && form.lng !== locationContext.lng) {
      setForm({ ...form, lat: locationContext.lat, lng: locationContext.lng });
      console.log(
        'Our new values on focus are..',
        locationContext.lat,
        locationContext.lng,
      );
    }
  });
  async function initialize(): Promise<void> {
    const questImage = ref(storage, form.quest_image_location);
    const exampleQuestImage = ref(storage, form.example_image_location);

    const q = query(quests, where('creator', '==', context.userID));
    const querySnapshot = await getDocs(q);
    const questCount = querySnapshot.docs.length + 1;

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

    await getDownloadURL(questImage).then(url => {
      setForm({
        ...form,
        creator_number: questCount,
        quest_image_location: makeMainQuestStorageLocationString(),
        example_image_location: makeExampleQuestStorageLocationString(),
      });
      setQuestImage(url);
    });
    getDownloadURL(exampleQuestImage).then(url => setExampleImage(url));
  }

  async function getLoc() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }
    let currentPosition = await Location.getCurrentPositionAsync({});
    setForm({
      ...form,
      lat: currentPosition.coords.latitude,
      lng: currentPosition.coords.longitude,
    });
    locationContext.changeLat(currentPosition.coords.latitude);
    locationContext.changeLng(currentPosition.coords.longitude);
    console.log('form from loc', form);
  }

  function changeText(
    text: string,
    property:
      | 'tagline'
      | 'description'
      | 'quiz_question'
      | 'correct_answer'
      | 'pic_satisfying_condition',
  ): void {
    let obj = { ...form };
    obj[property] = text;
    setForm(obj);
  }
  function addTag() {
    let tags = [...form.tags];
    tags.push(tagText);
    setForm({ ...form, tags });
    setTagText('');
  }
  function addIncorrectAnswer() {
    let incorrect_answers = [...form.incorrect_answers];
    incorrect_answers.push(quizIncorrectAnswer);
    setForm({ ...form, incorrect_answers });
    setQuizIncorrectAnswer('');
  }
  function selectType(typ: 'media' | 'location' | 'quiz') {
    if (form.type !== typ) {
      let obj = {
        type: typ,
        tagline: form.tagline,
        description: form.description,
        tags: form.tags,
        quest_image_location: form.quest_image_location,
        example_image_location: form.example_image_location,
        creator: form.creator,
        incorrect_answers: [],
        difficulty_rating: form.difficulty_rating,
        quality_rating: form.quality_rating,
        published: false,
        creator_number: form.creator_number,
      };
      setForm(obj);
    }
  }
  function navigateToMap() {
    setLocationOption('map');
    navigation.navigate('Choose Location');
  }
  function PublishQuest(): void {
    // Data Validation
    addDoc(quests, { ...form, creator: context.userID, published: true }).then(
      () => {
        console.log('Quest Submitted');
        navigation.pop();
      },
    );
  }

  return (
    <ScrollView style={styles.scroll}>
      {/** Basic Shared Info  */}
      <View style={styles.basicInfo}>
        <Text style={styles.formLabel}>Tagline</Text>
        <TextInput
          style={styles.textInputShort}
          placeholder="This Quest in one sentence"
          onChangeText={text => changeText(text, 'tagline')}
        />
        <Text style={styles.formLabel}>Description</Text>
        <TextInput
          style={styles.textInputLong}
          placeholder="Type a description of your quest here"
          onChangeText={text => changeText(text, 'description')}
        />
        <Text style={styles.formLabel}>Tagline</Text>
        <TextInput
          style={styles.textInputShort}
          placeholder="Tags You'd like to add"
          onChangeText={text => setTagText(text)}
          value={tagText}
        />
        <Pressable onPress={addTag}>
          <View style={styles.typeButtonsContainer}>
            <Text style={styles.typeTextPressed}>Add Tag</Text>
          </View>
        </Pressable>
        {form.tags.map(tag => {
          return <Text>{tag}</Text>;
        })}
        <Text style={styles.formLabel}>Quest Type</Text>
        <View style={styles.typeButtonsContainer}>
          <Pressable onPress={() => selectType('location')}>
            <View
              style={
                form.type === 'location'
                  ? styles.typeViewPressed
                  : styles.typeViewUnpressed
              }>
              <Text
                style={
                  form.type === 'location'
                    ? styles.typeTextPressed
                    : styles.typeTextUnpressed
                }>
                Location
              </Text>
            </View>
          </Pressable>
          <Pressable onPress={() => selectType('media')}>
            <View
              style={
                form.type === 'media'
                  ? styles.typeViewPressed
                  : styles.typeViewUnpressed
              }>
              <Text
                style={
                  form.type === 'media'
                    ? styles.typeTextPressed
                    : styles.typeTextUnpressed
                }>
                Media
              </Text>
            </View>
          </Pressable>
          <Pressable onPress={() => selectType('quiz')}>
            <View
              style={
                form.type === 'quiz'
                  ? styles.typeViewPressed
                  : styles.typeViewUnpressed
              }>
              <Text
                style={
                  form.type === 'quiz'
                    ? styles.typeTextPressed
                    : styles.typeTextUnpressed
                }>
                Quiz
              </Text>
            </View>
          </Pressable>
        </View>
        <Text style={styles.formLabel}>Picture, optional</Text>
        {questImage !== '' && (
          <UploadImage
            style={uploadImageStyles}
            url={questImage}
            storageLocation={form.quest_image_location}
          />
        )}
      </View>
      {/** Quiz  */}
      {form.type === 'quiz' && (
        <View style={styles.quizView}>
          <Text style={styles.formLabel}>Quiz Question</Text>
          <TextInput
            style={styles.textInputLong}
            placeholder="What question will the quester answer?"
            onChangeText={text => changeText(text, 'quiz_question')}
          />
          <Text style={styles.formLabel}>The Correct Answer</Text>
          <TextInput
            style={styles.textInputShort}
            placeholder="What is the correct answer to the quiz?"
            onChangeText={text => changeText(text, 'correct_answer')}
          />
          <Text style={styles.formLabel}>Other Answers</Text>
          <TextInput
            style={styles.textInputShort}
            placeholder="Add an incorrect Answer"
            onChangeText={text => setQuizIncorrectAnswer(text)}
            value={quizIncorrectAnswer}
          />
          <Button title="Add Answer" onPress={addIncorrectAnswer} />
          <View style={styles.answersContainer}>
            {form.incorrect_answers.map(
              (val): JSX.Element => (
                <View style={styles.incorrectAnswerContainer}>
                  <Text style={styles.incorrectAnswerText}>{val}</Text>
                </View>
              ),
            )}
          </View>
        </View>
      )}
      {/** Location  */}
      {form.type === 'location' && (
        <View style={styles.locationView}>
          <Text style={styles.formLabel}> Location</Text>
          <View style={styles.locationOptionsContainer}>
            <Pressable
              onPress={() => {
                setLocationOption('current');
              }}>
              <View
                style={
                  locationOption === 'current'
                    ? styles.locationsViewPressed
                    : styles.locationsViewUnpressed
                }>
                <Text
                  style={
                    locationOption === 'current'
                      ? styles.locationsTextPressed
                      : styles.locationsTextUnpressed
                  }>
                  {' '}
                  Use Current Location
                </Text>
              </View>
            </Pressable>

            <Pressable onPress={navigateToMap}>
              <View
                style={
                  locationOption === 'map'
                    ? styles.locationsViewPressed
                    : styles.locationsViewUnpressed
                }>
                <Text
                  style={
                    locationOption === 'map'
                      ? styles.locationsTextPressed
                      : styles.locationsTextUnpressed
                  }>
                  {' '}
                  Find on a Map
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      )}
      {/** Media  */}
      {form.type === 'media' && (
        <View style={styles.mediaView}>
          <Text style={styles.formLabel}>Satisfying Condition</Text>
          <TextInput
            style={styles.textInputLong}
            placeholder="How can one tell if the quest has been completed?"
            onChangeText={text => changeText(text, 'pic_satisfying_condition')}
          />
          <Text style={styles.formLabel}>Upload an Example</Text>
          {exampleImage !== '' && (
            <UploadImage
              style={uploadImageStyles}
              url={exampleImage}
              storageLocation={form.quest_image_location}
            />
          )}
        </View>
      )}
      {/** Util Buttons  */}
      <View style={styles.utilButtonContainer}>
        <Pressable>
          <View style={styles.utilButtonView}>
            <Text style={styles.utilButtonText}> Save Changes</Text>
          </View>
        </Pressable>

        <Pressable onPress={PublishQuest}>
          <View style={styles.utilButtonView}>
            <Text style={styles.utilButtonText}> Publish </Text>
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {},
  basicInfo: {},
  quizView: {},
  locationView: {},
  mediaView: {},
  utilButtonContainer: {},
  formLabel: {},
  textInputShort: {},
  textInputLong: {},
  typeViewUnpressed: {},
  typeViewPressed: {},
  typeTextUnpressed: {},
  typeTextPressed: {},
  typeButtonsContainer: {},
  incorrectAnswerContainer: {},
  incorrectAnswerText: {},
  answersContainer: {},
  locationOptionsContainer: {},
  locationsViewPressed: {},
  locationsViewUnpressed: {},
  locationsTextPressed: { fontWeight: 'bold' },
  locationsTextUnpressed: {},
  mapContainer: {},
  mapView: {},
  utilButtonView: {},
  utilButtonText: {},
});

const uploadImageStyles = StyleSheet.create({
  container: {},
  imageContainer: {},
  image: {},
  uploadBtnContainer: {},
});
