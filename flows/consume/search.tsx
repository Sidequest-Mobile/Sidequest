import { Picker } from '@react-native-picker/picker';
import {
  QueryFieldFilterConstraint,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import React, { useState } from 'react';
import { Button, Pressable, Text, TextInput, View } from 'react-native';
import QuestCard from '../components/questCard';
import firebase from '../firebase';
const questCollection = collection(firebase.firestore, '/quests');

type filters = {
  tags: Array<QueryFieldFilterConstraint>;
  distance?: QueryFieldFilterConstraint;
  type: Array<QueryFieldFilterConstraint>;
};
const Search = ({ navigation }) => {
  const [wheres, setWheres] = useState({
    type: [],
    tags: [],
  } as filters);

  const [mode, setMode] = useState('empty');
  const [input, setInput] = useState('');
  const [filterDisplay, setFilterDisplay] = useState({
    tags: [],
    type: [],
    minimumAverageRating: 0,
    targetDifficulty: 0,
    textIncludes: [],
    maxDistance: 0,
  });

  const [quests, setQuests] = useState('Not Loaded');

  function addFilter() {
    let newWhere: QueryFieldFilterConstraint;
    switch (mode) {
      case 'Tags':
        newWhere = where('tags', 'array-contains', input);
        setWheres({ type: wheres.type, tags: [...wheres.tags, newWhere] });
        setFilterDisplay({
          ...filterDisplay,
          tags: [...filterDisplay.tags, input],
        });
        break;
      case 'Type':
        newWhere = where('type', '==', input);
        setWheres({ type: [...wheres.type, newWhere], tags: [...wheres.tags] });
        setFilterDisplay({
          ...filterDisplay,
          type: [...filterDisplay.type, input],
        });
        break;
      case 'Distance':
        setFilterDisplay({ ...filterDisplay, maxDistance: Number(input) });
        break;
      case 'Difficulty':
        setFilterDisplay({ ...filterDisplay, targetDifficulty: Number(input) });
        break;
      case 'Rating':
        setFilterDisplay({
          ...filterDisplay,
          minimumAverageRating: Number(input),
        });
        break;
      case 'Text':
        setFilterDisplay({
          ...filterDisplay,
          textIncludes: [...filterDisplay.textIncludes, input],
        });
        break;
    }
    setInput('');
    setMode('empty');
  }

  function changeMode(itemValue, itemIndex) {
    setMode(itemValue);
    setInput('');
    console.log(filterDisplay);
  }

  function runQuery() {
    if (filterDisplay.maxDistance === 0) {
      const q = query(questCollection, ...wheres.type, ...wheres.tags);
      getDocs(q).then(docs => {
        console.log(docs.docs[0].data);
        if (docs.size) {
          let filteredDocs = [...docs.docs];
          if (filterDisplay.targetDifficulty) {
            filteredDocs.sort((doc1, doc2) => {
              let difficulty1 = averageRating(
                [...doc1.data().difficulty_rating].slice(0, 5),
              );
              let difficulty2 = averageRating(
                [...doc2.data().difficulty_rating].slice(0, 5),
              );
              let dif1 = Math.abs(difficulty1 - filterDisplay.targetDifficulty);
              let dif2 = Math.abs(difficulty2 - filterDisplay.targetDifficulty);
              return dif1 - dif2; // may need to switch order.
            });
          }

          if (filterDisplay.textIncludes.length) {
            filteredDocs = filteredDocs.filter(doc => {
              for (let str of filterDisplay.textIncludes) {
                if (
                  !(
                    doc.data().tagline.includes(str) ||
                    doc.data().description.includes(str)
                  )
                ) {
                  return false;
                }
              }
              return true;
            });
          }

          if (filterDisplay.minimumAverageRating) {
            filteredDocs = filteredDocs.filter(doc => {
              let averageR = averageRating([
                ...doc.data().quality_rating.slice(0, 5),
              ]);
              return averageR >= filterDisplay.minimumAverageRating;
            });
          }
          setQuests(
            filteredDocs.map(doc => {
              return { ...doc.data(), id: doc.id };
            }),
          );
          console.log(filteredDocs.map(doc => doc.data()));
        }
      });
    }
  }

  function averageRating(arr) {
    let count = arr.reduce((acc, curr) => acc + curr, 0);
    let total = arr.reduce((acc, curr, ind) => acc + curr * (ind + 1), 0);
    return count !== 0 ? total / count : 0;
  }

  return (
    <View>
      <Picker selectedValue={mode} onValueChange={changeMode}>
        <Picker.Item label="Tags" value="Tags" />
        <Picker.Item label="Type" value="Type" />
        <Picker.Item label="Distance" value="Distance" />
        <Picker.Item label="Difficulty" value="Difficulty" />
        <Picker.Item label="Rating" value="Rating" />
        <Picker.Item label="Text" value="Text" />
      </Picker>
      <View>
        <Text>Where we'll display the kind of input that's possible. </Text>
        {mode === 'Tags' && (
          <View>
            <Text>Tags</Text>
            <TextInput value={input} onChangeText={e => setInput(e)} />
          </View>
        )}
        {mode === 'Type' && (
          <>
            <Text>Type</Text>
            {['Location', 'Quiz', 'Media']
              .filter(type => {
                console.log(
                  type,
                  filterDisplay.type.find(val => val === type),
                );
                return (
                  filterDisplay.type.find(val => val === type) === undefined
                );
              })
              .map(type => {
                return (
                  <>
                    <Pressable onPress={() => setInput(type)}>
                      <View>
                        <Text
                          style={
                            input == type
                              ? { fontWeight: 'bold' }
                              : { fontWeight: 'normal' }
                          }>
                          {type}
                        </Text>
                      </View>
                    </Pressable>
                  </>
                );
              })}
          </>
        )}
        {mode === 'Distance' && (
          <>
            <Text>Maximum Acceptable Distance</Text>
            <TextInput
              inputMode="numeric"
              value={input}
              onChangeText={e => setInput(e)}
            />
          </>
        )}
        {mode === 'Difficulty' && (
          <>
            <Text> Target Average Difficulty</Text>
            <TextInput
              inputMode="numeric"
              value={input}
              onChangeText={e => setInput(e)}
            />
          </>
        )}
        {mode === 'Rating' && (
          <>
            <Text>Minimum Rating</Text>
            <TextInput
              inputMode="numeric"
              value={input}
              onChangeText={e => setInput(e)}
            />
          </>
        )}
        {mode === 'Text' && (
          <>
            <Text>Text Includes</Text>
            <TextInput value={input} onChangeText={e => setInput(e)} />
          </>
        )}
        {mode != 'empty' && (
          <View>
            <Button title="Add Filter" onPress={addFilter} />
          </View>
        )}
      </View>
      <View>
        <Text> Where We'll Store parts that have been added.</Text>
        {filterDisplay.tags.map(tag => (
          <Text key={tag}>Tag:{tag}</Text>
        ))}

        {filterDisplay.textIncludes.map(text => (
          <Text key={text}>Text:{text}</Text>
        ))}

        {filterDisplay.type.map(type => (
          <Text key={type}>Type:{type}</Text>
        ))}

        {filterDisplay.maxDistance !== 0 && (
          <Text>Max Distance:{filterDisplay.maxDistance}</Text>
        )}

        {filterDisplay.minimumAverageRating !== 0 && (
          <Text>Minimum Rating:{filterDisplay.minimumAverageRating}</Text>
        )}
        {filterDisplay.targetDifficulty !== 0 && (
          <Text>Target Difficulty:{filterDisplay.targetDifficulty}</Text>
        )}
      </View>
      <View>
        <View>
          <Button title="Add Filter" onPress={runQuery} />
        </View>
      </View>
      <View>
        <Text> Where We'll Store Results of a Search</Text>
        {quests !== 'Not Loaded' &&
          quests.map(quest => {
            let nav = function () {
              navigation.navigate('Quest', { id: quest.id });
            };
            return (
              <QuestCard
                name={quest.questID}
                description={
                  quest !== undefined ? quest.description : 'no Description'
                }
                location={
                  quest !== undefined
                    ? 'Latitude' + quest.lat + 'Longitude' + quest.lng
                    : 'no Description'
                }
                picture={
                  quest !== undefined &&
                  quest.quest_image_location !== undefined
                    ? quest.quest_image_location
                    : 'questMain_userID_iulgm135F0R0g84PcLfUQF5dSkz2_QuestNumber_1'
                }
                onPress={nav}
              />
            );
          })}
      </View>
    </View>
  );
};
export default Search;
