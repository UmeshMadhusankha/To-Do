export default function longTermTasks(state = [],action) {
    switch (action.type) {
        case "longTermTaskAdded":
            return [
                ...state,
                {
                    id : action.payload.id,
                    value : {
                        task : action.payload.task,
                        fromDay : action.payload.fromDay,
                        toDay : action.payload.toDay,
                        status : action.payload.status
                    }
                }
            ]

        case "longTermTaskRemoved":
            return state.filter(row => row.id !== action.payload.id);


        case "longTermTaskEdited":
            return state.map(row => row.id === action.payload.id ? 
                {...row,
                    value: {
                        ...row.value,
                        task: action.payload.task,
                        fromDay : action.payload.fromDay,
                        toDay : action.payload.toDay
                    }
                } : row
            );

        case "longTermTaskStatusUpdated":
            return state.map(row => row.id === action.payload.id ?
                {...row,
                    value: {
                        ...row.value,
                        status: action.payload.status
                    }
                } : row
            );

        case "longTermTasksCleared":
            return [];
            
        default:
            return state;
    }
}