import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Redirection = () => {
    const code = new URLSearchParams(window.location.search).get('code');

    const navigate = useNavigate();

    useEffect(() => {
        console.log(process.env.REACT_APP_URL);
        axios.post(`${process.env.REACT_APP_URL}/kakaoLogin`, { code : code }) // 백엔드에 http://domain/kakaoLogin 경로로 code 전달
            .then((result) => {
                // 토큰 검증 후 리턴 값 result
                console.log(result.data);

                localStorage.setItem('name', result.data.user_name); // 세션 or 토큰 처리 필요
                navigate('/loginSuccess');
            });
    }, [code, navigate]);

    return <div>로그인 중입니다.</div>;
};

export default Redirection;
