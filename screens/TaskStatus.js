import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Picker } from '@react-native-picker/picker';

const TaskStatus = ({navigation, route}) => {

  const {taskExist} = route.params;

  return (
    <SafeAreaView style={styles.status_container}>
      <Text style={[styles.texts, styles.topics]}>Task :</Text>
      <Text style={[styles.texts, styles.task_style]}>{taskExist}</Text>
      <Text style={[styles.texts, styles.topics, styles.status_style]}>Status :</Text>
      <Picker style={styles.picker}>
        <Picker.Item label='On Going' value={null} />
        <Picker.Item label='Completed' value={true} />
        <Picker.Item label='Failed to Complete' value={false} />
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
    fontSize: 20
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