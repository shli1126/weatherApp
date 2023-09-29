import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    forecast: []
};

export const getForecastItem = createAsyncThunk('home/getForecastItem', async (url, thunkAPI) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw error;
    }
});
const forecastWeatherSlice = createSlice({
    name: 'forecast', initialState, reducers: {
        setForecast: (state, action) => {
            state.forecast = action.payload;
        },
    }, extraReducers: (builder) => {
        builder
            .addCase(getForecastItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getForecastItem.fulfilled, (state, action) => {
                // console.log(action);
                state.isLoading = false;
                state.forecast = action.payload.list
            })
            .addCase(getForecastItem.rejected, (state, action) => {
                console.log(action);
                state.isLoading = false;
            });
    },
});

export default forecastWeatherSlice.reducer;
