import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Picker } from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskStatus = ({navigation, route}) => {

  const {taskExist} = route.params;
  const {taskTime} = route.params;
  const {taskId} = route.params;
  const {taskStatus} = route.params;

  const valOnLoadForSelected = taskStatus ? taskStatus : 1;
  const [selectedValue,setSelectedValue] = useState(valOnLoadForSelected);
  const dispatch = useDispatch();

  // need to update async storage and redux store upon a picker value change
  useEffect(() => {
    // redux store update
    dispatch({
      type: "taskStatusUpdated",
      payload: {
        id : taskId,
        status : selectedValue
      }
    })

    // async storage update
    const updateAsyncStorage = async () => {
      try {
        const currData = await AsyncStorage.getItem(taskId);
        const currDataObj = JSON.parse(currData);
        const updatedData = { ...currDataObj, status: selectedValue };
        const updatedDataJson = JSON.stringify(updatedData);
        await AsyncStorage.setItem(taskId, updatedDataJson);
      } catch (error) {
        console.error("Error updating AsyncStorage:", error);
      }
    };
  
    updateAsyncStorage();

  },[selectedValue]);

  return (
    <SafeAreaView style={styles.status_container}>
      <Text style={[styles.texts, styles.topics]}>Task :</Text>
      <Text style={[styles.texts, styles.task_style]}>{taskExist}</Text>
      <Text style={[styles.texts, styles.topics]}>Time Allocated :</Text>
      <Text style={[styles.texts, styles.task_style]}>{taskTime ? `${Math.floor(taskTime / 60)} hours ${taskTime % 60} minutes` : 'Did not set'}</Text>
      <Text style={[styles.texts, styles.topics, styles.status_style]}>Status :</Text>
      <Picker 
        style={styles.picker}
        selectedValue={selectedValue}
        onValueChange={(val) => setSelectedValue(val)}
      >
        <Picker.Item label='On Going' value={1} />
        <Picker.Item label='Completed' value={2} />
        <Picker.Item label='Failed to Complete' value={3} />
      </Picker>
      <View style={styles.btn_container}>
        <TouchableOpacity 
          style={styles.btn}
          onPress={() => navigation.navigate('To-Do')}
        >
          <Text style={styles.btn_text}>OK</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default TaskStatus

const styles = {
  status_container: {
  },
  picker: {
    width: '75%',
    backgroundColor: '#ddd',
    margin: 5,
    alignSelf: 'center' 
  },
  btn_container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  texts: {
    textAlign: 'center',
    marginTop: '10'
  },
  topics: {
    fontWeight: '600',
    fontSize: 20,
    marginTop: 50
  },
  task_style: {
    fontSize: 20
  },
  status_style: {
    marginTop: 50
  },
  btn: {
    backgroundColor: 'cyan',
    padding: 10,
    width: 55,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: '#ddd',
    margin: 50
  },
  btn_text: {
    textAlign: 'center',
    fontWeight: 600
  }
}