import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { appContext } from '../../App';
import QuestCard from '../components/questCard';
import firebase from '../firebase';

const questCollection = collection(firebase.firestore, '/quests');
function MyCreatedQuests({ navigation }) {
  const appCon = useContext(appContext);
  const [createdQuests, setCreatedQuests] = useState([]);
  const [retrieved, setRetrieved] = useState(false);
  const [empty, setEmpty] = useState(true);
  useEffect(() => {
    getCreatedQuests();
  }, []);

  function getCreatedQuests() {
    const questQuery = query(
      questCollection,
      where('creator', '==', appCon.userID),
    );
    getDocs(questQuery).then(results => {
      setRetrieved(true);
      if (results.size) {
        setEmpty(false);
        setCreatedQuests(
          results.docs.map(doc => {
            return { ...doc.data(), id: doc.id };
          }),
        );
      } else {
      }
    });
  }
  return (
    <View>
      <Text>Your Created Quests</Text>
      <Text>Scrollable view map of your Quests</Text>
      <View>
        {retrieved && (
          <>
            {empty || (
              <View>
                {createdQuests.map(quest => {
                  let nav = function () {
                    navigation.navigate('Quest Stats', { id: quest.id });
                  };
                  return (
                    <QuestCard
                      name={quest.questID}
                      description={
                        quest !== undefined
                          ? quest.description
                          : 'no Description'
                      }
                      location={
                        quest !== undefined
                          ? 'Latitude' + quest.lat + 'Longitude' + quest.lng
                          : 'no Description'
                      }
                      picture={
                        quest !== undefined &&
                        quest.quest_image_location !== undefined
                          ? quest.quest_image_location
                          : 'questMain_userID_iulgm135F0R0g84PcLfUQF5dSkz2_QuestNumber_1'
                      }
                      onPress={nav}
                    />
                  );
                })}
              </View>
            )}
            {empty && <Text>No Created Quests</Text>}
          </>
        )}
      </View>
      <Text>Works in Progress</Text>
      <Button
        title="Go to Quest Creator"
        onPress={e => navigation.navigate('Create')}></Button>
    </View>
  );
}
export default MyCreatedQuests;
