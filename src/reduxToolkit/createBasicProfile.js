import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiUrl } from '../../apiUtils';
import { useSelector } from 'react-redux';

export const createBasic = createAsyncThunk(
    'profile/createBasic',
    async ({ userId, profileData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(apiUrl(`api/user/update-user/${userId}`), profileData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);



const basicProfileSlice = createSlice({
    name: 'basicProfile',
    initialState: {
        data: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createBasic.pending, (state) => {
            state.status = 'loading';
        }).addCase(createBasic.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        }).addCase(createBasic.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
    },
});

export default basicProfileSlice.reducer;