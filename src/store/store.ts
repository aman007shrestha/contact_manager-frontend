import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice';
import userReducer from 'features/user/userSlice';
import contactReducer from 'features/contact/contactSlice';
import controllerReducer from 'features/controllers/controllerSlice';

/**
 * @desc Global Redux Store, Contains reducers of slices
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    contact: contactReducer,
    controller: controllerReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
