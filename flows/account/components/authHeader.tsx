import React from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';

export default function AuthHeader() {
  return (
    <View style={styles.headerContainer}>
      <ImageBackground
        source={require('../../../assets/LoginHeader.png')}
        style={styles.headerImage}>
        <Image
          source={require('../../../assets/SideQuest.png')}
          style={styles.headerText}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: -20,
    height: '30%',
    width: '110%',
    zIndex: 1,
  },
  headerImage: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
  },
  headerText: {
    marginTop: 65,
    width: '50%',
    resizeMode: 'contain',
  },
});
