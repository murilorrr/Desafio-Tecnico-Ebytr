import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './slices/task';

export const store = configureStore({
  reducer: {
    task: taskReducer
  }
});
