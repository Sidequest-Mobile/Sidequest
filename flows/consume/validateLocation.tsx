import * as Location from 'expo-location';
import { collection, doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import firebase from '../firebase';

const questConnect = collection(firebase.firestore, '/quests');
function ValidateLocation({ navigation, route }) {
  const [lat, setLatitude] = useState(0);
  const [lng, setLng] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    getQuest().then(quest => {
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
    let dist = Math.sqrt(a * a + b * b) * 69; // in miles
    console.log(dist * 69);
    console.log(lat);
    console.log(lng);
    if (dist < 1) {
      navigation.navigate('Rate', { id: route.params.id });
    } else {
      setFailed(true);
    }
  }

  return (
    <View>
      {loaded && <Text> Getting Necessary Datas</Text>}
      <Text>List of Quests in progress as tiles</Text>
      {loaded && (
        <>
          <Button title="Test Location" onPress={getLoc}></Button>
        </>
      )}
      {failed && <Text>You Failed!</Text>}
    </View>
  );
}

export default ValidateLocation;
// navigation.navigate('Quest', {
//  id: questMarker.questID,
//})
