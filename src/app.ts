import { PropsWithChildren } from 'react';
import { useLaunch } from '@tarojs/taro';
import '@tarojs/taro/html.css';
import 'ossaui/dist/style/index.scss';
import './app.scss';

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    console.log('App launched.');
  });

  // children 是将要会渲染的页面
  return children;
}

export default App;
