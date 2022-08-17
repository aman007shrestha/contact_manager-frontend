import React, { useEffect } from 'react';
import CardsContainer from 'components/Cards/CardsContainer';
import { getUsers, reset } from 'features/user/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'store/store';
import { AppDispatch } from 'store/store';
import { Spinner } from 'components/Spinner/Spinner.style';
import { Wrapper } from './UserList.styles';

/**
 * @desc is users in redux state show cards of user else a display message
 * @returns
 */
const UsersList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { users, isLoading, isError, message } = useSelector((state: RootState) => state.user);

  // Run at each render
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(getUsers());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  // Loader if isLoading
  if (isLoading) {
    return <Spinner />;
  }

  // User-list or Message
  return (
    <Wrapper>
      {users.length > 0 ? (
        <div>
          <div className="userlist__info">These are public profile. You can add them to your contact.</div>
          <CardsContainer data={users} page={'USER'} action="USER" />
        </div>
      ) : (
        <div className="message">No users Has shared information</div>
      )}
    </Wrapper>
  );
};

export default UsersList;
