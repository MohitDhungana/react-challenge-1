import React, { useContext } from 'react';

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
        Edit Profile
      </div>
      <div className="sign-out" onClick={handleSignout}>
        Sign Out
      </div>
    </div>
  );
};

export default Navbar;
