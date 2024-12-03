import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

const DisplayTasks = ({id, task}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{task}</Text>
      <View style={styles.button_container}>
        <DeleteButton style={styles.del} id={id}/>
        <EditButton style={styles.edit} id={id}/>
      </View>
    </View>
  )
}

export default DisplayTasks;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#D4F6FF",
        padding: 10,
        flexDirection: 'row',
        marginBottom: 5,
        borderRadius: 10
    },
    button_container: {
        height: 'inherit',
        width: '28%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 0
    },
    text : {
        padding: 10,
        width: '72%',
        marginRight: 2
    },
    del : {
        marginRight: 5
    },
    edit : {
        marginRight: 5
    }
});