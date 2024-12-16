import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, Pressable, Button, View, Switch, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSharedState } from '../hooks/useSharedState';
import { useDispatch,useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';

const TaskAddingScreen = ({navigation}) => {
  
  const dispatch = useDispatch();

  const {
    /*tasks,
    setTasks,*/
    task,
    setTask,
    updateMode,
    setUpdateMode,
    idOfUpdatingData,
    setIdOfUpdatingData
  } = useSharedState();

    const tasks = useSelector((state) => state.tasks);
    
    const [isPressed,setIsPressed] = useState(false);
    const [hours,setHours] = useState('');
    const [minutes,setMinutes] = useState('');
    const [enabled,setEnabled] = useState(false);
    const [fromDay,setFromDay] = useState(new Date().toDateString());
    const [toDay,setToDay] = useState('- - -');
    const [showDayPicker1,setShowDayPicker1] = useState(false);
    const [showDayPicker2,setShowDayPicker2] = useState(false);

    useEffect(() => {setShowDayPicker1(false)},[]);

    const toggleSwitch = () => setEnabled(!enabled);
    
    const handleSubmit = async (task) => {

      const numOfKeys = await AsyncStorage.getAllKeys(); 
      const numericKeys = numOfKeys.map(key => parseInt(key)).filter(key => !isNaN(key));

      // if a long term  work is entered,
      if (enabled) {
        const numOfExisitingLTTasks = numOfKeys - numericKeys;
        const nextLTTKey = "L" + (numOfExisitingLTTasks + 1);

        // storing data

        const toBeStored = {
          longTask : task,
          fromDay,
          toDay
        };
        const jsonObjLT = JSON.stringify(toBeStored);

        try {
          await AsyncStorage.setItem(nextLTTKey,jsonObjLT);
        } catch (error) {
          console.error("Long Term Task Related Error : ",error);
        }
      }
      
      // handling submit for a new data entry
      if (updateMode == 0) {
        // setting a key explicitly
        try {
  
          // Find the next key
          const nextKey = numericKeys.length ? Math.max(...numericKeys) + 1 : 1;

          // finding date
          const today = new Date().toDateString();
          const timeInMins = parseInt(hours) * 60 + parseInt(minutes);
          const valAsJson = JSON.stringify({'task' : task, 'date' : today, 'time' : timeInMins, 'status' : 1});

          // storing data 
          await AsyncStorage.setItem(`${nextKey}`, valAsJson);
  
          // not working as intended anymore!
          // setTasks(prevTasks => [...prevTasks, { id: nextKey, value: { task, date: today } }]);
          dispatch({
            type: "taskAdded",
            payload: {
              id : nextKey,
              date : today,
              time : timeInMins,
              task
            }
          })

        } catch (error) {
          console.error(`Error while getting all keys : ${error}`);
        }

        // should navigate to the DisplayTodayTasks screen
        navigation.navigate("Tasks Stack");
        
      } 
      else {  // if user edits data
        console.log("updating...")
        tasks.map(async (row) => {
          if (row.id == idOfUpdatingData) {
            row.value.task = task;
            // delete edited field on async storage and set it again
            const deletingData = await AsyncStorage.getItem(String(idOfUpdatingData));
            const deletingDataAsObj = JSON.parse(deletingData);
            const relevantDay = deletingDataAsObj.date;
            await AsyncStorage.removeItem(String(idOfUpdatingData));
            // jsonify val before store
            const jsonObjToStore = JSON.stringify({'task' : task, 'date' : relevantDay});
            await AsyncStorage.setItem(String(idOfUpdatingData), jsonObjToStore);
          }
        });
        setUpdateMode(0);
        setIdOfUpdatingData(0);
      }
      setTask('');
      setHours('');
      setMinutes('');
    } 

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.texts}>Add a Task : </Text>
      <TextInput 
        style={styles.typing_bar}
        placeholder='Add a task' 
        value={task}
        onChangeText={(input) => setTask(input)}
      />
      <View style={styles.switch}>
        <Text style={[styles.texts, styles.long_term]}>Long Term Work : </Text>
        <Switch 
          value={enabled}
          onValueChange={() => toggleSwitch()}
        />
      </View>
      {!enabled ? 
       <>  
        <View style={styles.times}>
          <View style={styles.inputs}>
          <Text style={styles.texts}>Allocated Time : </Text>
            <TextInput 
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
            />
          </View>
        </View>
      </>
      : 
      <>
      
        <Text style={styles.texts}>Allocated Time Period : </Text>
        <View style={styles.days}>
          <TouchableOpacity
            onPress={() => setShowDayPicker1(true)}
          >
            <Text style={styles.day_bar}>From : </Text>
          </TouchableOpacity>
          <Text style={styles.day}>{fromDay}</Text>
          <TouchableOpacity
            onPress={() => setShowDayPicker2(true)}
          >
            <Text style={styles.day_bar}>To : </Text>
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
        <Text style={[styles.button_text, isPressed && styles.pressed_button_text]}>Add</Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default TaskAddingScreen;

const styles = StyleSheet.create({
  inputs: {

  },
  day: {
    margin: 20
  },
  day_bar: {
    margin: '10'
  },
  long_term: {
    width: '40%'
  },
  switch: {
    flexDirection: 'row',
    width: '100%',
  },
    texts: {
        fontSize: 18,
        margin: 10
    },
    add_button : {
        backgroundColor: '#000',
        borderRadius: 10,
        width: '25%',
        height: 40,
        // position: 'relative',
        // top: -50,
        // left: '85%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 30
    },
    add_button_disable : {
        backgroundColor: 'grey'
    },
    button_text : {
        color: 'whitesmoke',
        fontSize: 25,
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
        borderBottomWidth: 1,
        borderRadius: 10,
        margin: 10,
        padding: 10,
        width: '95%',
        height: 40,
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