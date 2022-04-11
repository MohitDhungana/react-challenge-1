import React from 'react';

import List from './List';
import InputForm from './InputForm';

import './style.css';

const TodoApp = (props) => {
  const { handleSignout } = props;

  return (
    <div>
      <div className="nav-bar">
        <button
          className="ml-auto btn"
          //  style={{ float: 'left' }}
          onClick={handleSignout}
        >
          Sign Out
        </button>
      </div>

      <div className="main-container">
        <InputForm />

        <List />
      </div>
    </div>
  );
};

export default TodoApp;
