import React from 'react';

import List from './List';
import InputForm from './InputForm';

const TodoApp = (props) => {
  const { handleSignout } = props;

  return (
    <div>
      <button style={{ float: 'left' }} onClick={handleSignout}>
        Sign Out
      </button>
      <section>
        <h4>Your assignment</h4>
        <p>You cannot use any library to do this task</p>
        <p>A todo item should not be empty</p>
        <p>A todo item cannot contain word: "Postpone" in any format</p>
        <ul className="assignment-tasks">
          <li>Allow users to add an item in to do list</li>
          <li>Allow users to remove an individual item in to do list</li>
          <li>
            Separate todoitems listing component into a different component
          </li>
          <li>Bonus points if you can use Context to implement it</li>
        </ul>
      </section>

      <InputForm />

      <List />
    </div>
  );
};

export default TodoApp;
