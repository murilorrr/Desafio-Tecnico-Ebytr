import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './slices/task';
import filterReducer from './slices/filter';

const store = configureStore({
  reducer: {
    task: taskReducer,
    filters: filterReducer
  }
});

export default store;
