import React, { useState } from 'react';
import { Text } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';

function CreationMap({ navigation, route }) {
  const [mapLatitude, setMapLatitude] = useState(route.params.lat);
  const [mapLongitude, setMapLongitude] = useState(route.params.lng);
  return (
    <MapView
      style={{ flex: 1 }}
      mapType="satellite"
      initialRegion={{
        latitude: mapLatitude,
        longitude: mapLongitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
      <Marker
        draggable={true}
        coordinate={{ latitude: mapLatitude, longitude: mapLongitude }}
        onDragEnd={e => {
          setMapLatitude(e.nativeEvent.coordinate.latitude);
          setMapLongitude(e.nativeEvent.coordinate.longitude);
          console.log('End location', e.nativeEvent.coordinate);
        }}
      />
      <Callout
        style={{
          flex: 1,
          alignSelf: 'flex-end',
          justifyContent: 'space-between',
          backgroundColor: 'transparent',
          borderWidth: 0.5,
          borderRadius: 20,
        }}
        onPress={() =>
          navigation.navigate('Create', {
            lat: mapLatitude,
            lng: mapLongitude,
          })
        }>
        <Text>Select</Text>
      </Callout>
    </MapView>
  );
}

export default CreationMap;
