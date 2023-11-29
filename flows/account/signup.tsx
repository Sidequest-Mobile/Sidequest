import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import {
  Button,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { appContext } from '../../App';
import firebase from '../firebase.js';

function Signup({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authSuccess = useContext(appContext);

  function onSignupPress() {
    createUserWithEmailAndPassword(firebase.auth, email, password).then(
      userCredential => {
        authSuccess.authSuccess(true);
        authSuccess.changeUserID(userCredential.user.uid);
      },
    );
  }
  return (
    <ImageBackground
      source={require('../../assets/loginBg.png')}
      style={styles.backgroundImage}>
      <View>
        <Pressable onPress={() => navigation.navigate('login')}>
          <Text>I already have an Account</Text>
        </Pressable>
        <Text>SignUp</Text>
        <TextInput
          placeholder="YourEmail@mailprovider.com"
          value={email}
          onChangeText={e => setEmail(e)}></TextInput>
        <Text>Password</Text>
        <TextInput
          placeholder="*****"
          value={password}
          onChangeText={e => setPassword(e)}></TextInput>
        <Button title="Sign Up" onPress={onSignupPress}></Button>
      </View>
    </ImageBackground>
  );
}

Signup.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Signup;
