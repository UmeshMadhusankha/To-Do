import { ScrollView, Text, StyleSheet, Button, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSharedState } from '../hooks/useSharedState';
import { useEffect, createContext, Fragment } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DisplayTasks from './components/DisplayTasks';
import { useDispatch, useSelector } from 'react-redux';
import ThreeDots from './components/ThreeDots';

export const buttonPropsContext = createContext();

const DisplayTasksScreen = ({navigation}) => {
    
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

    const tasks = useSelector((state) => state.tasks);

  return (
    <SafeAreaView>
      <View style={styles.top_bar}>
        <ThreeDots customName={"Todays' Tasks"} navigation={navigation}/>
      </View>
      <ScrollView>
      <buttonPropsContext.Provider value = {{setIdOfUpdatingData, setUpdateMode, setTask}}>
      {tasks.map( (item) => {
        // console.log(item, typeof(item));
        if (currRenderingDate != item.value.date) {
          currRenderingDate = item.value.date;
          return (
            <Fragment key={`date-${item.id}`}>
              <Text style={styles.day}>{currRenderingDate}</Text>
              <DisplayTasks backScreen={'To-Do'} key={item.id} task={item.value.task} time={item.value.time} id={item.id} status={item.value.status} navigation={navigation}/>
            </Fragment>
          )
        }
        return (
          <DisplayTasks backScreen={'To-Do'} key={item.id} task={item.value.task} id={item.id} navigation={navigation}/>
        );
      })}
      </buttonPropsContext.Provider>
      </ScrollView>
    </SafeAreaView>
  )
}

export default DisplayTasksScreen

const styles = StyleSheet.create({
  day: {
    fontWeight: 500,
    fontSize: 20
  },
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
      height: 25,
      display: 'flex',
      alignItems: 'flex-end'
    }
});