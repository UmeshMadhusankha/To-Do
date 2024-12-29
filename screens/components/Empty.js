import { View, Text } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Empty = () => {
  return (
    <View>
        <MaterialCommunityIcons name='note-off-outline' size={125} style={styles.vector}/>
        <Text style={styles.text}>Empty</Text>
    </View>
  )
}

export default Empty

const styles = {
    vector: {
        color: "rgba(0,0,0,0.2)",
        textAlign: 'center',
        padding: 25,
        marginTop: 75
    },
    text: {
        color: "rgba(0,0,0,0.5)",
        fontSize: 25,
        textAlign: 'center'
    }
}