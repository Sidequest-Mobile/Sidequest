import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Pressable, Text, View } from 'react-native';
import { appContext } from '../../App';
import firebase from '../firebase';
import { Quest_Instance_Type } from '../types';
const questConnect = collection(firebase.firestore, '/quests');
const questInstances = collection(firebase.firestore, '/quest_instance');

function Quest({ navigation, route }) {
  const appCon = useContext(appContext);
  const [quest, setQuest] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [quest_instance, setInstance] = useState({} as Quest_Instance_Type);
  const [joined, setJoined] = useState<true | false | null>(null);

  useEffect(() => {
    getQuest().then(val => {
      setQuest(val);
      setLoaded(true);
      console.log('initialized quest');
    });
    getQuest_Instance().then(() => {
      console.log('initialized quest instance');
    });
  }, []);

  async function getQuest() {
    const docref = doc(questConnect, `${route.params.id}`);
    const quest = await getDoc(docref);
    return quest.data();
  }
  async function getQuest_Instance() {
    const quest_instance = query(
      questInstances,
      where('userID', '==', appCon.userID),
      where('questID', '==', `${route.params.id}`),
      where('completion_status', '==', 'In Progress'), // need to add type to context in App.tsx
    );
    console.log(appCon.userID);
    console.log(`${route.params.id}`);
    getDocs(quest_instance).then(query_result => {
      console.log(query_result.docs);
      if (query_result !== undefined && query_result.docs.at(0) !== undefined) {
        setJoined(true);
        setInstance(query_result.docs.at(0).data());
      } else {
        setJoined(false);
      }
    });
  }

  function joinQuest() {
    console.log('Quest Joined! ... after I implement it.');
    const quest_instance: Quest_Instance_Type = {
      completion_status: 'In Progress',
      time_started: Timestamp.fromDate(new Date(Date.now())),
      userID: appCon.userID,
      likes: 0,
      questID: `${route.params.id}`,
    };
    addDoc(questInstances, quest_instance);
  }

  return (
    <View>
      {loaded || <Text>Loading</Text>}
      {loaded && (
        <>
          <Text>Tagline:{quest.tagline}</Text>
          <Text>Image URL:{quest.quest_image_URL}</Text>
          <Text>Description:{quest.description}</Text>
          <Text>
            Note:We might also include difficulty rating and quality rating
          </Text>
        </>
      )}
      {typeof joined == 'boolean' && !joined && (
        <Pressable onPress={joinQuest}>
          <View>
            <Text>Join quest!</Text>
          </View>
        </Pressable>
      )}
      {quest.type === 'location' && joined && (
        <>
          <Button
            title="Go to Location complete"
            onPress={e =>
              navigation.navigate('Validate Location', {
                id: quest.questID,
              })
            }></Button>
        </>
      )}
      {quest.type === 'media' && joined && (
        <>
          <Button
            title="Go to Media complete"
            onPress={e =>
              navigation.navigate('Validate Media', {
                id: quest.questID,
              })
            }></Button>
        </>
      )}
      {quest.type === 'quiz' && joined && (
        <>
          <Button
            title="Go to Quiz complete"
            onPress={e =>
              navigation.navigate('Validate Quiz', {
                id: quest.questID,
              })
            }></Button>
        </>
      )}
      <Pressable onPress={e => navigation.pop()}>
        <Text>Go Back</Text>
      </Pressable>
    </View>
  );
}

export default Quest;

// This component should recieve Quest ID as a parameter when navigated to. It also should have access to UserID through context.
// First, let's have it check to see whether the User has already joined the quest - Do they have an open instance of this quest?
// If they don't, then the user can see a more limited scale of information - what the quest type is like, who created it, what tags it has, it's profile image, it's description.
// They can also choose to click on the button "Join Quest" which will use the information to create a document of this quest in Firebase.
// if they are already in the quest, they'll see the same information as before, but the choice to join will be gone, and instead there will be a "Complete Quest" button.
// They'll also recieve more information about the standards of the quest- for example, they can see an example completion image for the Media style quests.
// Upon pressing complete Quest, they'll be navigated to the appropriate validate component.
