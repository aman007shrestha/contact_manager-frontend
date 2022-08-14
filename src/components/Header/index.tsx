import React from 'react';
import { Link } from 'react-router-dom';
import { Wrapper, Content } from './Header.styles';
import { GrContactInfo } from 'react-icons/gr';

const index = () => {
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
          <Link to="/users" className="nav__link">
            Users
          </Link>
          <Link to="/profile" className="nav__link">
            Profile
          </Link>
          <Link to="/login" className="nav__link">
            Logout
          </Link>
        </div>
      </Content>
    </Wrapper>
  );
};

export default index;
