import React, { useState } from 'react';
import { Wrapper, Content, FormGroup } from './AuthForm.styles';
import { toast } from 'react-toastify';
import { ICredential, ILoginShowProps } from 'components/Interface';
import { useDispatch } from 'react-redux';

const initialCredential = {
  email: '',
  password: '',
  confirmPassword: '',
};

/**
 *
 * @param setShow switches between login form and register form
 * @returns view for sign up, dispatched register action
 */
const RegisterForm: React.FC<ILoginShowProps> = ({ setLoginShow }) => {
  const [credential, setCredential] = useState<ICredential>(initialCredential);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (credential.password !== credential.confirmPassword) {
      setCredential(credential => ({
        ...credential,
        password: '',
        confirmPassword: '',
      }));
      toast.warning('Passwords dont match');
      return;
    }
    if (credential.password.length <= 5) {
      setCredential(credential => ({
        ...credential,
        password: '',
        confirmPassword: '',
      }));
      toast.warning('Password too weak');
      return;
    }
    // dispatch action here
    toast.success('User Registered, Proceed login');
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
        <h2>Sign Up</h2>
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
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={credential.confirmPassword}
              placeholder="Confirm password"
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <button type="submit" className="btn btn-block primary__button">
              Sign Up
            </button>
          </FormGroup>
          <hr className="form__divider" />
        </form>
        <p>
          Already User?
          <button type="submit" className="btn btn-block secondary__button" onClick={() => setLoginShow(true)}>
            Login
          </button>
        </p>
      </Content>
    </Wrapper>
  );
};
export default RegisterForm;
