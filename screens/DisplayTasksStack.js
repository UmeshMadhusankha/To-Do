import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DisplayTasksScreen from './DisplayTasksScreen';
import TaskStatus from './TaskStatus';
import DisplayTodayTasks from './DisplayTodayTasks';

function DisplayTasksStack() {

    const Stack = createNativeStackNavigator();

  return (
        <Stack.Navigator
            screenOptions={{
                headerShown:false,
            }}
        >
            <Stack.Screen name='To-Do' component={DisplayTasksScreen}/>
            <Stack.Screen name='Status' component={TaskStatus}/>
            <Stack.Screen name='today' component={DisplayTodayTasks}/>
        </Stack.Navigator>
  )
}

export default DisplayTasksStack