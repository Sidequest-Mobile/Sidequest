import React from 'react';
import { Pressable, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

function Map() {
  return (
    <View>
      <Pressable>
        <Text>Go Back to Search</Text>
      </Pressable>
      <MapView>
        <Marker></Marker>
      </MapView>
    </View>
  );
}

export default Map;
