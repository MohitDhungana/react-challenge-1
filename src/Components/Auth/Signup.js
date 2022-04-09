import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { postData } from '../../utils/httpbaseUtils';
import { setLocalStorage, JWT_TOKEN } from '../../utils/commonUtils';

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
    <>
      <h2>Create New User</h2>
      <div className="login">
        <form onSubmit={handleSubmit}>
          <label>
            <b>Name </b>
          </label>
          <input
            name="name"
            value={signupPayload.name}
            onChange={(e) => {
              handleFormChange(e);
            }}
            type="text"
            placeholder="Name"
          />

          <br />

          <label>
            <b>Email </b>
          </label>
          <input
            name="email"
            value={signupPayload.email}
            onChange={(e) => {
              handleFormChange(e);
            }}
            type="text"
            placeholder="Email"
          />

          <br />

          <label>
            <b>Password </b>
          </label>
          <input
            name="password"
            value={signupPayload.password}
            onChange={handleFormChange}
            type="Password"
            placeholder="Password"
          />

          <br />

          <label>
            <b>Age </b>
          </label>
          <input
            name="age"
            value={signupPayload.age}
            onChange={handleFormChange}
            type="text"
            placeholder="Age"
          />

          <br />
          {signupMutation.isLoading && <div>Loading...</div>}

          {signupMutation.isError && (
            <div className="error-text">
              {signupMutation?.error?.response?.data}
            </div>
          )}

          <input type="submit" value="Create Account" />

          <br />

          <button onClick={() => setShowSignup(false)}>Log in</button>
        </form>
      </div>
    </>
  );
};

export default Signup;
