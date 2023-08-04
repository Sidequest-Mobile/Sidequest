import React, { useState } from 'react';
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';

export default function UploadImage() {
  const [image, setImage] = useState('');
  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    });
    console.log(JSON.stringify(_image));
    if (!_image.canceled) {
      setImage(_image.assets[0].uri);
    }
  };
  return (
    <View style={imageUploaderStyles.container}>
      <View style={imageUploaderStyles.imageContainer}>
        {
            image  && <Image source={{ uri: image }} style={imageUploaderStyles.image} />
        }
      </View>
      <View style={imageUploaderStyles.uploadBtnContainer}>
        <TouchableOpacity onPress={addImage} >
          <MaterialCommunityIcons name="plus" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const imageUploaderStyles = StyleSheet.create({
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