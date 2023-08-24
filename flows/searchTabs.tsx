import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import Map from './consume/map';
import SearchBar from './consume/search';

const Tab = createMaterialTopTabNavigator();
function SearchTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Search" component={SearchBar} />
      <Tab.Screen name="Map" component={Map} />
    </Tab.Navigator>
  );
}

export default SearchTabs;
