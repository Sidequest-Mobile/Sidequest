import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface QuestCardProps {
  name: string;
  description: string;
  location: string;
  picture: ImageSourcePropType;
  onPress: () => void;
}

export default function QuestCard(props: QuestCardProps) {
  const { name, description, location, picture, onPress } = props;
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
      <Image source={picture} style={styles.cardImage} />
      <View style={styles.cardTextContainer}>
        <Text>{name}</Text>
        <Text>{description}</Text>
        <Text>{location}</Text>
        <Text>Rating Placeholder</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    padding: 16,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 4,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  cardLocation: {
    fontSize: 14,
    color: '#777',
  },
});
