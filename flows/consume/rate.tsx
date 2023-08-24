import React from 'react';
import { Button, Pressable, Text, View } from 'react-native';

function Rate({ navigation }) {
  return (
    <View>
      <Pressable>
        <Text>Go back to Search</Text>
      </Pressable>
      <Text>List of Quests in progress as tiles</Text>
      <Button title="Complete" onPress={e => navigation.popToTop()}></Button>
    </View>
  );
}

export default Rate;
