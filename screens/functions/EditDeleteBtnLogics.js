import AsyncStorage from '@react-native-async-storage/async-storage';

// implementing the delete buttons' logic
export const deleteLogic = async (key,dispatch) => {

    try {
      await AsyncStorage.removeItem(String(key));
      
      // updating the logic to meet the requirement for deleting long tasks as well
      if (!isNaN(parseInt(key))) {
        dispatch({
          type: "taskRemoved",
          payload: {
            id: key
          }
        })
      }
      else {
        dispatch({
          type: "longTermTaskRemoved",
          payload: {
            id: key
          }
        })
      }
      /*
      setTasks(
        tasks.filter((item) => item.id != key)
      );
      */
    } catch (error) {
      console.error("Error while deleting : ",error);
    }
};

// implementing the edit buttons' logic
export const editLogic = async (key, setTask, setIdOfUpdatingData, setUpdateMode) => {
    try {
      const data = await AsyncStorage.getItem(String(key));
      const valAsObj = JSON.parse(data);
      setTask(valAsObj.task);
      // setTask(data);
      // updateMode = 1;
      setUpdateMode(1);
      setIdOfUpdatingData(key);
    } catch (error) {
      console.error("Error while loading data to update : ",error);
    }
}