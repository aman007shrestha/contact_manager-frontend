import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AppDispatch } from 'store/store';
import { RootState } from 'store/store';
import { ICredential, ILoginShowProps } from 'components/Interface';
import { register, reset } from 'features/auth/authSlice';
import { Wrapper, Content, FormGroup } from './AuthForm.styles';

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
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading, isError, isSuccess, message } = useSelector((state: RootState) => state.auth);
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
    const userData = {
      email: credential.email,
      password: credential.password,
    };
    // dispatch action here
    dispatch(register(userData));
  };
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      toast.success('User Registered, Proceed login');
      setLoginShow(true);
      navigate('/login');
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

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
