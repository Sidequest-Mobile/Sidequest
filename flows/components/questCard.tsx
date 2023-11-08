import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
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
  const [uri, setUri] = useState<string | null>(null);

  // Get and create a reference to Firebase Storage
  const storage = getStorage();

  useEffect(() => {
    console.log('Quest Image Location', picture);
    const profilePicRef = ref(storage, picture);
    getDownloadURL(profilePicRef)
      .then(uri => {
        setUri(uri);
        console.log('Set URI', uri);
      })
      .catch(error => {
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            break;
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
          case 'storage/quota-exceeded':
            // Free storage quota exceeded
            break;
          case 'storage/unauthenticated':
            // User is unauthenticated
            break;
        }
      });
  }, []);

  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
      <Image source={{ uri }} style={styles.cardImage} />
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
