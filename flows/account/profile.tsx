import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UploadImage from './components/uploadImage';

export default function Profile() {
  return (
    <View style={styles.container}>
      <UploadImage style={profPicStyles}/>
      <Text>Username</Text>
      <Text>Bio</Text>
      <Text>Achievements</Text>
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

const profPicStyles = StyleSheet.create({
  container: {
    display: 'flex',
    position: 'absolute',
    top: '10%',
    left: '5%',
  },
  imageContainer: {
    height: 150,
    width: 150,
    backgroundColor: '#efefef',
    position: 'relative',
    borderRadius: 999,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
  },
  uploadBtnContainer: {
      position: 'absolute',
      right: '10%',
      bottom: 0,
      borderRadius: 999,
      borderWidth: 3,
      borderColor: 'white',
      backgroundColor: 'cornflowerblue',
      width: 30,
      height: 30,
      alignItems: "center",
      justifyContent: 'center'
  },
})