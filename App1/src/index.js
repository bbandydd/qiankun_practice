import React from 'react';
import ReactDOM from 'react-dom';
import {
  // BrowserRouter as Router,
  HashRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import action from './action';
import Main from './Main';
import About from './About';

const doRender = (props) => {
  if (props) {
    action.setActions(props);
  }

  ReactDOM.render(
    // <Router basename={window.__POWERED_BY_QIANKUN__ ? '/app1' : '/'}>
    <Router>
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
