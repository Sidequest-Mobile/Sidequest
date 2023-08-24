import React from 'react';
import { Button, Pressable, Text, View } from 'react-native';

function Quest() {
  return (
    <View>
      <Pressable>
        <Text>Go back to MyJoinedQuests!</Text>
      </Pressable>
      <Text>List of Quests in progress as tiles</Text>
      <Button title="Go to location complete"></Button>
      <Button title="Go to Quiz complete"></Button>
      <Button title="Go to Media complete"></Button>
    </View>
  );
}

export default Quest;
