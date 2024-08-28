import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Redirection = () => {
    const code = new URLSearchParams(window.location.search).get('code');

    const navigate = useNavigate();

    useEffect(() => {
        console.log(process.env.REACT_APP_DOMAIN);
        axios.post(`${process.env.REACT_APP_DOMAIN}/kakaoLogin`, { code : code }) 
            .then((result) => {
                console.log(result);
                console.log(result.data);

                localStorage.setItem('name', result.data.user_name); 
                navigate('/loginSuccess');
            })
            .catch((error) => {
                console.error("Error during login:", error);
            });
            
    }, [code, navigate]);

    return <div>로그인 중입니다.</div>;
};

export default Redirection;
