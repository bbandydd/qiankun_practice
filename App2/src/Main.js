import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import action from './action';

let parentUrl = 'http://localhost:8081';

if(window.__POWERED_BY_QIANKUN__){
  parentUrl = location.origin;
}

const Main = () => {
  const [parentData, setParentData] = useState({});
  const [count, setCount] = useState(1);

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

  const handleClick = () => {
    action.setGlobalState({ count: count + 1 });
    setCount(count + 1);
  };

  useEffect(() => {
    action.onGlobalStateChange((newState, prev) => {
      console.log('App2', JSON.stringify(newState), JSON.stringify(prev));
      setCount(newState.count);
    }, true);
  }, []);

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
      <div><button onClick={handleClick}>App2 set count</button> Global Count: {count}</div>
    </div>
  );
};

export default hot(Main);
