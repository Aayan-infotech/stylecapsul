import { configureStore } from '@reduxjs/toolkit';
import userSignUpReducer from './signUpSlice';
import userLoginReducer from './loginSlice';
import basicProfileReducer from './createBasicProfile';

export const store = configureStore({
  reducer: {
    signup: userSignUpReducer,
    login: userLoginReducer,
    basicProfile: basicProfileReducer,
  },
});
