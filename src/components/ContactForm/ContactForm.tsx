import React, { useState } from 'react';
import { Wrapper, Content, FormGroup } from './ContactForm.styles';
import { IFormData, ISerializedFormData } from './interface';
import { RootState } from 'store/store';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'store/store';
import { setContact, updateContact } from 'features/contact/contactSlice';
import {
  toggleContactIsUpdating,
  toggleContactForm,
  toggleContactIsAdding,
} from '../../features/controllers/controllerSlice';
import { toast } from 'react-toastify';

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
type AppProp = {
  data?: IFormData;
};

/**
 * @desc contactform add or update based on states on controllerSLice
 * @param param0
 * @returns
 */
const ContactForm = ({ data = initialCredential }: AppProp) => {
  const dispatch = useDispatch<AppDispatch>();
  const { contactUpdateIsActive, formData } = useSelector((state: RootState) => state.controller);
  if (contactUpdateIsActive) {
    data = formData;
  }
  const { contact_id, name, contacts, email, image } = data;
  const { main, home, office } = contacts;
  const serializedData = { contact_id, name, email, main, home, office, image };
  const [contactData, setContactData] = useState<ISerializedFormData>(serializedData);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);

  // Handle state change upon input change
  const handleChange = (e: { target: HTMLInputElement }) => {
    setContactData(formData => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  // handle Submit : Check if to update or add
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Structure the data
    if (contactData.main.length < 5 || contactData.main.length > 15) {
      toast.error('Numbers must be between 5 and 15');
      return;
    }

    let structuredData = {
      name: contactData.name,
      email: contactData.email,
      contacts: {
        main: contactData.main,
        home: contactData.home,
        office: contactData.office,
      },
      image: imagePreview ? (imagePreview as string) : contactData.image,
    };
    if (contactUpdateIsActive) {
      structuredData = { ...structuredData, contact_id: contactData.contact_id };
      dispatch(updateContact(structuredData));
      dispatch(toggleContactIsUpdating());
      toast.info('Update Success');
    } else {
      dispatch(setContact(structuredData));
      dispatch(toggleContactIsAdding());
      toast.success('Add Success');
    }
    dispatch(toggleContactForm());
  };

  // File input handler
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    previewFile(file);
  };
  // Preview chosen image
  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setImagePreview(reader.result);
  };

  return (
    <Wrapper>
      <Content>
        <h2>{contactUpdateIsActive ? <>Update</> : <>Add</>} Contact</h2>
        <form action="" className="contact__form" onSubmit={handleSubmit}>
          <div className="form__left">
            <FormGroup>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={contactData.name}
                placeholder="Enter your name"
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                value={contactData.email}
                placeholder="Enter your email"
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="contacts">Contacts:</label>
              <div className="group__input">
                <input
                  type="string"
                  id="contacts"
                  name="main"
                  value={contactData.main}
                  placeholder="Phone Number"
                  onChange={handleChange}
                  required
                />
                <input
                  type="string"
                  id="contacts"
                  name="home"
                  value={contactData.home}
                  placeholder="Home Number"
                  onChange={handleChange}
                />
                <input
                  type="string"
                  id="contacts"
                  name="office"
                  value={contactData.office}
                  placeholder="Office Number"
                  onChange={handleChange}
                />
              </div>
            </FormGroup>
            <button type="submit" className="btn btn--dark">
              {contactUpdateIsActive ? <>Update Contact</> : <>Add Contact</>}
            </button>
          </div>
          <div className="form__right">
            <div className="img-container">
              <img src={imagePreview as string} alt="" className="img__preview" />
            </div>
            <input type="file" className="file__upload" id="image" name="image" onChange={handleFileInput} />
          </div>
        </form>
      </Content>
    </Wrapper>
  );
};

export default ContactForm;
