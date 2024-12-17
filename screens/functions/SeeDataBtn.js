import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from 'react-redux';

// see data in async and tasks
export const seeStoredData = async (tasks,longTasks) => {

    try {
      // Fetch all keys from AsyncStorage
      const allKeys = await AsyncStorage.getAllKeys();
      const allData = await AsyncStorage.multiGet(allKeys);
  
      // Log each key-value pair from AsyncStorage
      console.log("Stored Data in AsyncStorage:");
      allData.forEach(([key, values]) => {
        const obj = JSON.parse(values);

        // console.log("obj in see data async : ",obj);
        // updating the logic to display long tasks too
        if (!isNaN(parseInt(key)))
          console.log(`Key: ${key}, toDoTask: ${obj.task}, date: ${obj.date}, time: ${obj.time}`);
        else
          console.log(`LongKey : ${key}, toDoTask: ${obj.longTask}, fromDay: ${obj.fromDay}, toDay: ${obj.toDay}`);
      });
  
      // Log the current tasks state
      console.log("Current tasks state:");
      //if (!isNaN(parseInt(key))) {
        console.log("Ordinary Tasks :")
        console.log(tasks);
      //}
      //else {
        console.log("Long Term Tasks :")
        console.log(longTasks);
      //}
        
    } catch (error) {
      console.error("Error retrieving data from AsyncStorage:", error);
    }
  };