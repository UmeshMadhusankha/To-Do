import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

const DisplayTasks = ({id, task, navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={{width: '72%'}}
        onPress={() => navigation.navigate('Status')}
      >
        <Text style={styles.text}>{task}</Text>
      </TouchableOpacity>
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
        padding: 8,
        flexDirection: 'row',
        marginBottom: 3,
        borderRadius: 10
    },
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
        backgroundColor: 'blue'
    },
    del : {
        marginRight: 0
    },
    edit : {
        marginRight: 5
    }
});