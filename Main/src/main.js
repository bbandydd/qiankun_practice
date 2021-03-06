import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { loadMicroApp } from 'qiankun';
import microApps from './micro-app';
import store from './store';
import * as Style from './Style';

const Main = () => {
  const [current, setCurrent] = useState('/app1');
  const [count, setCount] = useState(1);
  const [microApp, setMicroApp] = useState();

  const goto = (item) => {
    history.pushState(null, item.activeRule, item.activeRule);
    setCurrent(item.activeRule);
  }

  const handleClickCount = () => {
    setCount(count + 1);
  };

  const handleClickToken = () => {
    const token = new Date().getTime();
    localStorage.qiankun_token = token;
    handleClickCount();
  };

  const loadLocales = (key) => {
    store.setGlobalState({
      locale: key,
    });
  };

  useEffect(() => {
    const app = loadMicroApp(microApps[0]);
    setMicroApp(app);

    store.onGlobalStateChange((newState, prev) => {
      console.log('Main', JSON.stringify(newState), JSON.stringify(prev));
      setCount(newState.count);
    }, true);

    localStorage.qiankun_medcn_url = 'https://localhost:3000/api';

    return () => microApp.unmount();
  }, []);

  useEffect(() => {
    store.setGlobalState({
      count,
    });
  }, [count]);

  useEffect(() => {
    const matchRoute = microApps.find((o) => o.activeRule === current);

    if (matchRoute) {
      const app = loadMicroApp(matchRoute);
      setMicroApp(app);
    }
  }, [current]);

  return (
    <Style.Container>
      <Style.Header>
        <Style.Logo>QIANKUN-EXAMPLE</Style.Logo>
        <Style.SubApps>
          {
            microApps.map((app) => (
              <li onClick={() => goto(app)} className={`${current === app.activeRule ? 'active' : ''}`}>
                {app.name}
              </li>
            ))
          }
        </Style.SubApps>
      </Style.Header>
      <Style.TestArea>
        <Style.TestBox><button onClick={handleClickCount}>Global set count</button> Global Count: {count}</Style.TestBox>
        <Style.TestBox><button onClick={handleClickToken}>localStorate token</button> Token: {localStorage.qiankun_token}</Style.TestBox>
        <Style.TestBox>
          <select onChange={(e) => loadLocales(e.target.value)}>
            <option value="en-US">en-US</option>
            <option value="zh-TW">zh-TW</option>
          </select>
        </Style.TestBox>
      </Style.TestArea>
      <div id="subapp-viewport"></div>
    </Style.Container>
  );
};

export default hot(Main);
