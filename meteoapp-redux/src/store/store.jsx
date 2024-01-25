import { configureStore } from '@reduxjs/toolkit';
import weatherSlice from '../reducers/weatherReducer';
import mainSlice from '../reducers/mainReducer';
import chartSlice from '../reducers/chartReducer';
import nextDaysSlice from '../reducers/nextDaysReducer';


const store = configureStore({
  reducer: {
    weather: weatherSlice,
    main: mainSlice,
    chart: chartSlice,
    nextDays: nextDaysSlice,
    
  },
  
});

export default store;
