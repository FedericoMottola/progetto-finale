import { createSlice } from '@reduxjs/toolkit';

const chartSlice = createSlice({
  name: 'chart',
  initialState: {
    weatherData: null,
  },
  reducers: {
    setWeatherData: (state, action) => {
      state.weatherData = action.payload;
    },
  },
});

export const { setWeatherData } = chartSlice.actions;
export const selectWeatherDataChart = (state) => state.chart.weatherData;

export default chartSlice.reducer;
