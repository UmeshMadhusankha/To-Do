import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';

const store = configureStore({
    reducer: {
        tasks: reducer
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