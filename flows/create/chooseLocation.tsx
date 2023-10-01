import React, { useContext } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { creationContext } from '../createQuestStack';

function ChooseLocation() {
  let context = useContext(creationContext);

  return (
    <MapView
      style={{ width: '100%', height: '100%' }}
      mapType="satellite"
      initialRegion={{
        latitude: context.lat,
        longitude: context.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
      <Marker
        draggable={true}
        coordinate={{ latitude: context.lat, longitude: context.lng }}
        onDragEnd={e => {
          context.changeLat(e.nativeEvent.coordinate.latitude);
          context.changeLng(e.nativeEvent.coordinate.longitude);
          console.log(
            'new location',
            e.nativeEvent.coordinate.latitude,
            e.nativeEvent.coordinate.longitude,
          );
        }}
      />
    </MapView>
  );
}

export default ChooseLocation;
