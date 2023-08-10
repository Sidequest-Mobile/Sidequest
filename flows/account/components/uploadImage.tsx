import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
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
