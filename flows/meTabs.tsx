import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import Achievements from './account/achievements';
import Profile from './account/profile';
import MyJoinedQuests from './consume/myJoinedQuests';
import MyCreatedQuests from './create/myCreatedQuests';
import { MeTabsType } from './types';
const Tab = createMaterialTopTabNavigator<MeTabsType>();
function MeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Achievements" component={Achievements} />
      <Tab.Screen name="Created Quests" component={MyCreatedQuests} />
      <Tab.Screen name="Joined Quests" component={MyJoinedQuests} />
    </Tab.Navigator>
  );
}

export default MeTabs;
