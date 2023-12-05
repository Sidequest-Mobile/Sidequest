import React from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  View,
} from 'react-native';

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
    width: '110%',
    zIndex: 1,
    ...Platform.select({
      ios: {
        marginTop: -30,
        height: '32%',
      },
      android: {
        marginTop: -40,
        height: '35%',
      },
    }),
  },
  headerImage: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    width: '55%',
    resizeMode: 'contain',
    ...Platform.select({
      ios: {
        marginTop: 80,
      },
      android: {
        marginTop: 75,
      },
    }),
  },
});
