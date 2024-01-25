import { createSlice } from '@reduxjs/toolkit';

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    weatherData: null,
    loading: false,
  },
  reducers: {
    setWeatherData: (state, action) => {
      state.weatherData = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setWeatherData, setLoading } = weatherSlice.actions;
export const selectWeatherData = (state) => state.weather.weatherData;
export const selectLoading = (state) => state.weather.loading;

export default weatherSlice.reducer;
