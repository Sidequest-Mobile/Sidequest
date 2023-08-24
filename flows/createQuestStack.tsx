import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Quest from './consume/quest';
import Rate from './consume/rate';
import ValidateLocation from './consume/validateLocation';
import ValidateMedia from './consume/validateMedia';
import ValidateQuiz from './consume/validateQuiz';
import CreateQuest from './create/creationForm';
import QuestStats from './create/questStats';
import MeTabs from './meTabs';
const Stack = createStackNavigator();
function CreateStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Me" component={MeTabs} />
      <Stack.Screen name="Create" component={CreateQuest} />
      <Stack.Screen name="Quest Stats" component={QuestStats} />
      <Stack.Screen name="Quest" component={Quest} />
      <Stack.Screen name="Validate Media" component={ValidateMedia} />
      <Stack.Screen name="Validate Quiz" component={ValidateQuiz} />
      <Stack.Screen name="Validate Location" component={ValidateLocation} />
      <Stack.Screen name="Rate" component={Rate} />
    </Stack.Navigator>
  );
}
export default CreateStack;
