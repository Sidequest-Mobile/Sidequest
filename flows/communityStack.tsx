import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Dashboard from './community/dashboard';
import CommunityTabs from './communityTabs';
const Community = createStackNavigator();
function CommunityStack() {
  return (
    <Community.Navigator>
      <Community.Screen name="dash" component={Dashboard} />
      <Community.Screen name="Community Tabs" component={CommunityTabs} />
    </Community.Navigator>
  );
}
export default CommunityStack;
