import * as Location from 'expo-location';
import {
  collection,
  endAt,
  getDocs,
  orderBy,
  query,
  startAt,
} from 'firebase/firestore';
import { distanceBetween, geohashQueryBounds } from 'geofire-common';
import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import firebase from '../firebase';
const questConnect = collection(firebase.firestore, '/quests');

function Map({ navigation }) {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [latitudeDelta, setLatitudeDelta] = useState(0.0922);
  const [longitudeDelta, setLongitudeDelta] = useState(0.0421);
  const [questMarkers, setQuestMarkers] = useState([]);

  useEffect(() => {
    getLoc();
  }, []);
  useEffect(() => {
    getMarkers().then(marks => {
      let markObjs = marks.map(mark => {
        const data = mark.data();
        data.questID = mark.id;
        return data;
      });
      console.log(markObjs);
      setQuestMarkers([...questMarkers, ...markObjs]);
    });
    console.log('Queried for Markers');
  }, [latitudeDelta, longitudeDelta, loaded]);

  async function getMarkers() {
    const bounds = geohashQueryBounds(
      [latitude, longitude],
      latitudeDelta * 111 * 1000,
    );
    const promises = [];
    for (const b of bounds) {
      const q = query(
        questConnect,
        orderBy('geohash'),
        startAt(b[0]),
        endAt(b[1]),
      );

      promises.push(getDocs(q));
    }

    // Collect all the query results together into a single list
    const snapshots = await Promise.all(promises);

    const matchingDocs = [];
    for (const snap of snapshots) {
      for (const doc of snap.docs) {
        console.log(doc);
        const lat = doc.get('lat');
        const lng = doc.get('lng');

        // We have to filter out a few false positives due to GeoHash
        // accuracy, but most will match
        const distanceInKm = distanceBetween([lat, lng], [latitude, longitude]);
        const distanceInM = distanceInKm * 1000;
        if (distanceInM <= latitudeDelta * 111 * 1000) {
          matchingDocs.push(doc);
        }
      }
    }
    return matchingDocs;
  }
  // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
  // a separate query for each pair. There can be up to 9 pairs of bounds
  // depending on overlap, but in most cases there are 4.

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
          }}>
          {loaded && questMarkers.length > 0
            ? questMarkers.map(questMarker => {
                return (
                  <Marker
                    coordinate={{
                      latitude: questMarker.lat,
                      longitude: questMarker.lng,
                    }}>
                    <Callout
                      onPress={e =>
                        navigation.navigate('Quest', {
                          id: questMarker.questID,
                        })
                      }>
                      <View>
                        <Text>Quest Tagline:{questMarker.tagline}</Text>
                        <Button title="Learn More!"></Button>
                      </View>
                    </Callout>
                  </Marker>
                );
              })
            : null}
        </MapView>
      )}
    </View>
  );
}

export default Map;

// Benji's Notes:
// The Map component will end up being a pretty complicated one.
// they will need to be customized to display a little information call-out when clicked
// when they press a button on that little callout, they'll need to be navigated to the Quest component with passed along parameters
