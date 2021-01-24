import React, { useState, useEffect } from 'react';
import {registerMicroApps,start} from 'qiankun'
import { hot } from 'react-hot-loader/root';

const Main = () => {
  useEffect(() => {
    registerMicroApps(
      [
       {
          name:'app1', //微应用的名称，微应用之间必须确保唯一(微应用中package.json中的name)
          entry:'//localhost:8080', //微应用的entry地址
          container:'#subWebsite',//微应用的容器节点的选择器
          activeRule:'/app1'//微应用的激活规则
       },
      //  {
      //    name:'app2',
      //    entry:'//localhost:8081',
      //    container:'#subWebsite',
      //    activeRule:'/app2'
      //   }
       ]
     );
     start({prefetch:'all'});
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <p>This is Main</p>
      <div id="subWebsite"></div>
    </div>
  );
};

export default hot(Main);
