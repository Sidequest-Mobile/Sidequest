import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Quest from './consume/quest';
import Rate from './consume/rate';
import ValidateLocation from './consume/validateLocation';
import ValidateMedia from './consume/validateMedia';
import ValidateQuiz from './consume/validateQuiz';
import SearchTabs from './searchTabs';
import { ConsumeQuestStackType } from './types';
const Stack = createStackNavigator<ConsumeQuestStackType>();
function QuestStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SearchMap" component={SearchTabs} />
      <Stack.Screen name="Quest" component={Quest} />
      <Stack.Screen name="Validate Media" component={ValidateMedia} />
      <Stack.Screen name="Validate Quiz" component={ValidateQuiz} />
      <Stack.Screen name="Validate Location" component={ValidateLocation} />
      <Stack.Screen name="Rate" component={Rate} />
    </Stack.Navigator>
  );
}
export default QuestStack;
