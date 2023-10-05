import React from 'react';
import { Text, View } from 'react-native';

type AchievementProp = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

function Achievement(achievement: AchievementProp) {
  return (
    <View>
      <Text>{achievement.name}</Text>
      <Text>{achievement.description}</Text>
    </View>
  );
}

export default Achievement;
