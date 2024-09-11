import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiUrl } from '../../apiUtils';
import { getCookie } from '../utils/cookieUtils';

const token = getCookie('authToken');

const initialState = {
    status: 'idle',
    error: null,
};
export const addClothes = createAsyncThunk(
    'clothes/addClothes',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(apiUrl('api/cloths/add-cloths'), formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const allAddedClothList = createAsyncThunk(
    'clothes/fetchAllClothes',
    async (_, { rejectWithValue }) => {
        try {
            const token = getCookie('authToken');
            const response = await axios.get(apiUrl('api/cloths/all-cloths'), {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data.cloths;
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
            })

            // Handle fetching clothes
            .addCase(allAddedClothList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(allAddedClothList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.clothes = action.payload;
            })
            .addCase(allAddedClothList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});
export default addClothesSlice.reducer;
