import React, { useState } from 'react';
import { Wrapper, Content, FormGroup } from './AuthForm.styles';
import { ILoginShowProps, ICredential } from 'components/Interface';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { login } from 'features/auth/authSlice';
import { AppDispatch } from 'store/store';

const initialCredential: ICredential = {
  email: '',
  password: '',
};
const LoginForm: React.FC<ILoginShowProps> = ({ setLoginShow }) => {
  const [credential, setCredential] = useState<ICredential>(initialCredential);
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(credential);
    const userData = {
      email: credential.email,
      password: credential.password,
    };
    dispatch(login(userData));
  };
  const handleChange = (e: { target: HTMLInputElement }) => {
    setCredential(credential => ({
      ...credential,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <Wrapper>
      <Content>
        <h2>Login</h2>
        <form action="" onSubmit={handleSubmit}>
          <FormGroup>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={credential.email}
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={credential.password}
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <button type="submit" className="btn btn-block primary__button">
              Login
            </button>
          </FormGroup>
          <hr className="form__divider" />
        </form>
        <p>
          Need an account?
          <button type="submit" className="btn btn-block secondary__button" onClick={() => setLoginShow(false)}>
            Sign up
          </button>
        </p>
      </Content>
    </Wrapper>
  );
};
export default LoginForm;
