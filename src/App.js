import './App.css';
import './styles/variables.css';
import './styles/core.css';

import { useState } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';

import { QueryClient, QueryClientProvider } from 'react-query';

import Layout from './Components/Layout';

import TodoApp from './Components/Todo';
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
  const [showProfileEdit, setShowProfileEdit] = useState(false);

  const [authenticated, setAuthenticated] = useState(false);

  const showProfileEditComponent = () => {
    setShowSignup(false);
    setShowProfileEdit(true);
  };

  const hideProfileEditComponent = () => {
    setShowSignup(false);
    setShowProfileEdit(false);
  };

  const handleSignout = () => {
    clearLocalStorage(JWT_TOKEN);
    setAuthenticated(false);
    window.location.reload();
  };

  const showComponentHandler = () => {
    if (isAuthenticated() || authenticated) {
      if (showProfileEdit) {
        return (
          <Layout>
            <Signup
              showProfileEdit={showProfileEdit}
              hideProfileEditComponent={hideProfileEditComponent}
              setShowSignup={setShowSignup}
              setAuthenticated={setAuthenticated}
            />
          </Layout>
        );
      } else {
        return (
          <Layout>
            <TodoApp />
          </Layout>
        );
      }
    }

    if (showSignup) {
      return (
        <Signup
          setShowSignup={setShowSignup}
          setAuthenticated={setAuthenticated}
        />
      );
    }

    return (
      <Login
        setShowSignup={setShowSignup}
        setAuthenticated={setAuthenticated}
      />
    );
  };

  return (
    <div className="App">
      <TodoProvider
        value={{
          queryClient,
          handleSignout,
          showProfileEdit,
          showProfileEditComponent,
          hideProfileEditComponent,
        }}
      >
        <QueryClientProvider client={queryClient}>
          {showComponentHandler()}
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
      </TodoProvider>
    </div>
  );
}

export default App;
