import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';

const Redirection = () => {
    const code = new URLSearchParams(window.location.search).get('code');
    const navigate = useNavigate();

    useEffect(() => {
        axios.post('/oauth/kakao/login', { code: code }, {
        })
        .then((result) => {
            console.log(result);

            if (result.data.firstJoin === true) { 
                Swal.fire({
                    icon: 'success',
                    title: 'Welcome!',
                    text: 'You have successfully logged in for the first time.',
                });
                navigate('/register');
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Welcome back!',
                    text: 'You have successfully logged in.',
                });
                navigate('/home');
            }
            localStorage.setItem('accessToken', result.data.accessToken);               
        })
        .catch((error) => {
            console.error("Error during login:", error);
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'There was an error during login. Please try again.',
            });
        });
    }, [code, navigate]);

    return <div>로그인 중입니다.</div>;
};

export default Redirection;