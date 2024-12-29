import { ScrollView, Text, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSharedState } from '../hooks/useSharedState';
import { useEffect, createContext, Fragment } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DisplayTasks from './components/DisplayTasks';
import { useDispatch, useSelector } from 'react-redux';
import ThreeDots from './components/ThreeDots';
import Empty from './components/Empty';

export const buttonPropsContext = createContext();

const DisplayTasksScreen = ({navigation}) => {
  
  const tasks = useSelector((state) => state.tasks);

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
    let pastTasks = 0;

    //const dynamicStyle = navigation.canGoBack() ? 
    //  {justifyContent : 'space-between'} : {justifyContent : 'flex-end'};

  return (
    <SafeAreaView>
      <View style={styles.top_bar}>
          {//navigation.canGoBack() && 
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.back}>Back</Text>
            </TouchableOpacity>
          }
          <ThreeDots customName={'Today Tasks'} customName2={"Long Term Tasks"} customName3={"About"} customName4={"Sheduled Tasks"} navigation={navigation}/>
        </View>
      <ScrollView>
      <buttonPropsContext.Provider value = {{setIdOfUpdatingData, setUpdateMode, setTask}}>
      {tasks.map( (item) => {
        // console.log(item, typeof(item));
        let now = new Date().setHours(0,0,0,0);
        let itemDate = item.value.date;
        if (currRenderingDate != itemDate && (new Date(itemDate) < now)) {
          currRenderingDate = item.value.date;
          pastTasks++;
          return (
            <Fragment key={`date-${item.id}`}>
              <Text style={styles.day}>{currRenderingDate}</Text>
              <DisplayTasks backScreen={'To-Do'} key={item.id} task={item.value.task} time={item.value.time} id={item.id} status={item.value.status} navigation={navigation} isLong={0} day={item.value.date}/>
            </Fragment>
          )
        } 
        else if (currRenderingDate == itemDate) {
          pastTasks++;
        return (
          <DisplayTasks backScreen={'To-Do'} key={item.id} task={item.value.task} id={item.id} navigation={navigation} isLong={0} day={item.value.date}/>
        );}
      })}
      </buttonPropsContext.Provider>
      </ScrollView>
      {pastTasks == 0 && <Empty />}
    </SafeAreaView>
  )
}

export default DisplayTasksScreen

const styles = StyleSheet.create({
  back: {
    fontSize : 17,
    paddingHorizontal : 25,
    paddingVertical : 4,
    backgroundColor : "#ddd",
    borderRadius : 5
  },
  day: {
    fontWeight: 500,
    fontSize: 25,
    marginVertical: 10,
    marginLeft: 2
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
      height: 30,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      position: 'relative',
      justifyContent: 'space-between'
    }
});