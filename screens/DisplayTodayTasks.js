import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context';
import DisplayTasks from './components/DisplayTasks';

const DisplayTodayTasks = () => {

    const tasks = useSelector((store) => store.tasks);
    const today = new Date().toDateString();
    const todayTasks = tasks.filter((row) => row.values.date == today);

  return (
    <SafeAreaView>
        <Text style={styles.day}>{currRenderingDate}</Text>
        {todayTasks.map((item) => {
            return (
                <DisplayTasks key={item.id} task={item.value.task} time={item.value.time} id={item.id} status={item.value.status} navigation={navigation}/>
            )
        })}
    </SafeAreaView>
  )
}

export default DisplayTodayTasks