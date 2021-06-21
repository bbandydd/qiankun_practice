import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main';

const doRender = () => {
  ReactDOM.render(<Main />, document.getElementById('app'));
};

if(!window.__POWERED_BY_QIANKUN__){
  doRender();
}

export async function bootstrap(){

}
export async function mount() {
  doRender();
}
export async function unmount(){
  ReactDOM.unmountComponentAtNode(document.getElementById('app'));  // 卸载节点
}

