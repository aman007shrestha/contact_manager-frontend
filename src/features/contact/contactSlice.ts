import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IContact, IFavourite } from './interface';
import { RootState } from 'store/store';
import * as contactServices from './contactService';

interface IState {
  contacts: IContact[] | [];
  favourite: IContact[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: IState = {
  contacts: [],
  favourite: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

/**
 * @desc create async reducer which calls service action for get contacts
 */
export const getContacts = createAsyncThunk('contact/get', async (_, thunkAPI) => {
  try {
    const globalState = thunkAPI.getState() as RootState;
    const token = globalState.auth.user.accessToken;
    return await contactServices.getContacts(token);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

/**
 * @desc create async reducer which calls service action for get all favourites
 */
export const getFavourites = createAsyncThunk('contact/fav', async (_, thunkAPI) => {
  try {
    const globalState = thunkAPI.getState() as RootState;
    const token = globalState.auth.user.accessToken;
    return await contactServices.getFavourites(token);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

/**
 * @desc create async reducer which calls service action for set contact for existing user
 */
export const setContact = createAsyncThunk('contact/set', async (contactData: IContact, thunkAPI) => {
  try {
    const globalState = thunkAPI.getState() as RootState;
    const token = globalState.auth.user.accessToken;
    return await contactServices.setContact(contactData, token);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

/**
 * @desc create async reducer which calls service action to update existing contact for existing user
 */
export const updateContact = createAsyncThunk('contact/update', async (contactData: IContact, thunkAPI) => {
  try {
    const globalState = thunkAPI.getState() as RootState;
    const token = globalState.auth.user.accessToken;
    return await contactServices.updateContact(contactData, token);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

/**
 * @desc create async reducer which calls service action to delete existing contact for existing user
 */
export const deleteContact = createAsyncThunk('contact/delete', async (contactId: number, thunkAPI) => {
  try {
    const globalState = thunkAPI.getState() as RootState;
    const token = globalState.auth.user.accessToken;
    return await contactServices.deleteContact(contactId, token);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

/**
 * @desc create async reducer which calls service action to favourite existing contact for existing user
 */
export const setFavourite = createAsyncThunk('contact/fav/set', async (contactId: number, thunkAPI) => {
  try {
    const globalState = thunkAPI.getState() as RootState;
    const token = globalState.auth.user.accessToken;
    return await contactServices.setFavourite(contactId, token);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

/**
 * @desc create async reducer which calls service action to unfavourite existing contact for existing user
 */
export const unsetFavourite = createAsyncThunk('contact/fav/unset', async (contactId: number, thunkAPI) => {
  try {
    const globalState = thunkAPI.getState() as RootState;
    const token = globalState.auth.user.accessToken;
    return await contactServices.unsetFavourite(contactId, token);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Create slices for reducer states
export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    reset: state => initialState,
  },
  extraReducers: builder => {
    // Builder cases: Rejected, Fulfilled, Pending
    builder
      // Get All Contacts Builder State
      .addCase(getContacts.pending, state => {
        state.isLoading = true;
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contacts = action.payload.data;
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // Set a contact Builder state
      .addCase(setContact.pending, state => {
        state.isLoading = true;
      })
      .addCase(setContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contacts = [...state.contacts, ...action.payload.data];
      })
      .addCase(setContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      //  delete existing contact builder state
      .addCase(deleteContact.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contacts = state.contacts.filter(contact => contact.contact_id !== action.payload.data.contact_id);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // Update existing contact builder state
      .addCase(updateContact.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const remainingContact = state.contacts.filter(contact => {
          return contact.contact_id !== action.payload.data[0].contact_id;
        });
        state.contacts = [...remainingContact, ...action.payload.data];
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // Get Favourites builder state
      .addCase(getFavourites.pending, state => {
        state.isLoading = true;
      })
      .addCase(getFavourites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        let result = action.payload.data.map((favourite_object: IFavourite) => favourite_object.contact_id);
        state.contacts.forEach(contact => {
          if (result.includes(contact.contact_id)) {
            contact.isFavourite = true;
          } else {
            contact.isFavourite = false;
          }
        });
        state.favourite = result;
      })
      .addCase(getFavourites.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // Set Favourites builder state
      .addCase(setFavourite.pending, state => {
        // state.isLoading = true;
      })
      .addCase(setFavourite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contacts.filter(contact => {
          if (contact.contact_id === action.payload) {
            contact.isFavourite = true;
          }
          return contact;
        });
      })
      .addCase(setFavourite.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // Unset Favourites builder state
      .addCase(unsetFavourite.pending, state => {
        // state.isLoading = true;
      })
      .addCase(unsetFavourite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contacts.filter(contact => {
          if (contact.contact_id === action.payload) {
            contact.isFavourite = false;
          }
          return contact;
        });
      })
      .addCase(unsetFavourite.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});
export const { reset } = contactSlice.actions;
export default contactSlice.reducer;
