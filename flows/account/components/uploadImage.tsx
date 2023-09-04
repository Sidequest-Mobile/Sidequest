import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, uploadString } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
type propTypes = {
  style: {
    container?: StyleProp<ViewStyle>;
    imageContainer?: StyleProp<ViewStyle>;
    image?: StyleProp<ImageStyle>;
    uploadBtnContainer?: StyleProp<ViewStyle>;
  };
  url: string;
  storageLocation: string;
};

export default function UploadImage({
  style,
  url,
  storageLocation,
}: propTypes) {
  const [image, setImage] = useState('');

  useEffect(() => {
    setImage(url);
  }, [url]);

  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!_image.canceled) {
      // Get and create a reference to Firebase Storage
      const storage = getStorage();
      const photoRef = ref(storage, storageLocation);

      // const content = await FileSystem.readAsStringAsync(_image.assets[0].uri, {
      //   encoding: FileSystem.EncodingType.Base64,
      // });
      uploadString(photoRef, content, 'base64').then(snapshot => {
        console.log('Uploaded a base64 string!');
      });

      const response = await fetch(_image.assets[0].uri);
      const blob = await response.blob();

      uploadBytes(photoRef, blob)
        .then(snapshot => {
          console.log('Uploaded a blob or file!', snapshot);
        })
        .catch(error => {
          console.error('Error uploading:', error);
        });

      setImage(_image.assets[0].uri);
    }
  };

  return (
    <View style={style.container}>
      <View style={style.imageContainer}>
        {image && <Image source={{ uri: image }} style={style.image} />}
      </View>
      <View style={style.uploadBtnContainer}>
        <TouchableOpacity onPress={addImage}>
          <MaterialCommunityIcons name="plus" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
