import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiUrl } from '../../apiUtils';

export const loginUser = createAsyncThunk('login/user', async (formData, thunkAPI) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.post(apiUrl('api/auth/login'), formData, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(response)
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
const loginSlice = createSlice({
    name: 'login',
    initialState: { user: null, status: 'idle', error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.status = 'loading';
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user = action.payload;
        }).addCase(loginUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
    },
});
export default loginSlice.reducer;
