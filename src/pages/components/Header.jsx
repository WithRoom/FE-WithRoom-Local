import React from 'react';
import { Link, useHref } from 'react-router-dom';
import { Navbar, FormControl, Button, Container } from 'react-bootstrap';
import kakaoimg from '../../images/kakao.png';
import meImg from '../../images/me.png';

import '../css/Header.css';

const Header = () => {
  return (
    <Navbar bg="light" expand="lg" className="py-2">
      <Container fluid>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
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
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FormControl
              type="search"
              placeholder="어떤 스터디를 찾고 계신가요?"
              className="me-2 rounded-pill"
              aria-label="Search"
              style={{ width: '300px' }}
            />
            <Button variant="outline-secondary" className="rounded-circle">
              <i className="bi bi-search"></i>
            </Button>
          </div>
          <div>
            <Link to="/login" className="nav-link me-3" style={{ display: 'inline-block' }}>
              <Button variant="outline-primary" style={{ backgroundColor: 'white', borderColor: 'yellow' }}>
                <img src={kakaoimg} alt="Login" style={{ width: '30px', height: '30px' }} />
              </Button>
            </Link>
            <Link to="/me" className="nav-link" style={{ display: 'inline-block' }}>
              <Button variant="outline-primary" style={{ backgroundColor: 'white' }}>
                <img src={meImg} alt="me" style={{ width: '30px', height: '30px' }} />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;