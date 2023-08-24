import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import Feed from './community/feed';
import Leaderboard from './community/leaderboard';
import Validate from './community/validate';
const Tab = createMaterialTopTabNavigator();
function CommunityTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="LeaderBoard" component={Leaderboard} />
      <Tab.Screen name="Rate" component={Validate} />
    </Tab.Navigator>
  );
}

export default CommunityTabs;
