import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context';
import DisplayTasks from './components/DisplayTasks';
import ThreeDots from './components/ThreeDots';

const DisplayLongTermTasks = ({navigation}) => {

    const longTasks = useSelector((store) => store.longTermTasks);

  return (

    <SafeAreaView>
        <View style={styles.top_bar}>
            <ThreeDots customName={'See History'} customName2={"Todays' Tasks"} navigation={navigation}/>
        </View>
        <Text style={styles.day}>Long Term Tasks</Text>
        {longTasks.map((item) => {
          // if (!item || !item.value) return null;
          return (
              <DisplayTasks backScreen={'today'} key={item.id} task={item.value.task} id={item.id} status={item.value.status} navigation={navigation}/>
          )
        })}
    </SafeAreaView>
  )                              
}

export default DisplayLongTermTasks

const styles = {
  day: {
    fontWeight: 500,
    fontSize: 20
  },
  top_bar : {
    height: 25,
    display: 'flex',
    alignItems: 'flex-end'
  }
};