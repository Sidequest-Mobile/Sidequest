import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Login from './account/login';
import Signup from './account/signup';
import { AuthStackType } from './types';
const Stack = createStackNavigator<AuthStackType>();
function AuthStack({}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="signup"
        component={Signup}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="login" component={Login} />
    </Stack.Navigator>
  );
}
export default AuthStack;
