import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { GlobalStyle } from 'GlobalStyle';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Home from 'pages/Home/Home';
import AuthPage from 'pages/AuthPage/';
import Profile from 'pages/Profile/Profile';
import UsersList from 'pages/Users/UsersList';
import Header from './components/Header';

/**
 * @desc The root App components wraps redux store, contains Header and Routings
 * @returns
 */
function App() {
  return (
    <>
      <Provider store={store}>
        <ToastContainer />
        <GlobalStyle />
        <Router>
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/users" element={<UsersList />}></Route>
              <Route path="/login" element={<AuthPage />}></Route>
              <Route path="*" element={<h1>404 NOT FOUND</h1>} />
            </Routes>
          </div>
        </Router>
      </Provider>
    </>
  );
}

export default App;
