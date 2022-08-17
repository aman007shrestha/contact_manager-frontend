import * as authService from './authService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IUserData } from './interface';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user') as string);

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

/**
 * @desc create async reducer which calls service action for login
 */
export const login = createAsyncThunk('auth/login', async (user: IUserData, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

/**
 * @desc create async reducer which calls service action for register
 */
export const register = createAsyncThunk('auth/register', async (user: IUserData, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

/**
 * @desc create async reducer which calls service action for logout
 */
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

// Create slices for reducer states
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: state => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: builder => {
    // Builder cases: Rejected, Fulfilled, Pending
    builder
      // Login Builder state
      .addCase(login.pending, state => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.data;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      })
      // Logout Builder state
      .addCase(logout.fulfilled, state => {
        state.user = null;
      })
      .addCase(register.pending, state => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      // Register Builder state
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = action.payload as string;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
