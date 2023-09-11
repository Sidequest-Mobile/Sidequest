import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
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
import { CreationFormType, questForm } from '../types';
let quests = collection(firebase.firestore, '/quests');
type locationOptions = 'current' | 'map' | 'no selection';
import * as Location from 'expo-location';

export default function cQuest({ navigation, route }: CreationFormType) {
  let context = useContext(appContext);
  const [form, setForm] = useState<questForm>({
    type: 'undecided',
    tagline: '',
    description: '',
    tags: [] as Array<string>,
    quest_image_URL: 'default.jpg',
    example_image_URL: 'defaultExample.jpg',
    creator: context.userID,
    difficulty_rating: [0, 0, 0, 0, 0],
    quality_rating: [0, 0, 0, 0, 0],
    published: false,
    creator_number: undefined,
  });

  const [tagText, setTagText] = useState('');
  const [quizIncorrectAnswer, setQuizIncorrectAnswer] = useState('');
  const [locationOption, setLocationOption] =
    useState<locationOptions>('no selection');

  async function initialize(): Promise<void> {
    const q = query(quests, where('creator', '==', context.userID));
    const querySnapshot = await getDocs(q);
    setForm({ ...form, creator_number: querySnapshot.docs.length + 1 });
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
  }

  return (
    <ScrollView style={styles.scroll}>
      {/** Basic Shared Info  */}
      <View style={styles.basicInfo}>
        <Text style={styles.formLabel}>Tagline</Text>
        <TextInput
          style={styles.textInputShort}
          placeholder="This Quest in one sentence"
        />
        <Text style={styles.formLabel}>Description</Text>
        <TextInput
          style={styles.textInputLong}
          placeholder="Type a description of your quest here"
        />
        <Text style={styles.formLabel}>Quest Type</Text>
        <View style={styles.typeButtonsContainer}>
          <Pressable>
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
          <Pressable>
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
          <Pressable>
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
        <UploadImage style={uploadImageStyles} />
      </View>
      {/** Quiz  */}
      {form.type === 'quiz' && (
        <View style={styles.quizView}>
          <Text style={styles.formLabel}>Quiz Question</Text>
          <TextInput
            style={styles.textInputLong}
            placeholder="What question will the quester answer?"
          />
          <Text style={styles.formLabel}>The Correct Answer</Text>
          <TextInput
            style={styles.textInputShort}
            placeholder="What is the correct answer to the quiz?"
          />
          <Text style={styles.formLabel}>Other Answers</Text>
          <TextInput
            style={styles.textInputShort}
            placeholder="Add an incorrect Answer"
          />
          <Button title="Add Answer" />
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
            <Pressable>
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

            <Pressable>
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

          {locationOption === 'map' && (
            <View style={styles.mapContainer}>
              <MapView style={styles.mapView}>
                <Marker />
              </MapView>
            </View>
          )}
        </View>
      )}
      {/** Media  */}
      {form.type === 'media' && (
        <View style={styles.mediaView}>
          <Text style={styles.formLabel}>Satisfying Condition</Text>
          <TextInput
            style={styles.textInputLong}
            placeholder="How can one tell if the quest has been completed?"
          />
          <Text style={styles.formLabel}>Upload an Example</Text>
          <UploadImage />
        </View>
      )}
      {/** Util Buttons  */}
      <View style={styles.utilButtonContainer}>
        <Pressable>
          <View style={styles.utilButtonView}>
            <Text style={styles.utilButtonText}> Save Changes</Text>
          </View>
        </Pressable>

        <Pressable>
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
  locationsTextPressed: {},
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
