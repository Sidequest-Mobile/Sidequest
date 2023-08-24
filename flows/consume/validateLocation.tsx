import React from 'react';
import { Button, Pressable, Text, View } from 'react-native';

function ValidateLocation() {
  return (
    <View>
      <Pressable>
        <Text>Go back to Quest</Text>
      </Pressable>
      <Text>List of Quests in progress as tiles</Text>
      <Button title="Go to Rate"></Button>
    </View>
  );
}

export default ValidateLocation;
