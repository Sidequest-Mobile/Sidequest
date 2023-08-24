import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
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
    </Stack.Navigator>
  );
}
export default CreateStack;
