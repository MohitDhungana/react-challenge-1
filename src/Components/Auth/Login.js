import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { postData } from '../../utils/httpbaseUtils';
import { JWT_TOKEN, setLocalStorage } from '../../utils/commonUtils';

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
    <>
      <h2>Login</h2>
      <div className="login">
        <form onSubmit={handleSubmit}>
          <label>
            <b>Email </b>
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />

          <br />

          <label>
            <b>Password </b>
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="Password"
            placeholder="Password"
          />

          <br />

          {signInMutation.isLoading && <div>Loading...</div>}

          {signInMutation.isError && (
            <div className="error-text">
              {signInMutation?.error?.response?.data}
            </div>
          )}

          <input type="submit" value="Log In" />
          <br />

          <button onClick={() => setShowSignup(true)}>Sign up</button>
        </form>
      </div>
    </>
  );
};

export default Login;
