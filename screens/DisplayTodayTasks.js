import { View, Text } from 'react-native'
import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context';
import DisplayTasks from './components/DisplayTasks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThreeDots from './components/ThreeDots';

let firstLoad = true;

const DisplayTodayTasks = ({navigation}) => {

    const tasks = useSelector((store) => store.tasks);
    const today = new Date().toDateString();
    const todayTasks = tasks.filter((row) => row.value.date == today);

    console.log(firstLoad)

    const dispatch = useDispatch();
    
    useEffect(() => {
        const loadData = async () => {
        try {
          const allKeys = await AsyncStorage.getAllKeys();
          const sortedKeys = allKeys.sort();
          // extract only normal tasks
          const ordinaryTasksKeys = sortedKeys.filter((key) => !isNaN(key));
          const ordinaryData = await AsyncStorage.multiGet(sortedKeys);
  
          const loadedData = ordinaryData.map(([key,value]) => {
            var jsObj = JSON.parse(value);
            return {
              id : key, 
              value : {task: jsObj.task, date: jsObj.date, time: jsObj.time, status: jsObj.status}
            }
          });
          
          // we can call taskAdded action for each task in loaded data
          // setTasks(loadedData);
          
          if(firstLoad) {
            loadedData.forEach(obj => dispatch({
              type: "taskAdded",
              payload: {
                task : obj.value.task,
                id : obj.id,
                date: obj.value.date,
                time: obj.value.time,
                status: obj.value.status
              }
            }))
            firstLoad = false;
          }
  
        } catch (error) {
          console.error("Error in loading data : ",error);
        }
      }
      loadData();
    },[]);

  return (

    <SafeAreaView>
        <View style={styles.top_bar}>
            <ThreeDots />
        </View>
        <Text style={styles.day}>{today}</Text>
        {todayTasks.map((item) => {
            return (
                <DisplayTasks key={item.id} task={item.value.task} time={item.value.time} id={item.id} status={item.value.status} navigation={navigation}/>
            )
        })}
    </SafeAreaView>
  )
}

export default DisplayTodayTasks

const styles = {
  day: {
    fontWeight: 500,
    fontSize: 20
  },
  top_bar : {
    height: 25,
    display: 'flex',
    alignItems: 'flex-end'
  }
};