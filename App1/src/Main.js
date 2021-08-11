import React, { useState, useEffect, useContext } from 'react';
import { hot } from 'react-hot-loader/root';
import { AppContext } from './store';
import * as Style from './Style';

const Main = () => {
  const [targetWindow, setTargetWindow] = useState();
  const [childData, setChildData] = useState({});
  const appStore = useContext(AppContext);
  const { count, handleClickCount } = appStore;

  const handleEvaluate = () => {
    let childUrl = 'http://localhost:8082';

    if(window.__POWERED_BY_QIANKUN__){
      childUrl = "http://localhost:8080/app2";
    }

    const newWindow = window.open(childUrl, 'Calculate', 'width=1000,height=800');
    setTargetWindow(newWindow);
  };

  const receiveMessage = (event) => {
    const { origin, data } = event;
    let childOrigin = 'http://localhost:8082';

    if(window.__POWERED_BY_QIANKUN__){
      childOrigin = location.origin;
    }

    if (origin === childOrigin) {
      const receiveData = JSON.parse(data);

      switch(receiveData?.type) {
        case 'GET_INITIAL':
          const payload = {
            id: '0c5d4af5-baf5-43e9-b507-acd83c2d6a5a',
            name: 'LED WHITE',
            pn: 'aaa.123.456',
            pcode: '4XX2XX010001',
          };
          targetWindow.postMessage(JSON.stringify(payload), childOrigin);
          break;
        case 'CALCULATE':
          setChildData(receiveData.data);
          targetWindow.close();
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    if (targetWindow) {
      window.addEventListener('message', receiveMessage);
    }

    return () => {
      window.removeEventListener('message', receiveMessage);
    };
  }, [targetWindow]);

  return (
    <div style={{ textAlign: 'center' }}>
      <p>App1</p>
      <p>Data from App2</p>
      <p>{JSON.stringify(childData)}</p>
      <Style.Button onClick={handleEvaluate}>Calculate</Style.Button>
      <div><button onClick={handleClickCount}>App1 set count</button> Global Count: {count}</div>
      Token: {localStorage.qiankun_token}
    </div>
  );
};

export default hot(Main);
