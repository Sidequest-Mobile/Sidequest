import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from 'react';
import { Image, ImageStyle, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type styleTypes = {
  style: {
    container?: StyleProp<ViewStyle>;
    imageContainer?: StyleProp<ViewStyle>;
    image?: StyleProp<ImageStyle>;
    uploadBtnContainer?: StyleProp<ViewStyle>;
  }
};

export default function UploadImage({ style }: styleTypes) {
  const [image, setImage] = useState('');

  const storage = getStorage();
  const profilePicRef = ref(storage, `profile.jpg`);

  useEffect(() => {
    getDownloadURL(profilePicRef)
      .then((url) => {
        setImage(url);
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



  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    });

    if (!_image.canceled) {
      const response = await fetch(_image.assets[0].uri);
      const blob = await response.blob();

      uploadBytes(profilePicRef, blob)
        .then((snapshot) => {
          console.log('Uploaded a blob or file!', snapshot);
        })
        .catch((error) => {
          console.error('Error uploading:', error);
        });

      setImage(_image.assets[0].uri);
    }
  };

  return (
    <View style={style.container}>
      <View style={style.imageContainer}>
        {
            image  && <Image source={{ uri: image }} style={style.image} />
        }
      </View>
      <View style={style.uploadBtnContainer}>
        <TouchableOpacity onPress={addImage} >
          <MaterialCommunityIcons name="plus" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
