import React from 'react';
import { Link } from 'react-router-dom';
import '../css/NotFound.css'; // 스타일을 별도의 CSS 파일로 분리

export default function NotFound() {
    return (
        <div>
            <h1>404 Error Page</h1>
            <p className="zoom-area"><b>페이지가 존재하지 않습니다!</b></p>
            <section className="error-container">
                <span className="four"><span className="screen-reader-text">4</span></span>
                <span className="zero"><span className="screen-reader-text">0</span></span>
                <span className="four"><span className="screen-reader-text">4</span></span>
            </section>
            <div className="link-container">
                <Link to="/" className="more-link">홈으로 이동</Link>
            </div>
        </div>
    );
}