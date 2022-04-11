import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { postData } from '../../utils/httpbaseUtils';
import { JWT_TOKEN, setLocalStorage } from '../../utils/commonUtils';

import './authStyle.css';

import Loader from '../Common/Loader';

const Login = (props) => {
  const { setShowSignup, setAuthenticated } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signInMutation = useMutation(
    (newTodo) => {
      return postData('user/login', newTodo);
    },
    {
      onSuccess: (data, variables, context) => {
        setAuthenticated(true);
        setLocalStorage(JWT_TOKEN, data?.data?.token);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    signInMutation.mutate({ email, password });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Login To Your Account</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            className="auth-input"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />

          <input
            className="auth-input"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="Password"
            placeholder="Password"
          />

          {signInMutation.isLoading && <Loader />}

          {signInMutation.isError && (
            <div className="error-text">
              {signInMutation?.error?.response?.data}
            </div>
          )}

          <input className="btn block-btn" type="submit" value="LOGIN" />

          <span className="auth-account" onClick={() => setShowSignup(true)}>
            Create an account
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
