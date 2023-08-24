import React from 'react';
import { Button, Pressable, Text, View } from 'react-native';

function Rate() {
  return (
    <View>
      <Pressable>
        <Text>Go back to Search</Text>
      </Pressable>
      <Text>List of Quests in progress as tiles</Text>
      <Button title="Go to My Joined Quests"></Button>
    </View>
  );
}

export default Rate;
