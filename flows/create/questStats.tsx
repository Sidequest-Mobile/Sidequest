import React from 'react';
import { Pressable, Text, View } from 'react-native';
function QuestStats({ navigation, route }) {
  return (
    <View>
      <Text>
        List of Stats and performance of Quests that this user has created
      </Text>
      <Pressable onPress={e => navigation.pop()}>
        <Text>Go Back to My Created Quests</Text>
      </Pressable>
    </View>
  );
}

export default QuestStats;
