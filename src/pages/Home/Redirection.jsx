import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Redirection = () => {
    const code = new URLSearchParams(window.location.search).get('code');

    const navigate = useNavigate();

    useEffect(() => {
        axios.post(process.env.REACT_APP_DOMAIN + `/oauth/kakao/login`, { code : code }) 
            .then((result) => {
                console.log(result);

                if(result.data.firstJoin === false){ 
                    navigate('/register');
                }else{
                    navigate('/home');
                }
                localStorage.setItem('accessToken', result.data.accessToken);               
            })
            .catch((error) => {
                
                console.error("Error during login:", error);
            });
            
    }, [code, navigate]);

    return <div>로그인 중입니다.</div>;
};

export default Redirection;
