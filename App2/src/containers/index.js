import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';

const parentUrl = 'http://localhost:8080';

const Main = () => {
  const [parentData, setParentData] = useState({});

  const handleCalculate = () => {
    const payload = {
      price: 999,
      jsonContent: {name: 'Part1'},
      time: new Date().getTime(),
    };

    window.opener.postMessage(JSON.stringify(payload), parentUrl);
  };

  const getInitialData = () => {
    const payload = {
      type: 'GET_INITIAL',
    };

    window.opener.postMessage(JSON.stringify(payload), parentUrl);
  };

  useEffect(() => {
    // getInitialData();

    window.addEventListener('message', function(event) {
      if (event.origin === parentUrl) {
        setParentData(JSON.parse(event.data));
      }
    }, false);
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <p>APP2</p>
      <p>Data from Parent</p>
      <p>{JSON.stringify(parentData)}</p>
      <button onClick={handleCalculate}>取得價格</button>
    </div>
  );
};

export default hot(Main);
