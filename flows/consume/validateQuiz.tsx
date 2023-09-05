import { collection, doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Button, Pressable, Text, View } from 'react-native';
import firebase from '../firebase';

const questConnect = collection(firebase.firestore, '/quests');

function ValidateQuiz({ navigation, route }) {
  const [loaded, setLoaded] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState(['']);
  const [rightAnswer, setRightAnswer] = useState('');
  const [question, setQuestion] = useState('');
  const [selected, setSelected] = useState('');

  useEffect(() => {
    getQuest().then(quest => {
      setWrongAnswers(quest.incorrect_answers);
      setQuestion(quest.question);
      setRightAnswer(quest.answer);
      setLoaded(true);
    });
  }, []);

  async function getQuest() {
    const docref = doc(questConnect, `${route.params.id}`);
    const quest = await getDoc(docref);
    return quest.data();
  }

  return (
    <View>
      <Text>List of Quests in progress as tiles</Text>

      <Button
        title="Go to Rate"
        onPress={e => navigation.navigate('Rate')}></Button>
    </View>
  );
}

export default ValidateQuiz;
