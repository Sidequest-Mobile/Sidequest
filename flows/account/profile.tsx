import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UploadImage from '../components/uploadImage';

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text>User Profile goes here!</Text>
      <UploadImage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});