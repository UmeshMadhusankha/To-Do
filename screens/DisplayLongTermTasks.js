import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context';
import DisplayTasks from './components/DisplayTasks';
import ThreeDots from './components/ThreeDots';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DisplayLongTermTasks = ({navigation}) => {

    const longTasks = useSelector((store) => store.longTermTasks);
    const dispatch = useDispatch();

    //everytime this renders, we want just to update only the redux state
    // to do so we can clear redux store everytime and then re store them one by one
    useEffect(() => {
      // clear
      dispatch({
        type: 'longTermTasksCleared'
      })

      // re update
      const reUpdater = async() => {
        try {
          const allKeys = await AsyncStorage.getAllKeys();
          const sortedKeys = allKeys.sort();
          const longKeys = sortedKeys.filter((key) => isNaN(key));
          const allLongData = await AsyncStorage.multiGet(longKeys);

          const loadedLongData = allLongData.map(([key,value]) => {
            var jsObj = JSON.parse(value);
            return {
              id : key,
              value : {task: jsObj.longTask, fromDay: jsObj.fromDay, toDay: jsObj.toDay, status: jsObj.status}
            }
          })

          loadedLongData.forEach(obj => dispatch({
            type: "longTermTaskAdded",
            payload: {
              id : obj.id,
              task : obj.value.task,
              fromDay : obj.value.fromDay,
              toDay : obj.value.toDay,
              status : obj.value.status
            }
          }))
          
        } catch (error) {
          console.error("error in the display long term tasks screen use effect : ",error);
        }
      }
      reUpdater();
    },[]);

    const dynamicStyle = navigation.canGoBack() ? 
      {justifyContent : 'space-between'} : {justifyContent : 'flex-end'};

  return (

    <SafeAreaView>
        <View style={[styles.top_bar,dynamicStyle]}>
          {//navigation.canGoBack() && 
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.back}>Back</Text>
            </TouchableOpacity>
          }
          <ThreeDots customName={'See History'} customName2={"Today Tasks"} customName3={"About"} navigation={navigation}/>
        </View>
        <Text style={styles.day}>Long Term Tasks</Text>
        {longTasks.map((item) => {
          // if (!item || !item.value) return null;
          return (
              <DisplayTasks backScreen={'long'} key={item.id} task={item.value.task} id={item.id} status={item.value.status} navigation={navigation} fromDay={item.value.fromDay} toDay={item.value.toDay} isLong={1}/>
          )
        })}
    </SafeAreaView>
  )                              
}

export default DisplayLongTermTasks

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