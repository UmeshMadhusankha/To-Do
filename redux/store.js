import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';
import longTermTasks from './longTermTasks';
import updator from './updator';

const store = configureStore({
    reducer: {
        tasks: reducer,
        longTermTasks: longTermTasks,
        updator: updator
    }
})

export default store;

/*
[
    {
        id: nextKey, value: { task, date: today }
    },
    {
        id: nextKey, value: { task, date: today }
    },
    {
        id: nextKey, value: { task, date: today }
    },
    ...
]
*/