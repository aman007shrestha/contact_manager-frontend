import React, { useState } from 'react';
import RegisterForm from 'components/AuthForm/RegisterForm';
import LoginForm from 'components/AuthForm/LoginForm';
import { Wrapper, Content } from './AuthPage.styles';

/**
 * @desc Login/Register Page loginShow state handles the visibility of form
 * @returns
 */
const AuthPage = () => {
  const [loginShow, setLoginShow] = useState(true);
  // Render Intro And Form
  return (
    <Wrapper>
      <Content>
        <div className="intro">Contact Manager</div>
        <div className="sub-intro">Manage your contact from anywhere.</div>
        {loginShow && <LoginForm setLoginShow={setLoginShow} />}
        {!loginShow && <RegisterForm setLoginShow={setLoginShow} />}
      </Content>
    </Wrapper>
  );
};

export default AuthPage;
