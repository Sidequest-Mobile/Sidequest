import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import { appContext } from '../../App';
import firebase from '../firebase';
import { Quest_Instance_Type } from '../types';
const questConnect = collection(firebase.firestore, '/quests');
const questInstances = collection(firebase.firestore, '/quest_instance');

function Rate({ navigation, route }) {
  const app = useContext(appContext);
  const [instance, setInstance] = useState({} as Quest_Instance_Type);
  const [quest, setQuest] = useState({});
  const [instanceRef, setInstanceRef] = useState('');
  const [difficulty, setDifficulty] = useState(6);
  const [enjoyment, setEnjoyment] = useState(6);
  useEffect(() => {
    getQuest().then(quest => {
      setQuest(quest);
    });
    getQuest_Instance();
  }, []);

  async function getQuest() {
    const docref = doc(questConnect, `${route.params.id}`);
    const quest = await getDoc(docref);
    return quest.data();
  }

  async function getQuest_Instance() {
    const quest_instance = query(
      questInstances,
      where('userID', '==', app.userID),
      where('questID', '==', `${route.params.id}`),
      where('completion_status', '==', 'In Progress'), // need to add type to context in App.tsx
    );
    console.log(app.userID);
    console.log(`${route.params.id}`);
    getDocs(quest_instance).then(query_result => {
      console.log(query_result.docs);
      if (query_result !== undefined && query_result.docs.at(0) !== undefined) {
        setInstance(query_result.docs.at(0).data());
        setInstanceRef(query_result.docs.at(0).id);
      } else {
      }
    });
  }

  function onComplete() {
    const instanceDoc = doc(questInstances, instanceRef);
    const docref = doc(questConnect, `${route.params.id}`);
    const q = [...quest.quality_rating];
    const d = [...quest.difficulty_rating];
    q[enjoyment] = q[enjoyment] + 1;
    d[difficulty] = d[difficulty] + 1;
    let p1 = setDoc(instanceDoc, {
      ...instance,
      completion_status: 'Completed',
      time_ended: Timestamp.fromDate(new Date(Date.now())),
    });
    let p2 = setDoc(docref, {
      ...quest,
      quality_rating: q,
      difficulty_rating: d,
    });
    Promise.all([p1, p2]).then(() => {
      navigation.popToTop();
    });
  }

  return (
    <View>
      <View>
        <Text>
          How would you rate the difficulty of this Quest? 1 is low difficulty,
          5 is "Very Difficult!"
        </Text>
        <View>
          {[0, 1, 2, 3, 4].map(val => {
            return (
              <Rater
                rating={val}
                setFunction={() => setDifficulty(val)}
                state={difficulty}
              />
            );
          })}
        </View>
      </View>
      <View>
        <Text>
          How would you rate your enjoyment of this Quest? 1 is low enjoyment, 5
          is "Very Enjoyable!"
        </Text>
        <View>
          {[0, 1, 2, 3, 4].map(val => {
            return (
              <Rater
                rating={val}
                setFunction={() => setEnjoyment(val)}
                state={enjoyment}
              />
            );
          })}
        </View>
      </View>

      <Button title="Complete" onPress={onComplete}></Button>
    </View>
  );
}

export default Rate;

function Rater({ rating, setFunction, state }) {
  return (
    <View>
      <Pressable
        onPress={() => setFunction()}
        style={
          rating === state
            ? styles.selectedRatePressable
            : styles.unselectedRatePresssable
        }>
        <View
          style={
            rating === state
              ? styles.selectedRateView
              : styles.unselectedRateView
          }>
          <Text
            style={
              rating === state
                ? styles.selectedRateText
                : styles.unselectedRateText
            }>
            {`${rating + 1}`} Stars
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  selectedRatePressable: {},
  unselectedRatePresssable: {},
  selectedRateView: {},
  unselectedRateView: {},
  selectedRateText: { fontWeight: 'bold' },
  unselectedRateText: {},
});
