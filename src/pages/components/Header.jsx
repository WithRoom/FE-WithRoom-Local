import React, { useState } from 'react';
import { Link, useHref } from 'react-router-dom';
import { Navbar, FormControl, Button, Container } from 'react-bootstrap';
import kakaoimg from '../../images/kakao.png';
import meImg from '../../images/me.png';
import axios from 'axios';

import '../css/Header.css';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const search = () => {
    console.log(searchQuery);

    axios.post(`${process.env.REACT_APP_DOMAIN}/study/search` , {search : searchQuery})
    .then((response) => {
      console.log(response);
      setSearchQuery('');
    })
    .catch((error) => {
      setSearchQuery(' ');
      console.error("Error during search:", error);
    }); 
  };

  const enterKey = (e) => {
    if(e.key === 'Enter') {
      search();
    }
  }


  return (
 
      <Container style={{padding : '10 10 10 10', borderBottom: '1px solid #ddd', marginBottom : '50px' }}>
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
              value = {searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress = {enterKey}
            />
            <Button variant="outline-secondary" className="rounded-circle" onClick={search}>
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
  );
};

export default Header;