import { ScrollView, Text, Pressable, StyleSheet, Button, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSharedState } from '../hooks/useSharedState';
import { useEffect, createContext, Fragment } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DisplayTasks from './components/DisplayTasks';
import { seeStoredData } from './functions/SeeDataBtn';
import { clearStorage } from './functions/ClearHistoryBtn';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

export const buttonPropsContext = createContext();

const DisplayTasksScreen = () => {

    const dispatch = useDispatch();

    const navigation = useNavigation();

    const {
      /*
        tasks,
        setTasks,
      */
        task,
        setTask,
        updateMode,
        setUpdateMode,
        idOfUpdatingData,
        setIdOfUpdatingData
    } = useSharedState();

    // set a date that never can be the same ,so easy to implement the logic
    var currRenderingDate = "Sat Nov 30 2024";

    useEffect(() => {
      const loadData = async () => {
      try {
        const allKeys = await AsyncStorage.getAllKeys();
        const sortedKeys = allKeys.sort();
        const allData = await AsyncStorage.multiGet(sortedKeys);

        const loadedData = allData.map(([key,value]) => {
          var jsObj = JSON.parse(value);
          return {
            id : key, 
            value : {task: jsObj.task, date: jsObj.date}
          }
        });
        
        // we can call taskAdded action for each task in loaded data
        // setTasks(loadedData);
        /*
        loadedData.forEach(obj => dispatch({
          type: "taskAdded",
          payload: {
            task : obj.value.task,
            id : obj.id
          }
        }))
          */

      } catch (error) {
        console.error("Error in loading data : ",error);
      }
    }
    loadData();
  },[]);

  const tasks = useSelector((state) => state.tasks);

  return (
    <SafeAreaView>
      <View style={styles.top_bar}/>
      <ScrollView>
      <buttonPropsContext.Provider value = {{setIdOfUpdatingData, setUpdateMode, setTask}}>
      {tasks.map( (item) => {
        // console.log(item, typeof(item));
        if (currRenderingDate != item.value.date) {
          currRenderingDate = item.value.date;
          return (
            <Fragment key={`date-${item.id}`}>
              <Text>{currRenderingDate}</Text>
              <DisplayTasks key={item.id} task={item.value.task} id={item.id} />
            </Fragment>
          )
        }
        return (
          <DisplayTasks key={item.id} task={item.value.task} id={item.id} />
        );
      })}
      </buttonPropsContext.Provider>
      <Pressable 
        style={styles.clear_button}
        onPress={() => clearStorage(dispatch)}
        >
        <Text style={styles.button_text}>Clear History</Text>
      </Pressable>
      <Button title="See data" onPress={() => {seeStoredData(tasks)}}></Button>
      </ScrollView>
    </SafeAreaView>
  )
}

export default DisplayTasksScreen

const styles = StyleSheet.create({
    clear_button : {
      backgroundColor: 'red',
      borderRadius: 10,
      padding: 10,
      margin: 30,
      alignItems: 'center',
    },
    button_text : {
        color: 'whitesmoke',
        fontSize: 30,
        fontWeight: 500
    },
    top_bar : {
      backgroundColor: "black",
      height: 25
    }
});