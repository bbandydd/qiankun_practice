import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import microApps from './micro-app';
import * as Style from './Style';

const Main = () => {
  const [current, setCurrent] = useState('/app1');

  const goto = (item) => {
    history.pushState(null, item.activeRule, item.activeRule);
    setCurrent(item.activeRule);
  }

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
      <div id="subapp-viewport"></div>
    </Style.Container>
  );
};

export default hot(Main);
