import React, { useContext } from 'react';

import { getLocalStorage, USER_NAME } from '../../utils/commonUtils';
import TodoContext from '../../Context';

import './navbar.css';

const Navbar = () => {
  const { handleSignout, showProfileEditComponent } = useContext(TodoContext);

  return (
    <div className="nav-bar">
      <div
        className="nav-username"
        onClick={showProfileEditComponent}
        title="Edit Profile"
      >
        {getLocalStorage(USER_NAME)
          ? getLocalStorage(USER_NAME)?.toUpperCase()
          : 'USER'}
      </div>
      <div className="sign-out" onClick={handleSignout}>
        Sign Out
      </div>
    </div>
  );
};

export default Navbar;
