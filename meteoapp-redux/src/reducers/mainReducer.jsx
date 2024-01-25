import { createSlice } from '@reduxjs/toolkit';

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    currentDateTime: { timestamp: Date.now() },
    search: '',
  },
  reducers: {
    setCurrentDateTime: (state, action) => {
      state.currentDateTime.timestamp = action.payload.timestamp;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setCurrentDateTime, setSearch } = mainSlice.actions;
export const selectCurrentDateTime = (state) => state.main.currentDateTime.timestamp;
export const selectSearch = (state) => state.main.search;

export default mainSlice.reducer; // Aggiungi `.reducer` qui

