import AsyncStorage from "@react-native-async-storage/async-storage";

// clear history button logic
export const clearStorage = async (dispatch) => {

    try {
      await AsyncStorage.clear();
      dispatch({
        type: "tasksCleared"
      })
      dispatch({
        type: "longTermTasksCleared"
      })
      // setTasks([]); // Clear the tasks from the state as well
      console.log("AsyncStorage cleared successfully!");
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
    }
};