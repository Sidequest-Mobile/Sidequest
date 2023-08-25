import * as Location from 'expo-location';
import { collection, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import firebase from '../firebase';
const questConnect = collection(firebase.firestore, '/quests');

function Map({ navigation }) {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [latitudeDelta, setLatitudeDelta] = useState(0.0922);
  const [longitudeDelta, setLongitudeDelta] = useState(0.0421);

  useEffect(() => {
    getLoc();
  }, []);
  useEffect(() => {
    console.log('Queried for Markers');
  }, [latitudeDelta, longitudeDelta, loaded]);

  async function getLoc() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      navigation.navigate('Search');
      return;
    }
    let currentPosition = await Location.getCurrentPositionAsync({});
    setLatitude(currentPosition.coords.latitude);
    setLongitude(currentPosition.coords.longitude);
    console.log(
      'Latitude:',
      currentPosition.coords.latitude,
      '   Longitude:',
      currentPosition.coords.longitude,
    );
    setLoaded(true);
  }
  function changeLocation(event) {
    if (
      event.latitudeDelta > 1.5 * latitudeDelta ||
      event.longitudeDelta > 1.5 * longitudeDelta
    ) {
      setLatitudeDelta(event.latitudeDelta);
      setLongitudeDelta(event.longitudeDelta);
    }
    console.log(event);
  }
  return (
    <View>
      {loaded && (
        <MapView
          style={{ width: '100%', height: '100%' }}
          mapType="satellite"
          showsUserLocation={true}
          onRegionChangeComplete={changeLocation}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}></MapView>
      )}
    </View>
  );
}

export default Map;

// Benji's Notes:
// The Map component will end up being a pretty complicated one.
// First, we'll want to use the location API to ask for permssion to access current location.
// If that's denied, they should get pushed back to the other Search screen.
// Then, we'll render the screen with them at the center using their latlong from location.
// We'll also need to query Firebase and get a range of quests within a certain geographical distance
// those will be passed in as an array of "Marker" components to the Mapview component
// they will need to be customized to display a little information call-out when clicked
// when they press a button on that little callout, they'll need to be navigated to the Quest component with passed along parameters
