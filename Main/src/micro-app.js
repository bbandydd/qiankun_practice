import store from './store';

const microApps = [
  {
    name: 'app1',
    entry: '//localhost:8081',
    activeRule: '/app1'
  },
  {
    name: 'app2',
    entry: '//localhost:8082',
    activeRule: '/app2'
  }
]

const apps = microApps.map(item => {
  return {
    ...item,
    container: '#subapp-viewport', // 子应用挂载的div
    props: {
      routerBase: item.activeRule, // 下发基础路由
      actions: store,
      // getGlobalState: store.getGlobalState // 下发getGlobalState方法
    }
  }
});

export default apps;
