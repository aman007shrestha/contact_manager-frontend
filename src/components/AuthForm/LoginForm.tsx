import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { RootState } from 'store/store';
import { AppDispatch } from 'store/store';
import { ILoginShowProps, ICredential } from 'components/Interface';
import { login, reset } from 'features/auth/authSlice';
import { Wrapper, Content, FormGroup } from './AuthForm.styles';
import Spinner from '../../components/Spinner';

const initialCredential: ICredential = {
  email: '',
  password: '',
};
/**
 * @desc : Renders login form based on LoginShow state, can be toggled to sign up form based on setLoginShow
 * @param
 * @returns
 */
const LoginForm: React.FC<ILoginShowProps> = ({ setLoginShow }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [credential, setCredential] = useState<ICredential>(initialCredential);
  const { user, isLoading, isError, isSuccess, message } = useSelector((state: RootState) => state.auth);
  // Dispatch Login action
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
      email: credential.email,
      password: credential.password,
    };
    dispatch(login(userData));
  };
  // Update credential state on each input change
  const handleChange = (e: { target: HTMLInputElement }) => {
    setCredential(credential => ({
      ...credential,
      [e.target.name]: e.target.value,
    }));
  };
  // At each new render
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate('/');
      return;
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  // If loading State, Render Spinner object
  if (isLoading) {
    return <Spinner />;
  }
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
