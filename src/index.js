import React from 'react';
import { render } from 'react-dom';
import IndexLayout from './components/IndexLayout'
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import 'antd/dist/reset.css';
import './index.css';

dayjs.locale('zh-cn');

const App = () => {
  return (
    <>
      <IndexLayout></IndexLayout>
    </>
  );
};

render(<App />, document.getElementById('root'));