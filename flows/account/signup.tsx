import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { appContext } from '../../App';
import firebase from '../firebase.js';
import AuthHeader from './components/authHeader';

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
      <AuthHeader />
      <View style={styles.card}>
        <Text style={styles.titleText}>Sign Up</Text>
        <Text style={styles.subText}>
          Create an account and start questing!
        </Text>
        <View style={styles.formContainer}>
          <TextInput
            placeholder="email"
            value={email}
            onChangeText={e => setEmail(e)}
            style={styles.inputField}
            placeholderTextColor="#985E39"></TextInput>
          <TextInput
            placeholder="password"
            value={password}
            onChangeText={e => setPassword(e)}
            style={styles.inputPassword}></TextInput>
          <Pressable onPress={onSignupPress} style={styles.signupButton}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </Pressable>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Pressable
            onPress={() => navigation.navigate('login')}
            style={styles.loginButton}>
            <Text style={styles.loginButton}>Login</Text>
          </Pressable>
        </View>
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
  card: {
    backgroundColor: '#1F1F1F',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '80%',
    borderRadius: 20,
  },
  formContainer: {
    backgroundColor: '#EAD6B5',
    padding: 20,
    width: '100%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#985E39',
  },
  titleText: {
    color: 'white',
    fontSize: 25,
    paddingTop: 20,
    alignSelf: 'flex-start',
  },
  subText: {
    color: '#985E39',
    fontSize: 15,
    paddingVertical: 20,
    paddingRight: 100,
    alignSelf: 'flex-start',
  },
  inputField: {
    paddingBottom: 8,
    color: '#985E39',
    borderBottomWidth: 2,
    borderBottomColor: 'rgb(194,143,103)',
  },
  inputPassword: {
    paddingBottom: 8,
    marginTop: 10,
    color: '#985E39',
    borderBottomWidth: 2,
    borderBottomColor: 'rgb(194,143,103)',
  },
  signupButton: {
    backgroundColor: '#dcbf95',
    borderColor: '#985E39',
    borderWidth: 2,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
    marginHorizontal: 25,
  },
  signupButtonText: {
    padding: 5,
    color: '#985E39',
  },
  footer: {
    alignSelf: 'flex-start',
  },
  footerText: {
    color: '#985E39',
    fontSize: 15,
    paddingTop: 20,
  },
  loginButton: {
    color: 'white',
    textDecorationLine: 'underline',
    paddingTop: 5,
  },
});

export default Signup;
