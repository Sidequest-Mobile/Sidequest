import {
  DocumentData,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Pressable, ScrollView, Text, View } from 'react-native';
import { appContext } from '../../App';
import QuestCard from '../components/questCard';
import firebase from '../firebase';
const questCollection = collection(firebase.firestore, '/quests');
const questInstanceCollection = collection(
  firebase.firestore,
  '/quest_instance',
);
type empty = true | false;

function MyJoinedQuests({ navigation }) {
  const app = useContext(appContext);
  const [joinedQuestInstances, setJoinedQuestInstances] = useState(
    [] as Array<DocumentData>,
  );
  const [questinfo, setQuestInfo] = useState([] as Array<DocumentData>);
  const [empty, setEmpty] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getQuests();
  }, []);
  async function getQuests() {
    const quests_in_progress_query = query(
      questInstanceCollection,
      where('userID', '==', app.userID),
      where('completion_status', '==', 'In Progress'), // need to add type to context in App.tsx
    );
    getDocs(quests_in_progress_query).then(results => {
      if (results.size) {
        const questInst = results.docs.map(document => {
          return document.data();
        });
        getQuestInfos(questInst);
      } else {
        setEmpty(true);
        setLoaded(true);
      }
    });
  }
  function getQuestInfos(questinst) {
    const queryPromises = questinst.map(inst => {
      return getDoc(doc(firebase.firestore, '/quests/' + inst.questID));
    });
    Promise.all(queryPromises).then(questinfos => {
      setEmpty(false);
      setLoaded(true);
      setQuestInfo(
        questinfos.map(questinfo => {
          return { ...questinfo.data(), id: questinfo.id };
        }),
      );
      setJoinedQuestInstances(questinst);
    });
  }

  return (
    <View>
      <Pressable>
        <Text>Go back to "Profile!</Text>
      </Pressable>
      <Text>List of Quests in progress as tiles</Text>

      {loaded && !empty && (
        <ScrollView>
          {joinedQuestInstances.map(questInst => {
            const info = questinfo.find(
              quest => quest.id === questInst.questID,
            );
            let nav = function () {
              navigation.navigate('Quest', { id: questInst.questID });
            };
            return (
              <>
                <QuestCard
                  name={questInst.questID}
                  description={
                    info !== undefined ? info.description : 'no Description'
                  }
                  location={
                    info !== undefined
                      ? 'Latitude' + info.lat + 'Longitude' + info.lng
                      : 'no Description'
                  }
                  picture={
                    info !== undefined &&
                    info.quest_image_location !== undefined
                      ? info.quest_image_location
                      : 'questMain_userID_iulgm135F0R0g84PcLfUQF5dSkz2_QuestNumber_1'
                  }
                  onPress={nav}
                />
              </>
            );
          })}
        </ScrollView>
      )}

      {loaded && empty && (
        <View>
          <Text>It seems you haven't joined any quests yet.</Text>
        </View>
      )}

      {loaded || (
        <View>
          <Text>It seem the data hasn't loaded yet.</Text>
        </View>
      )}

      <Button
        title="Go to individual quest"
        onPress={e => navigation.navigate('Quest')}></Button>
    </View>
  );
}

export default MyJoinedQuests;
