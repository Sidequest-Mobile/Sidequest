import React from 'react';
import { Button, Pressable, Text, View } from 'react-native';

function Quest({ navigation }) {
  return (
    <View>
      <Text>List of Quests in progress as tiles</Text>
      <Button
        title="Go to location complete"
        onPress={e => navigation.navigate('Validate Media')}></Button>
      <Button
        title="Go to Quiz complete"
        onPress={e => navigation.navigate('Validate Quiz')}></Button>
      <Button
        title="Go to Media complete"
        onPress={e => navigation.navigate('Validate Location')}></Button>
      <Pressable onPress={e => navigation.pop()}>
        <Text>Go Back</Text>
      </Pressable>
    </View>
  );
}

export default Quest;
