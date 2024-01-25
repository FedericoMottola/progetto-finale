import { createSlice } from '@reduxjs/toolkit';

const nextDaysSlice = createSlice({
  name: 'nextDays',
  initialState: {
    weatherData: null,
  },
  reducers: {
    setWeatherData: (state, action) => {
      state.weatherData = action.payload;
    },
  },
});

export const { setWeatherData } = nextDaysSlice.actions;
export const selectWeatherDataNextDays = (state) => state.nextDays.weatherData;

export default nextDaysSlice.reducer;
