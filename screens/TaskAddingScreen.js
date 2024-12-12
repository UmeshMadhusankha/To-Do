import { useState } from 'react';
import { StyleSheet, Text, TextInput, Pressable, Button, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSharedState } from '../hooks/useSharedState';
import { useDispatch,useSelector } from 'react-redux'

const TaskAddingScreen = () => {
  
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
    
    const handleSubmit = async (task) => {
      
      // handling submit for a new data entry
      if (updateMode == 0) {
        // setting a key explicitly
        try {
          const numOfKeys = await AsyncStorage.getAllKeys(); 
          const numericKeys = numOfKeys.map(key => parseInt(key)).filter(key => !isNaN(key));
  
          // Find the next key
          const nextKey = numericKeys.length ? Math.max(...numericKeys) + 1 : 1;

          // finding date
          const today = new Date().toDateString();
          const timeInMins = parseInt(hours) * 60 + parseInt(minutes);
          const valAsJson = JSON.stringify({'task' : task, 'date' : today, 'time' : timeInMins});

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
      <Text style={styles.texts}>Allocated Time : </Text>
      <View style={styles.times}>
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
        marginTop: 25
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
      width: '30%',
      height: 40,
    },
    typing_bar_hours : {
      borderBottomWidth: 1,
      borderRadius: 10,
      margin: 10,
      padding: 10,
      width: '30%',
      height: 40,
    },
    times: {
      display: 'flex',
      flexDirection: 'row'
    }
});