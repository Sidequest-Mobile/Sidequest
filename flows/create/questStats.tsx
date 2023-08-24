import React from 'react';
import { Pressable, Text, View } from 'react-native';
function QuestStats({ navigation }) {
  return (
    <View>
      <Pressable>
        <Text>Go Back to My Created Quests</Text>
      </Pressable>
      <Text>
        List of Stats and performance of Quests that this user has created
      </Text>
    </View>
  );
}

export default QuestStats;
