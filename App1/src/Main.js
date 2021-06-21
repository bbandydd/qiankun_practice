import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
const Main = () => {
  const [targetWindow, setTargetWindow] = useState();
  const [childData, setChildData] = useState({});

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
            emdmId: 'emdm_0c5d4af5-baf5-43e9-b507-acd83c2d6a5a',
            partName: 'LED WHITE GW CSSRM2.PM-N4N6-XX52-1',
            partNumber: '083.00246.0070',
            projectCode: '4PD0HC010001',
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
    window.addEventListener('message', receiveMessage);

    return () => {
      window.removeEventListener('message', receiveMessage);
    };
  }, [targetWindow]);

  return (
    <div style={{ textAlign: 'center' }}>
      <p>修模出圖系統</p>
      <p>Data from eMDM</p>
      <p>{JSON.stringify(childData)}</p>
      <button onClick={handleEvaluate}>估價</button>
    </div>
  );
};

export default hot(Main);
