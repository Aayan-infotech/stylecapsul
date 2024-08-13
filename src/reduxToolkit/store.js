import { configureStore } from '@reduxjs/toolkit';
import userSignUpReducer from './signUpSlice';

export const store = configureStore({
  reducer: {
    signup: userSignUpReducer,
  },
});
