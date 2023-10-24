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
import firebase from '../firebase';
const questCollection = collection(firebase.firestore, '/quests');

type filters = {
  tags: Array<QueryFieldFilterConstraint>;
  distance?: QueryFieldFilterConstraint;
  type: Array<QueryFieldFilterConstraint>;
};
const Search = ({}) => {
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

  const [quests, setQuests] = useState({});

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
        if (docs.size) {
          if (filterDisplay.targetDifficulty) {
            docs.docs.filter(doc => {
              let difficulty = [...doc.data.difficulty_rating].slice(0, 5);
            });
          }
          if (filterDisplay.textIncludes.length) {
          }
          if (filterDisplay.minimumAverageRating) {
          }
        }
      });
    }
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
        <Text> Where We'll Store Results of a Search</Text>
      </View>
    </View>
  );
};
export default Search;
