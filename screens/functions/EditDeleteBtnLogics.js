import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

// implementing the delete buttons' logic
export const deleteLogic = async (key,dispatch) => {

  // const dispatch = useDispatch();

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
// export const editLogic = async (key, setTask, setIdOfUpdatingData, setUpdateMode) => {
//     try {
//       const data = await AsyncStorage.getItem(String(key));
//       const valAsObj = JSON.parse(data);
//       setTask(valAsObj.task);
//       // setTask(data);
//       // updateMode = 1;
//       setUpdateMode(1);
//       setIdOfUpdatingData(key);
//     } catch (error) {
//       console.error("Error while loading data to update : ",error);
//     }
// }

export const editLogic = (longTask,idOfUpdatingData,navigation,dispatch) => {

  // const navigation = useNavigation();
  // const dispatch = useDispatch();
  
  // navigate to the tasks adding screen
  dispatch({
    type: "updateTask",
    payload: {
        longTask : longTask,
        idOfUpdatingData : idOfUpdatingData
    }
  });

  navigation.navigate("Add Tasks");
}