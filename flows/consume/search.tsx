import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import QuestCard from '../components/questCard';

const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: 'row',
    width: '95%',
    backgroundColor: '#d9dbda',
    borderRadius: 20,
    alignItems: 'center',
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: 'row',
    width: '80%',
    backgroundColor: '#d9dbda',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: '90%',
  },
});

type SearchProps = {
  clicked: boolean;
  searchPhrase: string;
  setSearchPhrase: string;
  setClicked: boolean;
};

const SearchBar = ({
  clicked,
  searchPhrase,
  setSearchPhrase,
  setClicked,
  navigation,
}: SearchProps) => {
  const [selected, setSelected] = useState<string>('all');

  // ********************************************************************** //
  // CODE BELOW USED TO TEST QUEST CARD COMPONENT //
  const [uri, setUri] = useState<string | null>(null);

  // Get and create a reference to Firebase Storage
  const storage = getStorage();
  const profilePicRef = ref(storage, `profile.jpg`);

  useEffect(() => {
    getDownloadURL(profilePicRef)
      .then(uri => {
        setUri(uri);
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

  // ***************************************************************************** //

  return (
    <>
      <View style={styles.container}></View>
      <QuestCard
        name={'Quest 1'}
        description={'this is a quest description'}
        location={'Chiswick'}
        picture={{ uri }}
        onPress={() => {}}
      />
    </>
  );
};
export default SearchBar;
