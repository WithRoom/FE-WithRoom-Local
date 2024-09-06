import React, { useState } from 'react';
import Header from '../components/Header'; // Assuming Header is imported from another file
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

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
    const token = localStorage.getItem('accessToken'); // Retrieve token from local storage

    if (!token) {
      alert('No token found. Please log in.');
      return;
    }

    const url = process.env.REACT_APP_DOMAIN;

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
  axios.post(url, json, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => {
    console.log(response);
    alert('Registration successful');
    window.location.href = '/home';
  })
  .catch(error => {
    console.error('Error:', error);
    if (error.response && error.response.status === 401) {
      alert('Unauthorized. Please log in again.');
    } else {
      alert('Failed to save survey results');
    }
  });
}

export default Register;