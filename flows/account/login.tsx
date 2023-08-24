import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { Button, Pressable, Text, TextInput, View } from 'react-native';
import { appContext } from '../../App.tsx';
import firebase from '../firebase.js';

function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authSuccess = useContext(appContext);

  function onLoginPress() {
    signInWithEmailAndPassword(firebase.auth, email, password)
      .then(() => {
        console.log('User signed in!');
        authSuccess.authSuccess(true);
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          console.log('There no user exist with that email');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.error(error);
      });
  }
  return (
    <View>
      <Pressable onPress={() => navigation.navigate('signup')}>
        <Text>I would like to make an Account</Text>
      </Pressable>
      <Text>Login</Text>
      <TextInput
        placeholder="YourEmail@provider.com"
        value={email}
        onChangeText={e => setEmail(e)}></TextInput>
      <Text>Password</Text>
      <TextInput
        placeholder="*****"
        value={password}
        onChangeText={e => setPassword(e)}></TextInput>
      <Button title="Log In" onPress={e => onLoginPress()}></Button>
    </View>
  );
}

export default Login;
