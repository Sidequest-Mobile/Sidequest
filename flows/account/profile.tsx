import { getDownloadURL, getStorage, ref } from "firebase/storage";
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import TextEditForm from './components/textEditForm';
import UploadImage from './components/uploadImage';

export default function Profile() {
    const [profPicUrl, setProfPicUrl] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [showEdit, setShowEdit] = useState(false);


    // Get and create a reference to Firebase Storage
    const storage = getStorage();
    const profilePicRef = ref(storage, `profile.jpg`);

    // setter functions for username and bio
    const updateUsername = (newUsername: string):void => {
      setUsername(newUsername)
    }

    const updateBio = (newBio: string):void => {
      setBio(newBio)
    }

    // function to toggle show edits
    const openCloseEdits = (toggle: boolean):void => {
      setShowEdit(toggle);
    }


    useEffect(() => {
      getDownloadURL(profilePicRef)
        .then((url) => {
          setProfPicUrl(url);
        })
        .catch((error) => {
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

  const UploadImageProps = {
    style: profPicStyles,
    url: profPicUrl,
    storageLocation: 'profile.jpg'
  };

  const TextEditProps = {
    updateUsername,
    updateBio,
    openCloseEdits,
    username,
    bio,
  }

  return (
    <View style={styles.container}>
      <UploadImage {...UploadImageProps}/>
      <Text>Username - {username}</Text>
      <Text>Bio - {bio}</Text>
      <Text>Achievements</Text>
      <Button
        title="Edit"
        color="red"
        onPress={() => setShowEdit(true)}
      />
      <>
        {showEdit && <TextEditForm {...TextEditProps} />}
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const profPicStyles = StyleSheet.create({
  container: {
    display: 'flex',
    position: 'absolute',
    top: '10%',
    left: '5%',
  },
  imageContainer: {
    height: 150,
    width: 150,
    backgroundColor: '#efefef',
    position: 'relative',
    borderRadius: 999,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
  },
  uploadBtnContainer: {
      position: 'absolute',
      right: '10%',
      bottom: 0,
      borderRadius: 999,
      borderWidth: 3,
      borderColor: 'white',
      backgroundColor: 'cornflowerblue',
      width: 30,
      height: 30,
      alignItems: "center",
      justifyContent: 'center'
  },
})