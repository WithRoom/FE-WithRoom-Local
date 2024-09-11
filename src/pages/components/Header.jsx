import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, FormControl, Button, Container, Row, Col } from 'react-bootstrap';
import kakaoimg from '../../images/kakao_login_medium_narrow.png';
import meImg from '../../images/me.png';
import axios from 'axios';
import Swal from 'sweetalert2';
import CarouselFadeExample from './CarouselFadeExample';

import '../css/Header.css';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const search = () => {
    console.log(searchQuery);

    axios.post(`${process.env.REACT_APP_DOMAIN}/study/search`, { search: searchQuery })
      .then((response) => {
        console.log(response);
        setSearchQuery('');
      })
      .catch((error) => {
        setSearchQuery('');
        console.error("Error during search:", error);
      });
  };

  const enterKey = (e) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  const logout = () => {
    axios.post('/oauth/kakao/logout', {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then((response) => {
        console.log(response);
        localStorage.removeItem('accessToken');
        Swal.fire({
          icon: 'success',
          title: '로그아웃 되었습니다.',
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/home');
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error during logout:", error);
        Swal.fire({
          icon: 'error',
          title: '로그아웃에 실패했습니다.',
          text: error.response ? error.response.data : 'Unknown error',
        });
      });
  };

  return (
    <Container className="header-container">
      <Row className="align-items-center">
        <Col md={4} className="title-section">
          <h1 className="main-title">WITH ROOM</h1>
          <p className="subtitle">스터디하는 공간, 우리가 만들다</p>
        </Col>
        <Col md={4} className="search-section">
          <div className="search-bar-container">
            <FormControl
              type="search"
              placeholder="search"
              className="search-input"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={enterKey}
            />
            <Button variant="outline-secondary" className="search-btn" onClick={search}>
              <i className="bi bi-search"></i>
            </Button>
            <i className="bi bi-filter"></i>
            </div>
       
        </Col>
        <Row>

        <Col md={12} className="d-flex justify-content-end">
          <div>
            <a href="https://www.notion.so/Study-With-Me-7ffb049d2bba4814a4da7dc010d8216e" className="nav-link me-3" style={{ display: 'inline-block' }} target="_blank" rel="noopener noreferrer">
              <Button variant="outline-primary" style={{ backgroundColor: 'white' }}>
                소개
              </Button>
            </a>
            <Link to="/study" className="nav-link me-3" style={{ display: 'inline-block' }}>
              <Button variant="outline-primary" style={{ backgroundColor: 'white' }}>
                스터디
              </Button>
            </Link>
            <Link to="/me" className="nav-link me-3" style={{ display: 'inline-block' }}>
              <Button variant="outline-primary" style={{ backgroundColor: 'white' }}>
                <img src={meImg} alt="me" style={{ width: '30px', height: '30px' }} />
              </Button>
            </Link>
            <Button variant="outline-primary" style={{ backgroundColor: 'white' }} onClick={logout}>
              로그아웃
            </Button>
          </div>
        </Col>
        </Row>
      </Row>
      <div className="flex w-full h-auto bg-gray-100 p-4">
        <div className="flex-1 bg-white rounded-xm shadow-md mr-4">
         <CarouselFadeExample/>
        </div>
      <div className="w-1/3 bg-white rounded-lg shadow-md flex flex-col justify-end items-center p-4">
      <Link to="/login" >
        <button className="px-4 py-2 rounded-full mb-4" >
          <img src={kakaoimg} alt="kakao" style={{ width: 'auto', height: 'auto' }} />
        </button>
      </Link> 
      </div>
    </div>
    </Container>
  );
};

export default Header;