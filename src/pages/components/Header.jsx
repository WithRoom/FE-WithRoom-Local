import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar, FormControl, Button, Container, Row, Col } from 'react-bootstrap';
import kakaoimg from '../../images/kakao_login_medium_narrow.png';
import meImg from '../../images/me.png';
import axios from 'axios';
import Swal from 'sweetalert2';
import CarouselFadeExample from './CarouselFadeExample';
import logoutImg from '../../images/logout.png';
import kakaochannel from '../../images/kakaochannel.png';
import SwiperComponent from './SwiperComponent';

import '../css/Header.css';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [homeStudyInfoList, setHomeStudyInfoList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, []);

  // 로그인 여부 확인 함수
  const checkAuth = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const response = await axios.get('/oauth/login/state', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.state === false) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      setIsAuthenticated(false);
    }
  };

  // 검색 기능
  const search = async () => {
    console.log(searchQuery);
  
    const token = localStorage.getItem('accessToken'); // 토큰 가져오기
  
    try {
      const response = await axios.get(`/home/filter/title`, { 
        params: { title: searchQuery },
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response && response.data) {
        console.log(response);

        Swal.fire({
          icon: 'success',
          title: '검색된 페이지로 이동합니다.',
          showConfirmButton: false,
          timer: 1500
        })

        setHomeStudyInfoList(response.data.homeStudyInfoList); // 검색 결과를 Home 컴포넌트로 전달
       
        console.log('homeStudyInfoList', response.data.homeStudyInfoList);
        navigate('/study/list', { state: { homeStudyInfoList: response.data.homeStudyInfoList } });
        
       
        setSearchQuery(''); // 검색 완료 후 검색어 초기화 
      }
    } catch (error) {
      setSearchQuery(''); // 검색 실패 시 검색어 초기화
      console.error("Error during search:", error);
    }
  };

  // Enter 키 입력 시 검색 실행
  const enterKey = (e) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  // 로그아웃 기능
  const logout = () => {
    axios.post(`/oauth/kakao/logout`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then((response) => {
        console.log(response);
        localStorage.removeItem('accessToken'); // 토큰 제거
        Swal.fire({
          icon: 'success',
          title: '로그아웃 되었습니다.',
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(() => {
          navigate('/home'); // 홈 페이지로 이동
          window.location.reload(); // 페이지 새로고침
        }, 1500);
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
      <Row className="align-items-center d-flex">
            <Col className="title-section">
              <Link to="/home" className="nav-link me-3" style={{ display: 'inline-block' }}>
                <h1 className="main-title">WITH ROOM</h1>
                <p className="subtitle">스터디하는 공간, 우리가 만들다</p>
              </Link>
            </Col>
            
            <Col className="search-section">
              <div className="search-bar-container">
                <FormControl
                  type="search"
                  placeholder="search"
                  className="search-input"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={enterKey} // onKeyPress 대신 onKeyDown 사용
                />
                <Button variant="outline-secondary" className="search-btn" onClick={search}>
                  <i className="bi bi-search"></i>
                </Button>
                <i className="bi bi-filter"></i>
              </div>
            </Col>
            
            <Col className="d-flex justify-content-end">
              <button className="px-4 py-2 rounded-full mb-4" onClick={logout}>
                <img src={logoutImg} alt="logout" style={{ width: '30px', height: '30px' }} />
              </button>
            </Col>
          </Row>


      {/* 홈 페이지에서만 CarouselFadeExample 컴포넌트를 표시 */}
      {location.pathname === '/home' && (
        <div className="flex w-full h-auto bg-gray-100 p-3">
        <div className="flex-1 bg-white rounded-xm shadow-md mr-4">
           <CarouselFadeExample />
         </div>
        
         <div className="w-1/3 bg-white rounded-lg flex flex-col  items-center">
           <div>
           </div>
           <div>
             {isAuthenticated && (
               <Link to="/study" className="nav-link me-3" style={{ display: 'inline-block' }}>
                 <p className="text-gray-500">스터디 만들러 가볼까요?</p>
               </Link>
             )}
           </div>
           <div>
             <Link to="/me" className="nav-link me-3" style={{ display: 'inline-block' }}>
               <img src={meImg} alt="me" style={{ width: '200px', height: '200px' }} />
             </Link>
           </div>
           {!isAuthenticated && 
             (
                  <Link to="/login">
                    <button className="px-4 py-2 rounded-full mb-2">
                      <img src={kakaoimg} alt="kakao" style={{ width: 'auto', height: 'auto' }} />
                    </button>
                  </Link>
           )}
         </div>
       </div>
      )}
    </Container>
  );
};

export default Header;