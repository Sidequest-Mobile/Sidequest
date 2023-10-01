import { createStackNavigator } from '@react-navigation/stack';
import React, { createContext, useState } from 'react';
import Quest from './consume/quest';
import Rate from './consume/rate';
import ValidateLocation from './consume/validateLocation';
import ValidateMedia from './consume/validateMedia';
import ValidateQuiz from './consume/validateQuiz';
import ChooseLocation from './create/chooseLocation';
import CreateQuest from './create/creationForm';
import QuestStats from './create/questStats';
import MeTabs from './meTabs';
import { CreateQuestStackType } from './types';
const Stack = createStackNavigator<CreateQuestStackType>();
export type creationContextType = {
  lat: number;
  lng: number;
  changeLat: (newLat: number) => void;
  changeLng: (newLng: number) => void;
};
export const creationContext = createContext<creationContextType>(
  {} as creationContextType,
);
function CreateStack() {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const changeLat = function (num: number) {
    setLat(num);
  };
  const changeLng = function (num: number) {
    setLng(num);
  };
  return (
    <creationContext.Provider value={{ lat, lng, changeLat, changeLng }}>
      <Stack.Navigator>
        <Stack.Screen name="Me" component={MeTabs} />
        <Stack.Screen name="Create" component={CreateQuest} />
        <Stack.Screen name="Quest Stats" component={QuestStats} />
        <Stack.Screen name="Quest" component={Quest} />
        <Stack.Screen name="Validate Media" component={ValidateMedia} />
        <Stack.Screen name="Validate Quiz" component={ValidateQuiz} />
        <Stack.Screen name="Validate Location" component={ValidateLocation} />
        <Stack.Screen name="Rate" component={Rate} />
        <Stack.Screen name="Choose Location" component={ChooseLocation} />
      </Stack.Navigator>
    </creationContext.Provider>
  );
}
export default CreateStack;
