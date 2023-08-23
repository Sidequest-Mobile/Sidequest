import { NavigationContainer } from '@react-navigation/native';
import React, { createContext, useState } from 'react';
import AuthStack from './flows/authStack';
import Tabs from './flows/tabs';

export const appContext = createContext({});

export default function App() {
  const [signedIn, setSignIn] = useState(false);
  function authSuccess(val: boolean): void {
    setSignIn(val);
  }
  return (
    <appContext.Provider value={{ authSuccess }}>
      <NavigationContainer>
        {signedIn || <AuthStack />}
        {signedIn && <Tabs />}
      </NavigationContainer>
    </appContext.Provider>
  );
}
