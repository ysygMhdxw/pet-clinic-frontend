import React from 'react';
import '../assets/css/404page.css';
import {Link} from "react-router-dom";

function NotFoundPage() {
    return (
        <div className="not-found-container">
            <div className="not-found-text">404</div>
            <div className="not-found-message">Oops! 页面开小差了。。。</div>
            <Link to="/" className="not-found-button">返回主页</Link>
        </div>
    );
}

export default NotFoundPage;
