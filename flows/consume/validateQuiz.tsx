import { collection, doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import firebase from '../firebase';

const questConnect = collection(firebase.firestore, '/quests');

function ValidateQuiz({ navigation, route }) {
  const [loaded, setLoaded] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState(['']);
  const [rightAnswer, setRightAnswer] = useState('');
  const [question, setQuestion] = useState('');
  const [selected, setSelected] = useState('');
  const [questionArray, setQuestionArray] = useState(['']);
  const [youFailed, setYouFailed] = useState(false);

  useEffect(() => {
    getQuest().then(quest => {
      setWrongAnswers(quest.incorrect_answers);
      setQuestion(quest.question);
      setRightAnswer(quest.answer);
      setLoaded(true);
      let randomIndex = Math.floor(Math.random() * wrongAnswers.length + 1);
      let randomizedArray = [''];
      let copy = [...wrongAnswers];
      for (let i = 0; i < wrongAnswers.length + 1; i++) {
        if (i !== randomIndex) {
          randomizedArray[i] = copy.pop();
        } else {
          randomizedArray[i] = rightAnswer;
        }
      }
      setQuestionArray(randomizedArray);
    });
  }, []);

  async function getQuest() {
    const docref = doc(questConnect, `${route.params.id}`);
    const quest = await getDoc(docref);
    return quest.data();
  }
  function selectQuestion(str: string): Function {
    let func = function (): void {
      setSelected(str);
    };
    return func;
  }
  function checkSelected(): void {
    if (selected == rightAnswer) {
      navigation.navigate('Rate');
    } else {
      setYouFailed(true);
      setSelected('');
    }
  }

  return (
    <View>
      <Text>List of Quests in progress as tiles</Text>
      {questionArray.map((question: string) => {
        return (
          <View>
            <Pressable onPress={() => selectQuestion(question)()}>
              <View>
                <Text>{question}</Text>
              </View>
            </Pressable>
          </View>
        );
      })}
      {youFailed && (
        <View>
          <Text>You answered incorrectly!</Text>
        </View>
      )}
      <Button title="Go to Rate" onPress={e => checkSelected()}></Button>
    </View>
  );
}

export default ValidateQuiz;

const styles = StyleSheet.create({});
