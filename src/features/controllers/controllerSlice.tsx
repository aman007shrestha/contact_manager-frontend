import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

interface IDataPayload {
  contact_id?: number;
  name: string;
  email: string;
  contacts: {
    main?: string;
    home?: string;
    office?: string;
  };
  image?: string;
}

interface IController {
  formData: IDataPayload;
  showContactForm: boolean;
  contactAddIsActive: boolean;
  contactUpdateIsActive: boolean;
  registered: boolean;
}

const initialCredential = {
  name: '',
  contacts: {
    main: '',
    home: '',
    office: '',
  },
  email: '',
  image: '',
};
const initialState = {
  formData: initialCredential,
  showContactForm: false,
  contactAddIsActive: false,
  contactUpdateIsActive: false,
  registered: false,
};
// Slice to control different states of the App
const controllerSlice = createSlice({
  name: 'controller',
  initialState: initialState,
  reducers: {
    // Show Contact Form State
    toggleContactForm: (state: IController) => {
      state.showContactForm = !state.showContactForm;
    },
    // Reset all state
    resetController: state => initialState,
    openContactForm: (state: IController) => {
      state.showContactForm = true;
    },
    // Close action for a contact form
    closeContactForm: (state: IController) => {
      state.showContactForm = true;
    },
    // Toggle state for contact is adding
    toggleContactIsAdding: (state: IController) => {
      state.contactAddIsActive = !state.contactAddIsActive;
    },
    // Toggle state for contact is updating
    toggleContactIsUpdating: (state: IController) => {
      state.contactUpdateIsActive = !state.contactUpdateIsActive;
    },
    // Set Update contact form
    setUpdateFormData: (state: IController, action: PayloadAction<IDataPayload>) => {
      state.formData = action.payload;
    },
    // Reset Update contact form
    resetFormData: (state: IController) => {
      state.formData = initialCredential;
    },
    // Set isRegistered state
    isAlreadyRegistered: (state: IController) => {
      state.registered = true;
    },
    // unSet isRegistered state
    isUnRegistered: (state: IController) => {
      state.registered = false;
    },
  },
});

export const {
  toggleContactForm,
  openContactForm,
  closeContactForm,
  resetController,
  toggleContactIsAdding,
  toggleContactIsUpdating,
  setUpdateFormData,
  resetFormData,
  isAlreadyRegistered,
  isUnRegistered,
} = controllerSlice.actions;
export default controllerSlice.reducer;
