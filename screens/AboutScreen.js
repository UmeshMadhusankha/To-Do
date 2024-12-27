import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ThreeDots from './components/ThreeDots'

const AboutScreen = ({navigation}) => {

    const dynamicStyle = navigation.canGoBack() ? 
      {justifyContent : 'space-between'} : {justifyContent : 'flex-end'};

  return (
    <SafeAreaView>
      <View style={[styles.top_bar,dynamicStyle]}>
          {navigation.canGoBack() && 
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.back}>Back</Text>
            </TouchableOpacity>
          }
          <ThreeDots customName={'See History'} customName2={"Long Term Tasks"} customName3={"About"} navigation={navigation}/>
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