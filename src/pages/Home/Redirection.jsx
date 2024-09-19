import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS import

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

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">로그인 중...</span>
            </div>
        </div>
    );
};

export default Redirection;
