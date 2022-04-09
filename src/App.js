import './App.css';
import { useState } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';

import { QueryClient, QueryClientProvider } from 'react-query';

import TodoApp from './Components/Todo/TodoApp';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';

import { TodoProvider } from './Context';

import {
  clearLocalStorage,
  isAuthenticated,
  JWT_TOKEN,
} from './utils/commonUtils';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const [showSignup, setShowSignup] = useState(false);

  const [authenticated, setAuthenticated] = useState(false);

  const handleSignout = () => {
    clearLocalStorage(JWT_TOKEN);
    setAuthenticated(false);
    window.location.reload();
  };

  return (
    <div className="App">
      <TodoProvider
        value={{
          queryClient,
        }}
      >
        <QueryClientProvider client={queryClient}>
          {isAuthenticated() || authenticated ? (
            <TodoApp handleSignout={handleSignout} />
          ) : showSignup ? (
            <Signup
              setShowSignup={setShowSignup}
              setAuthenticated={setAuthenticated}
            />
          ) : (
            <Login
              setShowSignup={setShowSignup}
              setAuthenticated={setAuthenticated}
            />
          )}
          <ReactQueryDevtools initialIsOpen={false} position="top-right" />
        </QueryClientProvider>
      </TodoProvider>
    </div>
  );
}

export default App;
