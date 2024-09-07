import React, { useState } from 'react';
import Header from '../components/Header';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

const Register = () => {
  const [registerForm, setRegisterForm] = useState({
    nickName: '',
    preferredArea: '',
    interest: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm({
      ...registerForm,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken'); 

    if (!token) {
      Swal.fire({
        icon: 'error',
        title: '로그인 필요',
        text: 'No token found. Please log in.',
      });
      return;
    }
    saveUser('/member/create/info', registerForm, token);
  };

  return (
    <div>
      <Header />
      <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNickName">
            <Form.Label>Nickname:</Form.Label>
            <Form.Control
              type="text"
              name="nickName"
              value={registerForm.nickName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formPreferredArea">
            <Form.Label>Preferred Area:</Form.Label>
            <Form.Control
              type="text"
              name="preferredArea"
              value={registerForm.preferredArea}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formInterest">
            <Form.Label>Interest:</Form.Label>
            <Form.Control
              type="text"
              name="interest"
              value={registerForm.interest}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </Container>
    </div>
  );
};

function saveUser(url, json, token) {
  console.log(`Request URL: ${url}`);
  axios.post(url, json, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => {
    console.log(response);
    Swal.fire({
      icon: 'success',
      title: '회원가입 성공',
      text: 'Registration successful',
      showConfirmButton: false,
      timer: 1500
    });
    window.location.href = '/home';
  })
  .catch(error => {
    console.error('Error:', error);
    if (error.response && error.response.status === 404) {
      Swal.fire({
        icon: 'error',
        title: '경로를 찾을 수 없음',
        text: 'Endpoint not found. Please check the URL.',
      });
    } else if (error.response && error.response.status === 401) {
      Swal.fire({
        icon: 'error',
        title: '인증 실패',
        text: 'Unauthorized. Please log in again.',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: '회원가입 실패',
        text: 'Failed to save survey results',
      });
    }
  });
}

export default Register;