import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    stateFilter: '',
    titleFilter: '',
    bodyFilter: ''
  },
  reducers: {
    stateFilterAction: (state, action) => {
      state.stateFilter = action.payload;
    },
    titleFilterAction: (state, action) => {
      state.titleFilter = action.payload;
    },
    bodyFilterAction: (state, action) => {
      state.bodyFilter = action.payload;
    }
  }
});

export const { stateFilterAction, titleFilterAction, bodyFilterAction } = filterSlice.actions;

export default filterSlice.reducer;
