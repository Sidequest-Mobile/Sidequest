import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function AuthHeader() {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require('../../../assets/LoginHeader.png')}
        style={styles.headerImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    zIndex: 2,
  },
  headerImage: {
    width: '100%',
    resizeMode: 'cover',
  },
});
