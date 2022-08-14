import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice';

/**
 * @desc Global Redux Store, Contains reducers of slices
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
