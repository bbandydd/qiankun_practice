import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  HashRouter,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { I18nextProvider } from 'react-i18next';
import AppContextProvider from './store';
import action from './action';
import Main from './Main';
import About from './About';
import i18n from './locale/i18n';

const doRender = (props) => {
  const Router = window.__POWERED_BY_QIANKUN__ ? HashRouter : BrowserRouter;

  if (props) {
    action.setActions(props);
  }

  ReactDOM.render(
    // <Router basename={window.__POWERED_BY_QIANKUN__ ? '/app1' : '/'}>
    <Router>
      <I18nextProvider i18n={i18n}>
        <AppContextProvider>
          <div>
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>

            <Switch>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              <Route path="/home">
                <Main />
              </Route>
              <Route path="/about">
                <About />
              </Route>
            </Switch>
          </div>
        </AppContextProvider>
      </I18nextProvider>
    </Router>
  , document.getElementById('app'));
};

if(!window.__POWERED_BY_QIANKUN__){
  doRender();
}

export async function bootstrap(){

}
export async function mount(props) {
  doRender(props);
}
export async function unmount(){
  ReactDOM.unmountComponentAtNode(document.getElementById('app'));  // 卸载节点
}
