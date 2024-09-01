import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Redirection = () => {
    const code = new URLSearchParams(window.location.search).get('code');

    const navigate = useNavigate();

    useEffect(() => {
        axios.post(process.env.REACT_APP_DOMAIN + `/login/kakao`, { code : code }) 
            .then((result) => {
                localStorage.setItem('accessToken', result.data.accessToken); 

                // 존재하는 유저인지 파악
                // 로그인 및 회원가입
                if(result.data.accessToken) {
                    navigate('/home');
                }else{
                    navigate('/register');
                }
            })
            .catch((error) => {
                console.error("Error during login:", error);
            });
            
    }, [code, navigate]);

    return <div>로그인 중입니다.</div>;
};

export default Redirection;
