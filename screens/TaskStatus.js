import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const TaskStatus = ({navigation}) => {
  return (
    <SafeAreaView>
      <TouchableOpacity 
        style={styles.btn}
        onPress={() => navigation.navigate('To-Do')}
      >
        <Text style={styles.btn_text}>Ok</Text>
      </TouchableOpacity>
      <Text>TaskStatus</Text>
    </SafeAreaView>
  )
}

export default TaskStatus

const styles = {
  btn: {
    backgroundColor: 'cyan',
    padding: 10,
    width: 55,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: '#ddd'
  },
  btn_text: {
    textAlign: 'center',
    fontWeight: 600
  }
}