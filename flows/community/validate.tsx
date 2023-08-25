import React from 'react';
import { Pressable, Text, View } from 'react-native';

function Validate() {
  return (
    <View>
      <Pressable>
        <Text>Back to Dashboard</Text>
      </Pressable>
      <Text>
        A displayed image, with the option to vote on whether it passed or not
      </Text>
    </View>
  );
}

export default Validate;
