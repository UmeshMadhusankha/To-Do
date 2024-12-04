import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DisplayTasksScreen from './DisplayTasksScreen';
import TaskStatus from './TaskStatus';

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
        </Stack.Navigator>
  )
}

export default DisplayTasksStack