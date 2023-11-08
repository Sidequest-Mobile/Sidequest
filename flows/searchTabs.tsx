import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import Map from './consume/map';
import Search from './consume/search';
import { SearchTabsType } from './types';
const Tab = createMaterialTopTabNavigator<SearchTabsType>();
function SearchTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Map" component={Map} />
    </Tab.Navigator>
  );
}

export default SearchTabs;
