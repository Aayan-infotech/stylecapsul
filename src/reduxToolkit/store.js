import { configureStore } from '@reduxjs/toolkit';
import userSignUpReducer from './signUpSlice';
import userLoginReducer from './loginSlice';

export const store = configureStore({
  reducer: {
    signup: userSignUpReducer,
    login: userLoginReducer
  },
});
