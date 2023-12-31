import { configureStore } from '@reduxjs/toolkit';
import currentWeatherReducer from '../features/home/currentWeatherSlice'
import forecastWeatherReducer from '../features/home/forecastWeatherSlice'
import favoriteReducer from '../features/favorite/favoriteSlice'
const store = configureStore({
    reducer: {
        current: currentWeatherReducer,
        forecast: forecastWeatherReducer,
        favorite: favoriteReducer
    },
});

export default store;
