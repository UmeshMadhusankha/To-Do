// when edit button clicked, we can navigate to the task adding page
// but before navigating, inside that same function we need to call this redux slice
// then navigate
// check whether this is a update or not
// if an update, check whether this is a long task update or not
// pass the id of updating data
// according to relevent update task type, load relevent data from redux slices
// then set them using setters inside task adding screen
// update redux store and async storage
// set the variable we use to identify is update or not to normal and end 

// store,
// initial -> {
//              isAnUpdate : 0,
//              longTask : 0,
//              idOfUpdatingData : 0
//             }

/*
actions
{
    type: "updateTask"
    payload: {
        longTask : (set according to which task is needed to update)
        idOfUpdatingData : (same as above)
    }

    type: "updateFinished"
    payload: {
        isAnUpdate : 0
    }
}
*/

/* 
inside the reducer 
case "updateTask":
    return {
        isAnUpdate : 1,
        longTask : payload.longTask,
        idOfUpdatingData : payload.idOfUpdatingData
    }

case "updateFinished":
    return {
        isAnUpdate : 0,
        longTask : 0,
        idOfUpdatingData : 0
    }
*/

// each time in the tasks adding screen, we will have to check the
// stores' variable value of isAnUpdate