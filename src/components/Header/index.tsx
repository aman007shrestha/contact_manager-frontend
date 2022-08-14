import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { HiUserGroup } from 'react-icons/hi';
import { GrContactInfo } from 'react-icons/gr';
import { FaSignOutAlt, FaUserAlt, FaSignInAlt } from 'react-icons/fa';
import { RootState } from 'store/store';
import { AppDispatch } from 'store/store';
import { logout, reset } from 'features/auth/authSlice';
import { Wrapper, Content } from './Header.styles';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const logoutHandler = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };
  return (
    <Wrapper>
      <Content>
        <div className="nav__left">
          <Link to="/" className="nav__link">
            <div className="title">
              <div className="icon">
                <GrContactInfo />
              </div>
              Contacts
            </div>
          </Link>
        </div>
        <div className="nav__right">
          {user ? (
            <>
              <Link to="/users" className="nav__link">
                <HiUserGroup size={17} /> Users
              </Link>
              <Link to="/profile" className="nav__link">
                <FaUserAlt size={14} /> Profile
              </Link>
              <button className="nav__link btn__logout" onClick={logoutHandler}>
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="nav__link">
              <FaSignInAlt /> Login
            </Link>
          )}
        </div>
      </Content>
    </Wrapper>
  );
};

export default Header;
