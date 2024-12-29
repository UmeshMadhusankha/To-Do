import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context';
import DisplayTasks from './components/DisplayTasks';
import ThreeDots from './components/ThreeDots';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DisplayFutureTasks = ({navigation}) => {

    const futureTasks = []
    const allOrdinaryTasks = useSelector((store) => store.tasks);
    allOrdinaryTasks.forEach((task) => {
       if (isNaN(task.id))
        futureTasks.push(task) 
    })

    const dynamicStyle = navigation.canGoBack() ? 
      {justifyContent : 'space-between'} : {justifyContent : 'flex-end'};

  return (

    <SafeAreaView>
        <View style={[styles.top_bar,{justifyContent : 'space-between'}]}>
          {//navigation.canGoBack() && 
            <TouchableOpacity onPress={() => navigation.pop()}>
              <Text style={styles.back}>Back</Text>
            </TouchableOpacity>
          }
          <ThreeDots customName={'See History'} customName2={"Today Tasks"} customName3={"About"} customName4={"Long Term Tasks"} navigation={navigation}/>
        </View>
        <Text style={styles.day}>Future Tasks</Text>
        {futureTasks.map((item) => {
          // if (!item || !item.value) return null;
          return (
              <DisplayTasks backScreen={'future'} key={item.id} task={item.value.task} id={item.id} status={item.value.status} navigation={navigation} isLong={0} day={item.value.date}/>
          )
        })}
    </SafeAreaView>
  )                              
}

export default DisplayFutureTasks

const styles = {
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
    margin: 5,
    textAlign: 'center'
  },
  top_bar : {
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'space-between'
  }
};