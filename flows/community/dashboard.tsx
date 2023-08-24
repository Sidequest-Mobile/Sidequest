import React from 'react';
import { Button, Text, View } from 'react-native';

function Dashboard({ navigation }) {
  return (
    <View>
      <Text>Rate a Quest</Text>
      <Button
        title="to quest Rater"
        onPress={() => navigation.navigate('Community Tabs')}></Button>
      <Text>Near you!</Text>
      <Button
        title="to Social Stream"
        onPress={() => navigation.navigate('Community Tabs')}></Button>
      <Text>Leaderboard</Text>
      <Button
        title="Leaderboard"
        onPress={() => navigation.navigate('Community Tabs')}></Button>
    </View>
  );
}

export default Dashboard;
