import React from 'react';

import List from './List';
import InputForm from './InputForm';

import Navbar from './Navbar';

const TodoApp = (props) => {
  const { handleSignout } = props;

  return (
    <div>
      <Navbar handleSignout={handleSignout} />

      <div className="main-container">
        <InputForm />

        <List />
      </div>
    </div>
  );
};

export default TodoApp;
