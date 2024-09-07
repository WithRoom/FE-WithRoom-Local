import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../components/Header';
import CarouselFadeExample from '../components/CarouselFadeExample'; // CarouselFadeExample 컴포넌트 임포트
import MainContent from '../Home/MainContent';
import '../css/Home.css';
import axios from 'axios';

const Home = () => {
  const [nickName, setNickName] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   const token = localStorage.getItem('accessToken');
  //   if (token) {
  //     axios.get(process.env.REACT_APP_DOMAIN + '/member/mypage/info', {
  //       headers: {
  //         'Authorization': `Bearer ${token}`
  //       }
  //     })
  //     .then(response => {
  //       setNickName(response.data.nickName);
  //       setIsAuthenticated(true);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching user info:', error);
  //       setIsAuthenticated(false);
  //     });
  //   } else {
  //     setIsAuthenticated(false);
  //   }
  // }, []);

  return (
    <>
      <Header />
      <Container fluid className="px-0">
        <Container className="py-4">
          <Row className="justify-content-center mb-4">
            {/* <Col md="auto">
              <h1 className="home-header">Study With Me</h1>
              {isAuthenticated ? (
                <div className="alert alert-success" role="alert">
                   {nickName}님 환영합니다.
                </div>
              ) : (
                <div className="alert alert-warning" role="alert">
                  로그인 후 이용해주세요.
                </div>
              )}
            </Col> */}
          </Row>
        </Container>
        <CarouselFadeExample />
      </Container>
      <footer className="footer bg-light py-3 mt-auto">
        <Container>
          <Row>
            <Col md={6} className="text-center text-md-start">
              <p className="mb-0">&copy; 2024 Study With Me. All rights reserved.</p>
            </Col>
            <Col md={6} className="text-center text-md-end mt-3 mt-md-0">
              <a href="/contact" className="me-3">Contact Us</a>
              <a href="/privacy">Privacy Policy</a>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Home;