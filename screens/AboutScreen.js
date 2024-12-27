import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ThreeDots from './components/ThreeDots'

const AboutScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <View style={styles.top_bar}>
        <ThreeDots customName={"Todays' Tasks"} customName2={"Long Term Tasks"} customName3={"See History"} navigation={navigation}/>
      </View>
      <Text style={styles.about_topics}>Released Version:</Text>
      <Text style={styles.about_text}>v 1.0.0</Text>
    </SafeAreaView>
  )
}

export default AboutScreen

const styles = {
    about_topics : {
        textAlign : 'center',
        fontSize : 25,
        padding: 10
    },
    about_text : {
        textAlign : 'center',
        fontSize : 15,
    },
    top_bar : {
        height: 25,
        display: 'flex',
        alignItems: 'flex-end'
    }
}