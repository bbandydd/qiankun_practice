import React from 'react';
import {render} from 'react-dom';
import { registerMicroApps, start, setDefaultMountApp } from 'qiankun';
import microApps from './micro-app';
import Main from './main';

// registerMicroApps(microApps, {
//   beforeLoad: app => {
//     console.log('before load app.name====>>>>>', app.name)
//   },
//   beforeMount: [
//     app => {
//       console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name)
//     }
//   ],
//   afterMount: [
//     app => {
//       console.log('[LifeCycle] after mount %c%s', 'color: green;', app.name)
//     }
//   ],
//   afterUnmount: [
//     app => {
//       console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
//     }
//   ]
// });
// setDefaultMountApp('/app1');
start({
  fetch: (url) => {
    return fetch(url, {
      credentials: 'include',
      mode: 'cors'
    })
  }
});

render(<Main />, document.getElementById('root'));

