import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiUrl } from '../../apiUtils';
import { getCookie } from '../utils/cookieUtils';

export const userChangePassword = createAsyncThunk(
  'changePassword/userChangePassword',
  async (formData, { rejectWithValue }) => {
    try {
      const token = getCookie('authToken');
      if (!token) {
        return rejectWithValue('No authentication token found');
      }
      const response = await axios.put(
        apiUrl(`api/auth/change-password/${formData.userId}`),
        {
          old_password: formData.oldPassword,
          new_password: formData.newPassword,
          new_confirm_password: formData.newConfirmPassword
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);


const changePasswordSlice = createSlice({
  name: 'changePassword',
  initialState: {
    isLoading: false,
    error: null,
    success: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userChangePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userChangePassword.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(userChangePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export default changePasswordSlice.reducer;
