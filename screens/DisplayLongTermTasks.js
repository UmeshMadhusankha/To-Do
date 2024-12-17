import { View, Text } from 'react-native'
import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context';
import DisplayTasks from './components/DisplayTasks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThreeDots from './components/ThreeDots';

let firstLoad = true;

const DisplayLongTermTasks = ({navigation}) => {

  console.log("long term tasks started")

    const longTasks = useSelector((store) => store.longTermTasks);
    console.log("long tasks : ",longTasks);
    console.log(typeof(longTasks))

    // console.log(firstLoad)

    const dispatch = useDispatch();
    
    useEffect(() => {
        const loadData = async () => {
        try {
          const allKeys = await AsyncStorage.getAllKeys();
          const sortedKeys = allKeys.sort();
          // extract only normal tasks
          const longTasksKeys = sortedKeys.filter((key) => isNaN(key));
          const longTasksData = await AsyncStorage.multiGet(longTasksKeys);
  console.log("long tasks data : ",longTasksData);
          const loadedData = longTasksData.map(([key,value]) => {
            var jsObj = JSON.parse(value);
            return {
              id : key, 
              value : {task: jsObj.task, fromDay: jsObj.fromDay, toDay: jsObj.toDay, status: jsObj.status}
            }
          });

          console.log('loaded data inside long term : ',loadedData)
          
          // we can call taskAdded action for each task in loaded data
          // setTasks(loadedData);
          
          if(firstLoad) {
            loadedData.forEach(obj => dispatch({
              type: "longTermTaskAdded",
              payload: {
                task : obj.value.task,
                id : obj.id,
                fromDay: obj.value.fromDay,
                toDay: obj.value.toDay,
                status: obj.value.status
              }
            }))
            firstLoad = false;
          }
  
        } catch (error) {
          console.error("Error in loading long term data : ",error);
        }
      }
      loadData();
    },[]);

    console.log("long term tasks ended")

  return (

    <SafeAreaView>
        <View style={styles.top_bar}>
            <ThreeDots customName={'See History'} customName2={"Todays' Tasks"} navigation={navigation}/>
        </View>
        <Text style={styles.day}>Long Term Tasks</Text>
        {longTasks.map((item) => {
          if (!item || !item.value) return null;
          console.log("each item : ",item)
          return (
              <DisplayTasks backScreen={'today'} key={item.id} task={item.value.task} id={item.id} status={item.value.status} navigation={navigation}/>
          )
        })}
    </SafeAreaView>
  )                              
}

export default DisplayLongTermTasks

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