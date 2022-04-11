import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { postData } from '../../utils/httpbaseUtils';
import { setLocalStorage, JWT_TOKEN } from '../../utils/commonUtils';

import Loader from '../Common/Loader';

const Signup = (props) => {
  const { setShowSignup, setAuthenticated } = props;
  const [signupPayload, setSignupPayload] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
  });

  const signupMutation = useMutation(
    (data) => {
      return postData('user/register', data);
    },
    {
      onSuccess: (data, variables, context) => {
        setLocalStorage(JWT_TOKEN, data?.data?.token);
        setAuthenticated(true);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    signupMutation.mutate(signupPayload);
  };

  const handleFormChange = (e) => {
    setSignupPayload({
      ...signupPayload,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create New User</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            className="auth-input"
            autoComplete="off"
            name="name"
            value={signupPayload.name}
            onChange={(e) => {
              handleFormChange(e);
            }}
            type="text"
            placeholder="Name"
          />

          <input
            className="auth-input"
            autoComplete="off"
            name="email"
            value={signupPayload.email}
            onChange={(e) => {
              handleFormChange(e);
            }}
            type="text"
            placeholder="Email"
          />

          <input
            className="auth-input"
            autoComplete="off"
            name="password"
            value={signupPayload.password}
            onChange={handleFormChange}
            type="Password"
            placeholder="Password"
          />

          <input
            className="auth-input"
            autoComplete="off"
            name="age"
            value={signupPayload.age}
            onChange={handleFormChange}
            type="text"
            placeholder="Age"
          />

          {signupMutation.isLoading && <Loader />}

          {signupMutation.isError && (
            <div className="error-text">
              {signupMutation?.error?.response?.data}
            </div>
          )}

          <input
            className="btn block-btn"
            type="submit"
            value="Create Account"
          />

          <p className="auth-account" onClick={() => setShowSignup(false)}>
            Already have an account? <span>Log in</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
