import { createContext } from 'react';

const TodoContext = createContext();

export const TodoProvider = ({ value, children }) => {
  return (
    <TodoContext.Provider
      value={{
        ...value,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
