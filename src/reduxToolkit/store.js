import { configureStore } from '@reduxjs/toolkit';
import userSignUpReducer from './signUpSlice';
import userLoginReducer from './loginSlice';
import basicProfileReducer from './basiceditprofile';
import addClothesReducer from './addClothesSlice';
import profileReducer from './profileSlice';
import changePasswordReducer from './changePasswordSlice';

export const store = configureStore({
  reducer: {
    signup: userSignUpReducer,
    login: userLoginReducer,
    basicProfile: basicProfileReducer,
    clothes: addClothesReducer,
    profile: profileReducer,
    changePassword: changePasswordReducer
  },
});
