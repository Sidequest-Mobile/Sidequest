import { NavigationContainer } from '@react-navigation/native';
import React, { createContext, useState } from 'react';
import AuthStack from './flows/authStack';
import Tabs from './flows/tabs';

export type appContextType = {
  authSuccess: (val: boolean) => void;
  userID: string;
  changeUserID: (x: string) => void;
};

export const appContext = createContext<appContextType>({} as appContextType);

export default function App() {
  const [signedIn, setSignIn] = useState(false);
  const [userID, setUserID] = useState('DEFAULT_USER');

  function changeUserID(x: string) {
    setUserID(x);
  }
  function authSuccess(val: boolean): void {
    setSignIn(val);
  }
  return (
    <appContext.Provider value={{ authSuccess, userID, changeUserID }}>
      <NavigationContainer>
        {signedIn || <AuthStack />}
        {signedIn && <Tabs />}
      </NavigationContainer>
    </appContext.Provider>
  );
}
