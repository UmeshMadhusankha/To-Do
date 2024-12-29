import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, Pressable, Button, View, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSharedState } from '../hooks/useSharedState';
import { useDispatch,useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const TaskAddingScreen = ({navigation}) => {
  
  const dispatch = useDispatch();

  const updator = useSelector((state) => state.updator);
  const tasks = useSelector((state) => state.tasks);
  const longTermTasks = useSelector((state) => state.longTermTasks);

  const isAnUpdate = updator.isAnUpdate;
  const longTask = updator.longTask;
  const idOfUpdatingData = updator.idOfUpdatingData;

  const {
    /*tasks,
    setTasks,*/
    task,
    setTask,
    updateMode,
    setUpdateMode,
    /*idOfUpdatingData,
    setIdOfUpdatingData*/
  } = useSharedState();

  const [isPressed,setIsPressed] = useState(false);
  const [hours,setHours] = useState('');
  const [minutes,setMinutes] = useState('');
  const [enabled,setEnabled] = useState(false);
  const [fromDay,setFromDay] = useState(new Date().toDateString());
  const [toDay,setToDay] = useState('- - -');
  const [showDayPicker1,setShowDayPicker1] = useState(false);
  const [showDayPicker2,setShowDayPicker2] = useState(false);

  const [ordinaryTaskDay, setOrdinaryTaskDay] = useState(new Date().toDateString());
  const [showOrdinaryDayPicker,setShowOrdinaryDayPicker] = useState(false);

  const [firstRender,setFirstRender] = useState(true);

  // console.log(showOrdinaryDayPicker);

  useEffect(() => {
    setShowDayPicker1(false)
  },[]);

  // isAnUpdate when changed, change firstRender
  useEffect(() => {
    // console.log('set to true')
    if (isAnUpdate === 1 && firstRender === false) {
      setFirstRender(true);
    }
  },[isAnUpdate])

  const toggleSwitch = () => setEnabled(!enabled);

  // will need to set data if updating
  // console.log("")
  // console.log("firstRender : ",firstRender)

  // console.log("isAnUpdate : ",isAnUpdate)
  // console.log("Good to this Point")
  if (isAnUpdate == 1) {
    if (longTask == 1) {
      // retrieve data from redux store
      // console.log("setting up tp update long task")
      
      longTermTasks.map((longTask) => {
        if (longTask.id == idOfUpdatingData) {
          const task = longTask.value.task;
          const fromDay = longTask.value.fromDay;
          const toDay = longTask.value.toDay;

          if (firstRender === true) {
            setEnabled(true);
            setTask(task);
            setFromDay(fromDay);
            setToDay(toDay);
            setFirstRender(false);
          }

          return;
        }
      })
    } else {
      tasks.map((ordinaryTask) => {
        if (ordinaryTask.id == idOfUpdatingData) {
          // console.log("setting up to update ordinary task")
          const task = ordinaryTask.value.task;
          //const time = ordinaryTask.value.time;
          //console.log(ordinaryTask.value)
          //console.log(typeof(time), time)
          //const hours = Math.floor(time / 60);
          //const minutes = time % 60;
          //console.log(hours, minutes)
          //console.log(typeof(hours),typeof(minutes))
          const date = ordinaryTask.value.date;

          if (firstRender === true) {
            //console.log("running")
            setTask(task);
            // setHours(`${hours}`);
            // setMinutes(`${minutes}`);
            setOrdinaryTaskDay(date);
            setFirstRender(false);
          }

          return;
        }
      })
    }
  }  
  // console.log("Good to this Point as Well")

    
    const handleSubmit = async (task) => {
  
      // Entering a new long term task
      if (enabled && isAnUpdate == 0) {

        try {
          // calculating long key, correct when console logged and checked
          const numOfKeys = await AsyncStorage.getAllKeys(); 
          let allKeysCount = 0;
          numOfKeys.forEach(() => allKeysCount += 1);
          const numericKeys = numOfKeys.map(key => parseInt(key)).filter(key => !isNaN(key));
          let numericKeysCount = 0;
          numericKeys.forEach(() => numericKeysCount += 1);

          const numOfExisitingLTTasks = allKeysCount - numericKeysCount;
          const nextLTTKey = "L" + (numOfExisitingLTTasks + 1);
  
          // storing data
          const toBeStored = {
            longTask : task,
            fromDay,
            toDay,
            status : 1
          };
          const jsonObjLT = JSON.stringify(toBeStored);
          
          await AsyncStorage.setItem(`${nextLTTKey}`,jsonObjLT);

          dispatch({
            type: 'longTermTaskAdded',
            payload : {
              id : nextLTTKey,
              task : task,
              fromDay : fromDay,
              toDay : toDay,
              status : 1
            }
          });

        } catch (error) {
          console.error("error in handling submit : ", error)
        }

        navigation.navigate("Tasks Stack", {screen : 'long'});
      }
      
      // Entering a new ordinary task
      else if (!enabled && isAnUpdate == 0) {
        // setting a key explicitly
        
        try {

          const numOfKeys = await AsyncStorage.getAllKeys();
          const numericKeys = numOfKeys.map(key => parseInt(key)).filter(key => !isNaN(key));
          const now = new Date().setHours(0,0,0,0);
          // handling a future date entry
          if (new Date(ordinaryTaskDay) < now) {
            // nothing happens if the entered date is a past date
            return;
          }
          else if (new Date(ordinaryTaskDay) > now) {
            // real addressing problem is this
            // i will count future tasks and long tasks both 
            //    bcz ultimately the goal will be fullfilled without 
            //    more overheadings
            const nonNumericKeys = numOfKeys.length - numericKeys.length;
            const nextFutureKey = 'f' + nonNumericKeys;

            const valAsJson = JSON.stringify({'task' : task, 'date' : ordinaryTaskDay, 'status' : 1});

            // storing data 
            await AsyncStorage.setItem(`${nextFutureKey}`, valAsJson);
    
            dispatch({
              type: "taskAdded",
              payload: {
                id : nextFutureKey,
                date : ordinaryTaskDay,
                status: 1,
                task
              }
            })

            navigation.navigate("Tasks Stack", {screen : 'future'});
          }
          else {
            // Find the next key
            const nextKey = numericKeys.length ? Math.max(...numericKeys) + 1 : 1;
  
            // finding date
            const today = new Date().toDateString();
            // console.log("inside new ordinary task adding, ")
            // console.log(`hours : ${hours}, minutes : ${minutes}`)
            // const timeInMins = parseInt(hours) * 60 + parseInt(minutes);
            // console.log(typeof(minutes), typeof(hours), typeof(timeInMins))
            const valAsJson = JSON.stringify({'task' : task, 'date' : ordinaryTaskDay, 'status' : 1});
  
            // storing data 
            await AsyncStorage.setItem(`${nextKey}`, valAsJson);
    
            // not working as intended anymore!
            // setTasks(prevTasks => [...prevTasks, { id: nextKey, value: { task, date: today } }]);
            dispatch({
              type: "taskAdded",
              payload: {
                id : nextKey,
                date : ordinaryTaskDay,
                // time : timeInMins,
                status: 1,
                task
              }
            })

            // should navigate to the DisplayTodayTasks screen
            navigation.navigate("Tasks Stack");
          }



        } catch (error) {
          console.error(`Error while getting all keys : ${error}`);
        }

        
      } 

      // Updating a long term task
      else if (longTask != 0 && isAnUpdate != 0) {  
        // if user edits data
        // console.log("updating long term task...");
        // async delete
        (async () => {
          await AsyncStorage.removeItem(String(idOfUpdatingData));
          // storing data
          const toBeStored = {
            longTask : task,
            fromDay : fromDay,
            toDay : toDay,
            status : 1
          };
          const jsonObjLT = JSON.stringify(toBeStored);
          
          await AsyncStorage.setItem(`${idOfUpdatingData}`,jsonObjLT);

          // update redux store
          dispatch({
            type: "longTermTaskEdited",
            payload: {
              id: idOfUpdatingData,
              task: task,
              fromDay : fromDay,
              toDay : toDay
            }
          })

          // stating that the update is over
          dispatch({
            type: "updateFinished"
          })
          console.log('here')

          // navigating to the long tasks screen
          navigation.navigate("Tasks Stack");

        })();
      }

      // Updating a Ordinary Task
      else if (longTask == 0 && isAnUpdate != 0) {
        // console.log("Updating an Ordinary Task");
        
        (async () => {
          //const deletingData = await AsyncStorage.getItem(String(idOfUpdatingData));
          //const deletingDataAsObj = JSON.parse(deletingData);
          //const relevantDay = deletingDataAsObj.date;
          await AsyncStorage.removeItem(String(idOfUpdatingData));
          //const timeInMins = parseInt(hours) * 60 + parseInt(minutes);
          // jsonify val before store
          const jsonObjToStore = JSON.stringify({'task' : task, 'date' : ordinaryTaskDay});
          await AsyncStorage.setItem(String(idOfUpdatingData), jsonObjToStore);

          // updating the redux store
          dispatch({
            type: "taskEdited",
            payload: {
              id : idOfUpdatingData,
              task : task,
              date : ordinaryTaskDay
            }
          })

          // stating the update is over
          dispatch({
            type: "updateFinished"
          })
          
          // should navigate to the DisplayTodayTasks screen or DisplayTasks screen
          let today = new Date().toDateString();
          if (relevantDay == today) {
            navigation.navigate("Tasks Stack");
          } else {
            navigation.navigate("Tasks Stack", {screen : 'TO -Do'});
          }
        })();
      }
        
      /*  longTermTasks.map(async (row) => {
          if (row.id == idOfUpdatingData) {
          // set values from loaded, then make redux store
            
            // row.value.task = task;
            // delete edited field on async storage and set it again
            const deletingData = await AsyncStorage.getItem(String(idOfUpdatingData));
            const deletingDataAsObj = JSON.parse(deletingData);
            const relevantDay = deletingDataAsObj.date;
            await AsyncStorage.removeItem(String(idOfUpdatingData));
            // jsonify val before store
            const jsonObjToStore = JSON.stringify({'task' : task, 'date' : relevantDay});
            await AsyncStorage.setItem(String(idOfUpdatingData), jsonObjToStore);
          }
          */

        // setUpdateMode(0);
        // setIdOfUpdatingData(0);
        setTask('');
        setHours('');
        setMinutes('');
        // newly added
        setFromDay(new Date().toDateString());
        setToDay('- - -');
        setOrdinaryTaskDay(new Date().toDateString())
      }
     
      // console.log("running here")

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.page_topic}>Add Tasks</Text>
        <Text style={styles.texts}>Task Name </Text>
        <TextInput 
          style={styles.typing_bar}
          placeholder='Enter Task Name' 
          value={task}
          onChangeText={(input) => setTask(input)}
        />
        {!enabled ? 
        <>  
          <View style={styles.times}>
            <View style={styles.inputs}>
            <Text style={styles.texts}>Allocated Date </Text>
              {/* <TextInput 
                style={styles.typing_bar_hours}
                placeholder='hours' 
                keyboardType='numeric'
                value={hours}
                onChangeText={(input) => setHours(input)}
              />
              <TextInput 
                style={styles.typing_bar_minutes}
                keyboardType='numeric'
                placeholder='minutes' 
                value={minutes}
                onChangeText={(input) => setMinutes(input)}
              /> */}
            </View>
          </View>
          <Text style={styles.day}>{ordinaryTaskDay}</Text>
            <TouchableOpacity
              style={styles.calender0}
              onPress={() => setShowOrdinaryDayPicker(true)}
            >
              <MaterialCommunityIcons name='calendar-month-outline' size={25} />
          </TouchableOpacity>
          {showOrdinaryDayPicker && (
            <DateTimePicker 
              value={new Date()}
              mode='date'
              onChange={(event,selectedDate) => {
                if(selectedDate)
                  setOrdinaryTaskDay(selectedDate.toDateString())
                setShowOrdinaryDayPicker(false)
              }}
            />
          )}
        </>
        : 
        <>
        
          <Text style={styles.texts}>Allocated Time Period : </Text>
          <View style={styles.days}>
            <Text style={styles.day_bar}>From : </Text>
            <Text style={styles.day}>{fromDay}</Text>
            <TouchableOpacity
              style={styles.calender1}
              onPress={() => setShowDayPicker1(true)}
            >
              <MaterialCommunityIcons name='calendar-month-outline' size={25} />
            </TouchableOpacity>
            <Text style={styles.day_bar}>To : </Text>
            <TouchableOpacity
              style={styles.calender2}
              onPress={() => setShowDayPicker2(true)}
            >
              <MaterialCommunityIcons name='calendar-month-outline' size={25} />
            </TouchableOpacity>
            <Text style={styles.day}>{toDay}</Text>
          </View>
          {showDayPicker1 && (
            <DateTimePicker
              value={new Date()}
              mode='date'
              onChange={(event,selectedDate) => {
                if(selectedDate)
                  setFromDay(selectedDate.toDateString())
                setShowDayPicker1(false)
              }}
            />
          )}
          {showDayPicker2 && (
            <DateTimePicker 
              value={new Date()}
              mode='date'
              onChange={(event,selectedDate) => {
                if(selectedDate)
                  setToDay(selectedDate.toDateString())
                setShowDayPicker2(false)
              }}
            />
          )}
        </>
        }

        <View style={styles.switch}>
          <Text style={[styles.texts, styles.long_term]}>Long Term Work : </Text>
          <Switch 
            value={enabled}
            onValueChange={() => toggleSwitch()}
          />
        </View>

        <Pressable 
          style={[styles.add_button, !task && styles.add_button_disable, task && isPressed && styles.pressed_add_button]}
          hitSlop={5}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          onPress={() => {
              if (!task) null;
              else handleSubmit(task);
          }}
        >
          <Text style={[styles.button_text, isPressed && styles.pressed_button_text]}>+ Add Task</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

export default TaskAddingScreen;

const styles = StyleSheet.create({
  calender0 : {
    padding: 10,
    width: '12%',
    position: 'absolute',
    top: '54.5%',
    left: '85%',
  },
  calender1: {
    padding: 10,
    width: '12%',
    position: 'absolute',
    top: '22%',
    left: '85%'
  },
  calender2: {
    padding: 10,
    width: '12%',
    position: 'absolute',
    left: '85%',
    top: '72%',
    zIndex: 5,
  },
  page_topic: {
    fontSize: 28,
    fontWeight: 600,
    textAlign: 'center',
    padding: 10
  },
  inputs: {

  },
  day: {
    margin: 10,
    marginTop: 5,
    padding: 15,
    backgroundColor: '#ddd',
    height: 50,
    borderRadius: 10,
    fontSize: 15
  },
  day_bar: {
    margin: '10',
    marginLeft: 50,
    fontSize: 15
  },
  long_term: {
    width: '40%'
  },
  switch: {
    flexDirection: 'row',
    width: '100%',
  },
    texts: {
        fontSize: 20,
        margin: 10,
        fontWeight: 550
    },
    add_button : {
        backgroundColor: '#4287f5',
        borderRadius: 10,
        width: '95%',
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 30
    },
    add_button_disable : {
        backgroundColor: '#78879e'
    },
    button_text : {
        color: 'whitesmoke',
        fontSize: 23,
        fontWeight: 500
    },
    pressed_add_button : {
        backgroundColor: '#212121' // Animate using Animated API
    },
    pressed_button_text : {
        color: 'white'
    },
    container : {
        flex: 1,
        //flexDirection: 'column',
        width: '100%',
        backgroundColor: '#fbfbfb',
    },
    typing_bar : {
        borderRadius: 10,
        margin: 10,
        marginTop: 5,
        padding: 15,
        width: '95%',
        height: 50,
        backgroundColor: '#ddd',
        fontSize: 15
    },
    typing_bar_minutes : {
      borderBottomWidth: 1,
      borderRadius: 10,
      margin: 10,
      padding: 10,
      width: '50%',
      height: 40,
    },
    typing_bar_hours : {
      borderBottomWidth: 1,
      borderRadius: 10,
      margin: 10,
      padding: 10,
      width: '50%',
      height: 40,
    },
    times: {
      display: 'flex',
      flexDirection: 'row'
    }
});