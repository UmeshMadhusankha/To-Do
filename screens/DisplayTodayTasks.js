import { View, Text, TouchableOpacity } from 'react-native'
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

    // console.log(firstLoad)

    const dispatch = useDispatch();
    
// load the long term tasks from async storage correctly

    useEffect(() => {
        const loadData = async () => {
        try {
          const allKeys = await AsyncStorage.getAllKeys();
          const sortedKeys = allKeys.sort();
          // extract only normal tasks
          const ordinaryTasksKeys = sortedKeys.filter((key) => !isNaN(key));
          const ordinaryData = await AsyncStorage.multiGet(ordinaryTasksKeys);
          const longTasksKeys = sortedKeys.filter((key) => isNaN(key));
          const longData = await AsyncStorage.multiGet(longTasksKeys);
  
          const loadedOrdinaryData = ordinaryData.map(([key,value]) => {
            var jsObj = JSON.parse(value);
            return {
              id : key, 
              value : {task: jsObj.task, date: jsObj.date, time: jsObj.time, status: jsObj.status}
            }
          });

          const loadedLongData = longData.map(([key,value]) => {
            var jsObj = JSON.parse(value);
            return {
              id : key,
              value : {task: jsObj.longTask, fromDay: jsObj.fromDay, toDay: jsObj.toDay, status: jsObj.status}
            }
          }) 
          
          // we can call taskAdded action for each task in loaded data
          // setTasks(loadedData);
          
          if(firstLoad) {
            loadedOrdinaryData.forEach(obj => dispatch({
              type: "taskAdded",
              payload: {
                task : obj.value.task,
                id : obj.id,
                date: obj.value.date,
                time: obj.value.time,
                status: obj.value.status
              }
            }))

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

            firstLoad = false;
          }
  
        } catch (error) {
          console.error("Error in loading data : ",error);
        }
      }
      loadData();
    },[]);

    //const dynamicStyle = navigation.canGoBack() ? 
    //  {justifyContent : 'space-between'} : {justifyContent : 'flex-end'};

  return (

    <SafeAreaView>
        <View style={styles.top_bar}>
          {/*navigation.canGoBack() && 
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.back}>Back</Text>
            </TouchableOpacity>
          */}
          <ThreeDots customName={'See History'} customName2={"Long Term Tasks"} customName3={"About"} navigation={navigation}/>
        </View>
        <Text style={styles.day}>Today Tasks</Text>
        {todayTasks.map((item) => {
            return (
                <DisplayTasks backScreen={'today'} key={item.id} task={item.value.task} time={item.value.time} id={item.id} status={item.value.status} navigation={navigation} isLong={0}/>
            )
        })}
    </SafeAreaView>
  )
}

export default DisplayTodayTasks

const styles = {
  back: {
    fontSize : 17,
    paddingHorizontal : 25,
    paddingVertical : 4,
    backgroundColor : "#ddd",
    borderRadius : 5
  },
  day: {
    fontWeight: 600,
    fontSize: 25, 
    textAlign: 'center',
    padding: 10
  },
  top_bar : {
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'flex-end'
  }
};