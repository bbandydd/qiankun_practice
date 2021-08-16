import React, { useState, useEffect, useContext } from 'react';
import { hot } from 'react-hot-loader/root';
import { AppContext } from '../../Shared/store';

let parentUrl = 'http://localhost:8081';

if(window.__POWERED_BY_QIANKUN__){
  parentUrl = location.origin;
}

const Main = () => {
  const [parentData, setParentData] = useState({});
  const appStore = useContext(AppContext);
  const { count, handleClickCount } = appStore;

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
      <p>App2</p>
      <p>Data from App1</p>
      <p>{JSON.stringify(parentData)}</p>
      <button onClick={handleCalculate}>get Data</button>
      <div><button onClick={handleClickCount}>App2 set count</button> Global Count: {count}</div>
      <div>
        Token: {localStorage.qiankun_token}
      </div>
    </div>
  );
};

export default hot(Main);
