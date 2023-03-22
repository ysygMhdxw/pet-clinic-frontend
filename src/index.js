import React from 'react';
import { render } from 'react-dom';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import 'antd/dist/reset.css';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import AuthSelection from './pages/authSelection';
import { Backend } from './pages/backend';
import { Frontend } from './pages/frontend';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { Question } from './components/Test/questionCard';


dayjs.locale('zh-cn');

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthSelection />}></Route>
        <Route path="/frontend" element={<Frontend />}></Route>
        <Route path="/backend" element={<Backend />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/question" element={<Question />}></Route>
      </Routes>
    </BrowserRouter>
    // <>
    //   <IndexLayout />
    // </>

  );
};

render(<App />, document.getElementById('root'));