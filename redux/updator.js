initialState = {
    isAnUpdate : 0,
    longTask : 0,
    idOfUpdatingData : 0
};

export default function updator(state=initialState,action) {
    switch (action.type) {
        case "updateTask":
            return {
                isAnUpdate: 1,
                longTask: action.payload.longTask,
                idOfUpdatingData: action.payload.idOfUpdatingData
            };
        case "updateFinished":
            return {
                isAnUpdate: 0,
                longTask: 0,
                idOfUpdatingData: 0
            };
        default:
            return state;
    }
};