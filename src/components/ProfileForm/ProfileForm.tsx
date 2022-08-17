import React, { useState } from 'react';
import { Wrapper, Content, FormGroup } from './ProfileForm.styles';
import { RootState } from 'store/store';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'store/store';
import { IUserInfo } from 'features/user/interface';
import { ISerializedFormData } from './interface';
import { setUserInfo, updateUserInfo } from 'features/user/userSlice';
import { toast } from 'react-toastify';

const initialCredential: IUserInfo = {
  user_info_id: 0,
  name: '',
  contacts: {
    main: '',
    home: '',
    office: '',
  },
  email: '',
  image: '',
  share: 0,
};

/**
 * @desc Handle Add profile for new User, Update profile for Registered User
 * @returns
 */
const ProfileForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  let data = initialCredential;
  let { users } = useSelector((state: RootState) => state.user);
  let { registered } = useSelector((state: RootState) => state.controller);

  const { existingUser } = useSelector((state: RootState) => state.auth.user);
  let { name, contacts, email, image, share } = data;
  const { main, home, office } = contacts;
  email = existingUser.email;
  const serializedData = { name, email, main, home, office, image, share };
  const [profileData, setProfileData] = useState<ISerializedFormData>(serializedData);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  // Initial Check condition
  if (share === 1) {
    setIsChecked(true);
  }
  //  Handle CheckBox
  const handleCheck = () => {
    setIsChecked(prev => !prev);
  };

  // Handle File Input
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    previewFile(file);
  };

  // Preview file for chosen image
  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setImagePreview(reader.result);
  };

  // Handle change for input
  const handleChange = (e: { target: HTMLInputElement }) => {
    setProfileData(formData => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle submit, Add if new, update if old user
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Structure the data
    let structuredData = {
      user_info_id: users[0] ? users[0].user_info_id : undefined,
      name: profileData.name,
      email: profileData.email,
      contacts: {
        main: profileData.main,
        home: profileData.home,
        office: profileData.office,
      },
      image: imagePreview ? (imagePreview as string) : profileData.image,
      share: isChecked ? 1 : 0,
    };
    if (!registered) {
      // POST
      dispatch(setUserInfo(structuredData));
      toast.success('Info Added');
    } else {
      // update
      dispatch(updateUserInfo(structuredData));
      toast.info('Info Updated');
    }
  };

  return (
    <Wrapper>
      <Content>
        <h2>Profile Update</h2>
        <form action="" className="contact__form" onSubmit={handleSubmit}>
          <div className="form__left">
            <FormGroup>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={profileData.name}
                placeholder="Enter your name"
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="email">Email:</label>
              <input type="text" id="email" name="email" value={profileData.email} disabled required />
            </FormGroup>
            <FormGroup>
              <label htmlFor="contacts">Contacts:</label>
              <div className="group__input">
                <input
                  type="string"
                  id="contacts"
                  name="main"
                  value={profileData.main}
                  placeholder="Phone Number"
                  onChange={handleChange}
                  required
                />
                <input
                  type="string"
                  id="contacts"
                  name="home"
                  value={profileData.home}
                  placeholder="Home Number"
                  onChange={handleChange}
                />
                <input
                  type="string"
                  id="contacts"
                  name="office"
                  value={profileData.office}
                  placeholder="Office Number"
                  onChange={handleChange}
                />
              </div>
            </FormGroup>
            <FormGroup>
              <label htmlFor="public">Public Profile:</label>
              <div className="input__checkbox">
                <input
                  type="checkbox"
                  id="public"
                  className="check-box"
                  name="public"
                  defaultChecked={isChecked}
                  onChange={handleCheck}
                />
              </div>
            </FormGroup>
            <button type="submit" className="btn btn--dark">
              {registered ? 'Update ' : 'Register '}
              Profile
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
export default ProfileForm;
