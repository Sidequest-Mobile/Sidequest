import * as Location from 'expo-location';
import { collection, doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Text, View } from 'react-native';
import firebase from '../firebase';

const questConnect = collection(firebase.firestore, '/quests');
function ValidateLocation({ navigation, route }) {
  const [lat, setLatitude] = useState(0);
  const [lng, setLng] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    getQuest().then(quest => {
      console.log(quest);
      setLatitude(quest.lat);
      setLng(quest.lng);
      setLoaded(true);
    });
  }, []);
  async function getQuest() {
    const docref = doc(questConnect, `${route.params.id}`);
    const quest = await getDoc(docref);
    return quest.data();
  }

  async function getLoc() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }
    let currentPosition = await Location.getCurrentPositionAsync({});
    let a = lat - currentPosition.coords.latitude;
    let b = lng - currentPosition.coords.longitude;
    let dist = Math.sqrt(a * a + b * b);
    console.log(dist);
    console.log(lat);
    console.log(lng);
  }

  return (
    <View>
      {loaded && <Text> Getting Necessary Datas</Text>}
      <Text>List of Quests in progress as tiles</Text>
      {loaded || (
        <>
          <Button title="Test Location" onPress={getLoc}></Button>

          <Button
            title="Go to Rate"
            onPress={e => navigation.navigate('Rate')}></Button>
        </>
      )}
      {failed && <Modal></Modal>}
    </View>
  );
}

export default ValidateLocation;
// navigation.navigate('Quest', {
//  id: questMarker.questID,
//})
