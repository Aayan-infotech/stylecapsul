import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiUrl } from '../../apiUtils';

const initialState = {
    status: 'idle',
    error: null,
};
export const addClothes = createAsyncThunk('clothes/addClothes', async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://3.111.163.2:3000/api/stylist/add-stylist', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
}
);
// Create the slice
const addClothesSlice = createSlice({
    name: 'clothes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addClothes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addClothes.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(addClothes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default addClothesSlice.reducer;
