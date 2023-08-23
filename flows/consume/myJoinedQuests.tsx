import React from 'react';
import { Button, Pressable, Text, View } from 'react-native';

function MyJoinedQuests() {
  return (
    <View>
      <Pressable>
        <Text>Go back to "Profile!</Text>
      </Pressable>
      <Text>List of Quests in progress as tiles</Text>
      <Button title="Go to individual quest"></Button>
    </View>
  );
}

export default MyJoinedQuests;
