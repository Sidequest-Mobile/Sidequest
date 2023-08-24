import React, { useContext } from 'react';
import { Button, Text, View } from 'react-native';
import { appContext } from '../../App';
function Dashboard({ navigation }) {
  let context = useContext(appContext);
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
      <Text>{context.userID}</Text>
    </View>
  );
}

export default Dashboard;
