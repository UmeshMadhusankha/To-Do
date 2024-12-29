// let lastId = 0;

export default function reducer(state=[],action) {
    const today = new Date().toDateString();

    switch (action.type) {
        case "taskAdded":
            return [
                ...state,
                {
                    id : action.payload.id,
                    value : {
                        task : action.payload.task,
                        date : action.payload.date, 
                        // time : action.payload.time,
                        status : action.payload.status
                    }
                }
            ];
            
        case "taskRemoved":
            return state.filter(row => row.id !== action.payload.id);

        case "taskEdited":
            return state.map(row => row.id === action.payload.id ? 
                {...row,
                    value: {
                        ...row.value,
                        task: action.payload.task,
                        // time: action.payload.time
                        date: action.payload.date
                    }
                } : row
            );

        case "taskStatusUpdated":
            return state.map(row => row.id === action.payload.id ?
                {...row,
                    value: {
                        ...row.value,
                        status: action.payload.status
                    }
                } : row
            );

        case "tasksCleared":
            return [];
            
        default:
            return state;
    }
}