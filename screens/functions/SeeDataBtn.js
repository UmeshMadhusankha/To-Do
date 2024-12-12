import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from 'react-redux';

// see data in async and tasks
export const seeStoredData = async (tasks) => {

    try {
      // Fetch all keys from AsyncStorage
      const allKeys = await AsyncStorage.getAllKeys();
      const allData = await AsyncStorage.multiGet(allKeys);
  
      // Log each key-value pair from AsyncStorage
      console.log("Stored Data in AsyncStorage:");
      allData.forEach(([key, values]) => {
        const obj = JSON.parse(values);
          console.log(`Key: ${key}, toDoTask: ${obj.task}, date: ${obj.date}, time: ${obj.time}`);
      });
  
      // Log the current tasks state
      console.log("Current tasks state:");
      console.log(tasks);
    } catch (error) {
      console.error("Error retrieving data from AsyncStorage:", error);
    }
  };