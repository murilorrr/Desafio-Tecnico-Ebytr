import { createSlice } from '@reduxjs/toolkit';

export const taskSlice = createSlice({
  name: 'task',
  initialState: {
    visualizationTasks: [],
    allTasks: []
  },
  reducers: {
    createTaskAction: (state, action) => {
      state.allTasks.push(action.payload);
    },
    getAllTaskAction: (state, action) => {
      action.payload.forEach((task) => {
        delete task.userId;
      });
      state.allTasks = action.payload;
    },
    filterTask: (state, action) => {
      state.visualizationTasks = action.payload;
    },
    initVisualization: (state) => {
      state.visualizationTasks = state.allTasks;
    }
  }
});

export const { createTaskAction, initVisualization, getAllTaskAction, filterTask } =
  taskSlice.actions;

export default taskSlice.reducer;
