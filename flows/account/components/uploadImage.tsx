import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from 'react';
import { Image, ImageStyle, Platform, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type propTypes = {
  style: {
    container?: StyleProp<ViewStyle>;
    imageContainer?: StyleProp<ViewStyle>;
    image?: StyleProp<ImageStyle>;
    uploadBtnContainer?: StyleProp<ViewStyle>;
  },
  url: string;
  storageLocation: string;
};

export default function UploadImage({ style, url, storageLocation}: propTypes) {
  const [image, setImage] = useState('');

  useEffect(() => {
    setImage(url);
  }, [url])

  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!_image.canceled) {
      const storage = getStorage();
      const photoRef = ref(storage, storageLocation);

      try {
        let localUri = _image.assets[0].uri;
        if (Platform.OS === 'android') {
          await MediaLibrary.requestPermissionsAsync();
          const asset = await MediaLibrary.createAssetAsync(_image.assets[0].uri);
          localUri = asset.uri;
        }

        // Create a blob directly from the local file URI
        const blob = await new Promise<Blob>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(new Blob([xhr.response], { type: 'image/jpeg' }));
          };
          xhr.onerror = function () {
            reject(new TypeError('Failed to create blob from URI'));
          };
          xhr.responseType = 'blob';
          xhr.open('GET', localUri, true);
          xhr.send();
        });

        uploadBytes(photoRef, blob, { contentType: 'image/jpeg' })
          .then((snapshot) => {
            console.log('Uploaded a blob or file!', snapshot);
          })
          .catch((error) => {
            console.error('Error uploading:', error);
          });

        setImage(localUri);
      }

      catch (error) {
        console.error("Error while processing the image:", error);
      }
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
