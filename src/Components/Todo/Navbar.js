import React from 'react';

import { getLocalStorage, USER_NAME } from '../../utils/commonUtils';

import './navbar.css';

const Navbar = ({ handleSignout }) => {
  return (
    <div className="nav-bar">
      <div className="nav-username">
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
