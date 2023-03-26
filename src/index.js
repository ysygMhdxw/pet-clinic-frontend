import React, {useEffect, useState} from 'react';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import 'antd/dist/reset.css';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import {BrowserRouter, Route, Routes,} from 'react-router-dom';
import './index.css';
import AuthSelection from './pages/authSelection';
import {Backend} from './pages/backend';
import {Frontend} from './pages/frontend';
import {Login} from './pages/login';
import {Register} from './pages/register';
dayjs.locale('zh-cn');
import {createRoot} from 'react-dom/client';
import propTypes from "prop-types";
import {Home} from "./pages/home";
import NotFoundPage from "./pages/404page";


const container = document.getElementById('root');
const root = createRoot(container);

function isLocalStorageAvailable() {
    try {
        const testKey = 'test';
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
    } catch (e) {
        return false;
    }
}

function AuthenticatedRoute(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (isLocalStorageAvailable()) {
            const token = localStorage.getItem('token');
            console.log(token)
            if (token) {
                setIsAuthenticated(true);
            }
        }
    }, []);


    if (!isAuthenticated) {
        return <Login/>
    }

    return props.element
}

AuthenticatedRoute.propTypes = {
    path: propTypes.string,
    element: propTypes.object,
}

const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/select" element={<AuthenticatedRoute path="/select" element={<AuthSelection/>}/>}/>
                <Route path="/frontend" element={<AuthenticatedRoute path="/frontend" element={<Frontend/>}/>}/>
                <Route path="/backend" element={<AuthenticatedRoute path="/backend" element={<Backend/>}/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/" element={<Home/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </BrowserRouter>
    );
};

root.render(<App/>);

