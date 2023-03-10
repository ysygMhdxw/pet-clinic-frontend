import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Routes } from "react-router-dom";

// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import 'antd/dist/reset.css';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import IndexLayout from './components/IndexLayout';
import './index.css';


dayjs.locale('zh-cn');

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexLayout />}></Route>
      </Routes>
    </BrowserRouter>

  );
};

render(<App />, document.getElementById('root'));