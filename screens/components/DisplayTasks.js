import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import { useSelector } from 'react-redux';

const DisplayTasks = ({id, task, time, status, backScreen, navigation, fromDay, toDay, isLong}) => {

  const tasks = useSelector((state) => state.tasks);
  const longTasks = useSelector((state) => state.longTermTasks);
  
  let thisTask = tasks.find((row) => row.id === id);

  if(thisTask == null) {
    thisTask = longTasks.find((row) => row.id == id);
  }

  const thisTaskStatus = thisTask.value.status;
  const relevantStyle = 'container' + thisTaskStatus;

  //console.log('DisplayTasks :' ,backScreen)

  return (
    <View style={[styles.container, styles[relevantStyle]]}>
      <TouchableOpacity 
        style={{width: '72%'}}
        onPress={() => navigation.navigate('Status', {taskExist : task, taskTime : time, taskId : id, taskStatus : status, backScreen : backScreen, fromDay : fromDay, toDay : toDay})}
      >
        <Text style={styles.text}>{task}</Text>
      </TouchableOpacity>
      <View style={styles.button_container}>
        <DeleteButton style={styles.del} id={id}/>
        <EditButton style={styles.edit} id={id} isLong={isLong}/>
      </View>
    </View>
  )
}

export default DisplayTasks;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#D4F6FF",
        padding: 8,
        flexDirection: 'row',
        marginBottom: 3,
        borderRadius: 10
    },
    container1: {backgroundColor: "rgba(0, 255, 255, 0.1)"},
    container2 : {backgroundColor: "rgba(0, 255, 0, 0.3)"},
    container3: {backgroundColor: "rgba(255, 0, 0, 0.3)"},
    button_container: {
        height: 'inherit',
        width: '28%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 0,
    },
    text : {
        padding: 10,
        width: '72%',
        marginRight: 2,
    },
    del : {
        marginRight: 0
    },
    edit : {
        marginRight: 5
    }
});