import React from 'react';
import { Button, Pressable, Text, View } from 'react-native';

function ValidateQuiz({ navigation }) {
  return (
    <View>
      <Pressable>
        <Text>Go back to Quest</Text>
      </Pressable>
      <Text>List of Quests in progress as tiles</Text>
      <Button
        title="Go to Rate"
        onPress={e => navigation.navigate('Rate')}></Button>
    </View>
  );
}

export default ValidateQuiz;
