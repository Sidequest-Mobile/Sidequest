import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import firebase from '../firebase';

const questInstances = collection(firebase.firestore, '/quest_instance');
const questConnect = collection(firebase.firestore, '/quest');
function QuestStats({ navigation, route }) {
  const [empty, setEmpty] = useState(true);
  const [inProgress, setInProgress] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [quest, setQuest] = useState({});

  useEffect(() => {
    getMetaData();
  }, []);

  function getMetaData() {
    console.log(route);
    const instancesWhere = query(
      questInstances,
      where('questID', '==', route.params.id),
    );
    const questPromise = getQuest();
    const instances = getDocs(instancesWhere);
    Promise.all([questPromise, instances]).then(results => {
      let inpro = 0;
      let compl = 0;
      if (results[1].empty) {
        console.log('No one has completed this quest');
      } else {
        results[1].docs.forEach(result => {
          if (result.data().completion_status === 'Completed') {
            compl++;
          } else if (result.data().completion_status === 'In Progress') {
            inpro++;
          }
        });
      }
      setQuest(results[0]);
      setInProgress(inpro);
      setCompleted(compl);
      if (!results[1].empty) {
        setEmpty(false);
        console.log('Somebody Did the quest');
      }
    });
  }
  async function getQuest() {
    const docref = doc(questConnect, `${route.params.id}`);
    const quest = await getDoc(docref);
    return quest.data();
  }
  return (
    <View>
      <Text>
        List of Stats and performance of Quests that this user has created
      </Text>
      <Text>{`${inProgress}`} Questers are currently doing the quest</Text>
      <Text>{`${completed}`} Questers have completed the quest</Text>
      <Pressable onPress={e => navigation.pop()}>
        <Text>Go Back to My Created Quests</Text>
      </Pressable>
    </View>
  );
}

export default QuestStats;
