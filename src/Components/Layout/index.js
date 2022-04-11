import React from 'react';
import Navbar from './Navbar';

const index = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default index;
