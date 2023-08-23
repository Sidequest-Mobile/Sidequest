import React from 'react';
import { Button, Pressable, Text, View } from 'react-native';

function MyCreatedQuests() {
  return (
    <View>
      <Pressable>
        <Text>Go back to "Me"</Text>
      </Pressable>
      <Text>Your Created Quests</Text>
      <Text>Scrollable view map of your Quests</Text>
      <Button title="Go to Quest Stats for a specific Quest"></Button>
      <Text>Works in Progress</Text>
      <Button title="Go to Quest Creator"></Button>
    </View>
  );
}
export default MyCreatedQuests;
