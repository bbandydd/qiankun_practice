import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';

const Main = () => {

  return (
    <div style={{ textAlign: 'center' }}>
      <p>Main</p>
      <div id="subapp-viewport"></div>
    </div>
  );
};

export default hot(Main);
