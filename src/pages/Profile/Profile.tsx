import React, { useEffect } from 'react';
import Spinner from 'components/Spinner';
import { RootState } from 'store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getSelf, reset } from 'features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from 'store/store';
import ProfileForm from 'components/ProfileForm/ProfileForm';
import ProfileCard from 'components/ProfileCard/ProfileCard';
import { isAlreadyRegistered, isUnRegistered } from '../../features/controllers/controllerSlice';
import { Wrapper } from './Profile.styles';

/**
 * @desc Handles logic to dispatch is the user is already registered -> used to make post req to user info else Put,
 * shows Profile Card if registered, Show Update profile Form
 * @returns
 */
const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { users, isLoading, isError, message } = useSelector((state: RootState) => state.user);
  // If user present to profile dispatch isALreadyRegistered
  if (users.length > 0) {
    dispatch(isAlreadyRegistered());
  } else {
    dispatch(isUnRegistered());
  }

  // Run on each render
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(getSelf());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  // Show loading spinner if loading to true
  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  // Profile Card and Update Card
  return (
    <Wrapper>
      {users.length > 0 ? (
        <div>
          {users.map(user => (
            <ProfileCard data={user} />
          ))}
        </div>
      ) : (
        <>
          <h2 className="update">Update your form</h2>
        </>
      )}
      <ProfileForm />
    </Wrapper>
  );
};

export default Profile;
