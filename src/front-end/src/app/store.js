import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './slices/task';

const store = configureStore({
  reducer: {
    task: taskReducer
  }
});

export default store;
