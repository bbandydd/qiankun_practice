import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';

const childUrl = 'http://localhost:8081';

const Main = () => {
  const [childData, setChildData] = useState({});

  const handleEvaluate = () => {
    const newWindow = window.open(childUrl, 'Calculate', 'width=1000,height=800');
    setInterval(() => {
      const payload = {
        time: new Date().getTime(),
      };
      newWindow.postMessage(JSON.stringify(payload), childUrl);
    }, 2000);
  };

  useEffect(() => {
    window.addEventListener('message', (event) => {
      if (event.origin === childUrl) {
        setChildData(JSON.parse(event.data));
      }
    }, false);
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <p>APP1</p>
      <p>Data from Child</p>
      <p>{JSON.stringify(childData)}</p>
      <button onClick={handleEvaluate}>估價</button>
    </div>
  );
};

export default hot(Main);
