import { initGlobalState } from 'qiankun';

const action = initGlobalState({name: 'Andy', count: 1, locale: 'en-US'});

export default action;
