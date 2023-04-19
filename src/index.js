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

    useEffect(() => {
        if (isLocalStorageAvailable()) {
            const token = localStorage.getItem('token');
            console.log(token)
            if (token) {
                props.setIsAuthenticated(true);
            }
        }

    }, [props.isAuthenticated]);
    useEffect(() => {
        if (isLocalStorageAvailable()) {
            const superuser = localStorage.getItem('status');
            console.log(superuser)
            if (superuser === 'true') {
                props.setIsSuperUser(true);
            }
        }

    }, [props.isSuperUser]);
    if (!props.isAuthenticated) {
        return <Login setIsAuthenticated={props.setIsAuthenticated} isAuthenticated={props.isAuthenticated}/>
    }

    return props.element
}

AuthenticatedRoute.propTypes = {
    path: propTypes.string,
    element: propTypes.object,
    isAuthenticated: propTypes.bool,
    setIsAuthenticated: propTypes.func,
    isSuperUser: propTypes.bool,
    setIsSuperUser: propTypes.func,
}

const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isSuperUser, setIsSuperUser] = useState() ;
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/select" element={<AuthenticatedRoute isAuthenticated={isAuthenticated}
                                                                   setIsAuthenticated={setIsAuthenticated}
                                                                   isSuperUser = {isSuperUser}
                                                                   setIsSuperUser = {setIsSuperUser}
                                                                   path="/select" element={<AuthSelection
                                                                                            isSuperUser = {isSuperUser} />}/>}/>
                <Route path="/frontend" element={<AuthenticatedRoute isAuthenticated={isAuthenticated}
                                                                     setIsAuthenticated={setIsAuthenticated}
                                                                     isSuperUser = {isSuperUser}
                                                                   setIsSuperUser = {setIsSuperUser}
                                                                     path="/frontend" element={<Frontend/>}/>}/>
                <Route path="/backend" element={<AuthenticatedRoute isAuthenticated={isAuthenticated}
                                                                    setIsAuthenticated={setIsAuthenticated}
                                                                    isSuperUser = {isSuperUser}
                                                                   setIsSuperUser = {setIsSuperUser}
                                                                    path="/backend" element={
                                                                    isSuperUser?
                                                                    <Backend/>
                                                                    :
                                                                    <NotFoundPage />
                                                                    }/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login"
                       element={<Login isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}
                                       isSuperUser = {isSuperUser} setIsSuperUser={setIsSuperUser}
                                        />}/>
                <Route path="/"
                       element={<Home isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}
                                      isSuperUser = {isSuperUser} setIsSuperUser = {setIsSuperUser}/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </BrowserRouter>
    );
};

root.render(<App/>);

