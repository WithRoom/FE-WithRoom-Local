import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Redirection = () => {
    const code = new URLSearchParams(window.location.search).get('code');

    const navigate = useNavigate();

    useEffect(() => {
        console.log(process.env.REACT_APP_DOMAIN);
        axios.post(`/login/kakao`, { code : code }) 
            .then((result) => {
                localStorage.setItem('accessToken', result.data.accessToken); 
                navigate('/home');
            })
            .catch((error) => {
                console.error("Error during login:", error);
            });
            
    }, [code, navigate]);

    return <div>로그인 중입니다.</div>;
};

export default Redirection;
