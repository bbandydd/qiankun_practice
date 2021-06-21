import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';

let parentUrl = 'http://localhost:8081';

if(window.__POWERED_BY_QIANKUN__){
  parentUrl = location.origin;
}

const Main = () => {
  const [parentData, setParentData] = useState({});

  const handleCalculate = () => {
    if (window.opener) {
      const payload = {
        type: 'CALCULATE',
        data: {
          price: 999,
          jsonContent: {name: 'Part1'},
          time: new Date().getTime(),
        },
      };

      window.opener.postMessage(JSON.stringify(payload), parentUrl);
    }
  };

  const getInitialData = () => {
    if (window.opener) {
      const payload = {
        type: 'GET_INITIAL',
      };

      window.opener.postMessage(JSON.stringify(payload), parentUrl);
    }
  };

  useEffect(() => {
    getInitialData();

    window.addEventListener('message', function(event) {
      if (event.origin === parentUrl) {
        setParentData(JSON.parse(event.data));
      }
    }, false);
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <p>eMDM</p>
      <p>Data from 修模出圖系統</p>
      <p>{JSON.stringify(parentData)}</p>
      <button onClick={handleCalculate}>取得價格</button>
    </div>
  );
};

export default hot(Main);
