import React from 'react';

import List from './List';
import InputForm from './InputForm';

const TodoApp = () => {
  return (
    <div>
      <div className="main-container">
        <InputForm />

        <List />
      </div>
    </div>
  );
};

export default TodoApp;
