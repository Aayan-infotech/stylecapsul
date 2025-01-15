import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiUrl } from '../../apiUtils';
import { getCookie } from '../utils/cookieUtils';

// Fetch token from cookies
const token = getCookie('authToken');

const initialState = {
    addresses: [],
    status: 'idle',
    error: null
};

export const fetchAddresses = createAsyncThunk('addresses/fetchAddresses', async () => {
    const token = getCookie('authToken');
    const response = await axios.get(apiUrl('api/address/all-address', {}, {
        withCredentials: true,
    }), {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return response.data;
});

export const addAddress = createAsyncThunk('addresses/addAddress', async (newAddress) => {
    const token = getCookie('authToken');
    const response = await axios.post(apiUrl('api/address/add-address'), newAddress, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return response.data;
});

export const deleteAddress = createAsyncThunk('addresses/deleteAddress', async (id) => {
    await axios.delete(apiUrl(`api/address/delete-address/${id}`), {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return id;
});

export const updateAddress = createAsyncThunk('addresses/updateAddress', async ({ id, updatedAddress }) => {
    const response = await axios.put(apiUrl(`api/address/update-address/${id}`), updatedAddress, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return response.data;
});

const addressSlice = createSlice({
    name: 'addresses',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAddresses.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAddresses.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log(action.payload, 'action.payload')
                state.addresses = action.payload.addresses;
            })
            .addCase(fetchAddresses.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addAddress.fulfilled, (state, action) => {
                state.addresses.push(action.payload);
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.addresses = state.addresses.filter(address => address._id !== action.payload);
            })
            .addCase(updateAddress.fulfilled, (state, action) => {
                const index = state.addresses.findIndex(address => address._id === action.payload._id);
                if (index !== -1) {
                    state.addresses[index] = action.payload;
                }
            });
    }
});

export default addressSlice.reducer;
