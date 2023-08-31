import { collection, doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Button, Pressable, Text, View } from 'react-native';
import firebase from '../firebase';

const questConnect = collection(firebase.firestore, '/quests');
function Quest({ navigation, route }) {
  const [quest, setQuest] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getQuest().then(val => {
      setQuest(val);
      setLoaded(true);
      console.log('initialized quest');
    });
  }, []);

  async function getQuest() {
    const docref = doc(questConnect, `${route.params.id}`);
    const quest = await getDoc(docref);
    return quest.data();
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
      {quest.type === 'media' && (
        <>
          <Button
            title="Go to Media complete"
            onPress={e => navigation.navigate('Validate Location')}></Button>
        </>
      )}
      {quest.type === 'location' && (
        <>
          <Button
            title="Go to location complete"
            onPress={e => navigation.navigate('Validate Media')}></Button>
        </>
      )}
      {quest.type === 'quiz' && (
        <>
          <Button
            title="Go to Quiz complete"
            onPress={e => navigation.navigate('Validate Quiz')}></Button>
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
