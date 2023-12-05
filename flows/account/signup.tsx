import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import {
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { appContext } from '../../App';
import AuthHeader from '../account/components/authHeader';
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
      <AuthHeader />
      <View>
        <View style={styles.card}>
          <Text style={styles.titleText}>Sign Up</Text>
          <Text style={styles.subText}>
            Create an account and start questing!
          </Text>
          <SafeAreaView style={styles.formContainer}>
            <TextInput
              placeholder="email"
              value={email}
              onChangeText={e => setEmail(e)}
              style={styles.inputField}
              placeholderTextColor="#c28f67"></TextInput>
            <TextInput
              placeholder="password"
              value={password}
              onChangeText={e => setPassword(e)}
              style={styles.inputPassword}
              placeholderTextColor="#c28f67"
              secureTextEntry={true}></TextInput>
            <Pressable onPress={onSignupPress} style={styles.signupButton}>
              <Text style={styles.signupButtonText}>Sign Up</Text>
            </Pressable>
          </SafeAreaView>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <Pressable
              onPress={() => navigation.navigate('login')}
              style={styles.loginButton}>
              <Text style={styles.loginButton}>Login</Text>
            </Pressable>
          </View>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#1F1F1F',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
    padding: 20,
    borderRadius: 20,
  },
  formContainer: {
    backgroundColor: '#EAD6B5',
    width: '100%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E39849',
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
    padding: 8,
    margin: 10,
    color: '#985E39',
    fontSize: 15,
    borderBottomWidth: 2,
    borderBottomColor: 'rgb(194,143,103)',
  },
  inputPassword: {
    padding: 8,
    margin: 10,
    color: '#985E39',
    fontSize: 15,
    borderBottomWidth: 2,
    borderBottomColor: 'rgb(194,143,103)',
  },
  signupButton: {
    backgroundColor: '#dcbf95',
    borderColor: '#985E39',
    borderWidth: 2,
    alignItems: 'center',
    margin: 20,
    borderRadius: 10,
  },
  signupButtonText: {
    color: '#985E39',
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 8,
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
