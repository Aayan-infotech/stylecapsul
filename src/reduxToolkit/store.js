import { configureStore } from '@reduxjs/toolkit';
import userSignUpReducer from './signUpSlice';
import userLoginReducer from './loginSlice';
import basicProfileReducer from './createBasicProfile';
import addClothesReducer from './addClothesSlice';

export const store = configureStore({
  reducer: {
    signup: userSignUpReducer,
    login: userLoginReducer,
    basicProfile: basicProfileReducer,
    clothes: addClothesReducer
  },
});
