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
                    title: '어서오세요!',
                    text: '로그인에 성공하였습니다. 회원가입을 완료해주세요.',
                });
                navigate('/register');
            } else {
                Swal.fire({
                    icon: 'success',
                    title: '환영합니다!',
                    text: '로그인에 성공하였습니다. 스터디 찾으러 떠나볼까요?',
                });
                navigate('/home');
            }
            localStorage.setItem('accessToken', result.data.accessToken);               
        })
        .catch((error) => {
            console.error("Error during login:", error);
            Swal.fire({
                icon: 'error',
                title: '로그인에 실패하였습니다.',
                text: '다시 시도해주세요!',
            });
        });
    }, [code, navigate]);

    return <div>로그인 중입니다.</div>;
};

export default Redirection;