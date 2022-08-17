import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as userService from './userService';
import { RootState } from 'store/store';
import { IUserInfo } from './interface';

interface IStateInterface {
  users: IUserInfo[] | [];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}
const initialState: IStateInterface = {
  users: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};
// get users
export const getUsers = createAsyncThunk('user/get', async (_, thunkAPI) => {
  try {
    const globalState = thunkAPI.getState() as RootState;
    const token = globalState.auth.user.accessToken;
    return await userService.getUsers(token);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// get self
export const getSelf = createAsyncThunk('user/get/self', async (_, thunkAPI) => {
  try {
    const globalState = thunkAPI.getState() as RootState;
    const token = globalState.auth.user.accessToken;
    return await userService.getSelf(token);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// set contact
export const setUserInfo = createAsyncThunk('user/set', async (profileData: IUserInfo, thunkAPI) => {
  try {
    const globalState = thunkAPI.getState() as RootState;
    const token = globalState.auth.user.accessToken;
    return await userService.setInfo(profileData, token);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// update user
export const updateUserInfo = createAsyncThunk('user/update', async (profileData: IUserInfo, thunkAPI) => {
  try {
    const globalState = thunkAPI.getState() as RootState;
    const token = globalState.auth.user.accessToken;
    return await userService.updateContact(profileData, token);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// set contact
export const addToContact = createAsyncThunk('user/add', async (userInfoId: number, thunkAPI) => {
  try {
    const globalState = thunkAPI.getState() as RootState;
    const token = globalState.auth.user.accessToken;
    return await userService.addToContact(userInfoId, token);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: state => initialState,
  },
  extraReducers: builder => {
    builder
      // Get users
      .addCase(getUsers.pending, state => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload.data;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // Get self
      .addCase(getSelf.pending, state => {
        state.isLoading = true;
      })
      .addCase(getSelf.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload.data;
      })
      .addCase(getSelf.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // Set info
      .addCase(setUserInfo.pending, state => {
        state.isLoading = true;
      })
      .addCase(setUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload.data;
      })
      .addCase(setUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // update
      .addCase(updateUserInfo.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload.data;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // Add to contact
      .addCase(addToContact.pending, state => {
        state.isLoading = true;
      })
      .addCase(addToContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addToContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
