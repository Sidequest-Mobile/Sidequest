import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Login from './account/login';
import Signup from './account/signup';
const Stack = createStackNavigator();
function AuthStack({}) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="signup" component={Signup} />
      <Stack.Screen name="login" component={Login} />
    </Stack.Navigator>
  );
}
export default AuthStack;
