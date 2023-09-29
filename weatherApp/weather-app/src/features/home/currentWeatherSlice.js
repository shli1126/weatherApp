import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    city: "", temperature: "", humidity: "", wind: "", condition: "", lad: "", lon: ""
};

export const getCurrentWeatherItem = createAsyncThunk('home/getCurrentWeatherItem', async (url, thunkAPI) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {

        throw error;
    }
});
const currentWeatherSlice = createSlice({
    name: 'current', initialState, reducers: {
        setCity: (state, action) => {
            state.city = action.payload;
        }, setTemperature: (state, action) => {
            state.temperature = action.payload;
        }, setHumidity: (state, action) => {
            state.humidity = action.payload;
        }, setWind: (state, action) => {
            state.wind = action.payload;
        }, setCondition: (state, action) => {
            state.condition = action.payload;
        }, setLat: (state, action) => {
            state.condition = action.payload;
        },
    }, extraReducers: (builder) => {
        builder
            .addCase(getCurrentWeatherItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCurrentWeatherItem.fulfilled, (state, action) => {

                state.isLoading = false;
                state.city = action.payload.name;
                state.temperature = action.payload.main.temp;
                state.humidity = action.payload.main.humidity;
                state.wind = action.payload.wind.speed;
                state.condition = action.payload.weather[0].description;
                state.lat = action.payload.coord.lat
                state.lon = action.payload.coord.lon
            })
            .addCase(getCurrentWeatherItem.rejected, (state, action) => {
                console.log(action);
                state.isLoading = false;
            });
    },
});

export default currentWeatherSlice.reducer;


