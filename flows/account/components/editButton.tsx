import React, { useState } from 'react';
import { Button } from 'react-native';

export default function EditButton() {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <Button title="Edit" onPress={() => {setShowEdit(true)}}/>
  )
}