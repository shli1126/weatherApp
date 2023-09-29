import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    savedCities: []
};

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        addCity: (state, action) => {
            const [newLat, newLon] = action.payload;
            //check for duplicate city, if already added, don't add again
            const checkExist = state.savedCities.some(([lat, lon]) => lat === newLat && lon === newLon);
            if (!checkExist) {
                state.savedCities.push(action.payload);
            } else {
                alert('City is already in favorites');
            }
        },
    },

});

export const {addCity} = favoriteSlice.actions;
export default favoriteSlice.reducer;
