import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import action from '../../Shared/action';
import AppContextProvider from '../../Shared/store';
import Main from './Main';
import i18n from './locale/i18n';

const doRender = (props) => {
  if (props) {
    action.setActions(props);
  }
  ReactDOM.render(
    <I18nextProvider i18n={i18n}>
      <AppContextProvider>
        <Main />
      </AppContextProvider>
    </I18nextProvider>
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

