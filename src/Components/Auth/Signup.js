import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { getData, postData, putData } from '../../utils/httpUtil';
import {
  setLocalStorage,
  JWT_TOKEN,
  getLocalStorage,
} from '../../utils/commonUtils';

import Loader from '../Common/Loader';

const Signup = (props) => {
  const {
    setShowSignup,
    setAuthenticated,
    showProfileEdit,
    hideProfileEditComponent,
  } = props;

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

  const fetchUserByTokenQuery = useQuery(
    'fetchUserById',
    () => getData('user/me'),
    {
      enabled: !!getLocalStorage(JWT_TOKEN),

      onSuccess: (data, variables, context) => {
        setSignupPayload({
          name: data?.data?.name,
          email: data?.data?.email,
          age: data?.data?.age,
        });
      },
    }
  );

  const updateProfileMutation = useMutation(
    (data) => {
      return putData('user/me', data);
    },
    {
      onSuccess: (data, variables, context) => {
        hideProfileEditComponent();
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (showProfileEdit) {
      updateProfileMutation.mutate(signupPayload);
    } else {
      signupMutation.mutate(signupPayload);
    }
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
        <h2 className="auth-title">
          {showProfileEdit ? 'Update User' : 'Create New User'}
        </h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            disabled={showProfileEdit}
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
            disabled={showProfileEdit}
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

          {!showProfileEdit && (
            <input
              disabled={showProfileEdit}
              className="auth-input"
              autoComplete="off"
              name="password"
              value={signupPayload.password}
              onChange={handleFormChange}
              type="Password"
              placeholder="Password"
            />
          )}

          <input
            className="auth-input"
            autoComplete="off"
            name="age"
            value={signupPayload.age}
            onChange={handleFormChange}
            type="text"
            placeholder="Age"
          />

          {(signupMutation.isLoading ||
            fetchUserByTokenQuery?.isFetching ||
            updateProfileMutation.isLoading) && <Loader />}

          {signupMutation.isError && (
            <div className="error-text">
              {signupMutation?.error?.response?.data}
            </div>
          )}
          {updateProfileMutation.isError && (
            <div className="error-text">
              {updateProfileMutation?.error?.response?.data}
            </div>
          )}

          <input
            className="btn block-btn"
            type="submit"
            value={showProfileEdit ? 'Save' : 'Create Account'}
          />

          {showProfileEdit ? (
            <p className="auth-account" onClick={hideProfileEditComponent}>
              Go Back
            </p>
          ) : (
            <p className="auth-account" onClick={() => setShowSignup(false)}>
              Already have an account? <span>Log in</span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signup;
