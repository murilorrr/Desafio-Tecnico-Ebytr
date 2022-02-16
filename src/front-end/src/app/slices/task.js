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
      state.allTasks = action.payload;
    },
    deleteTaskAction: (state, action) => {
      state.allTasks.splice(state.allTasks.indexOf(action.payload), 1);
    },
    // updateTask: (state, action) => {
    //   state.allTasks.push();
    // },
    filterTask: (state, action) => {
      state.visualizationTasks = action.payload;
    },
    initVisualization: (state) => {
      state.visualizationTasks = state.allTasks;
    }
  }
});

export const {
  createTaskAction,
  initVisualization,
  getAllTaskAction,
  filterTask,
  deleteTaskAction
} = taskSlice.actions;

export default taskSlice.reducer;
