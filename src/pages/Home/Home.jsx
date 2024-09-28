import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../components/Header';
import CarouselFadeExample from '../components/CarouselFadeExample'; 
import MainContent from '../Home/MainContent';
import '../css/Home.css';
import axios from 'axios';
import StudyCard from '../Study/StudyCard';
import Footer from '../components/Footer';
import { Card, Button } from 'react-bootstrap';
import more from '../../images/more.png';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';


const Home = () => {
  const [nickName, setNickName] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [studies, setStudies] = useState([]);

  const homeStudyList = ({ studies }) => (
    <>
      <Container>
  <Row>
    {studies.slice(0, 7).map((study) => (
      <Col key={study.studyId} md={3} className="mb-3">
        <StudyCard study={study} />
      </Col>
    ))}
    <Col>
      <Link to="/study/list">
        {studies.length > 6 && (
          <div className="bg-white rounded-lg p-4 flex flex-col items-center justify-center h-full cursor-pointer border:1px">
          <ChevronRight className="w-12 h-12 text-blue-500 mb-3" />
          <p className="text-lg font-bold text-center text-gray-800">
            스터디를 더 보러 가볼까요?
          </p>
        </div>
        )}
      </Link>
    </Col>
  </Row>
</Container>
    </>
  );

  const checkAuth = async () => {
    try {
      const checkToken = localStorage.getItem('accessToken');
      const response = await axios.get('/oauth/login/state', {
        headers: { Authorization: `Bearer ${checkToken}` },
      });
      if(response.data.state === false) {
        setIsAuthenticated(false);
      }else{
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('인증 확인 중 오류 발생:', error);
      setIsAuthenticated(false);
    }
  };

  const fetchMemberInfo = async (token) => {
    try {
      const response = await axios.get('/member/mypage/info', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('memberInfo', response.data);
      setNickName(response.data.nickName);
    } catch (error) {
      console.error('회원 정보 가져오기 중 오류 발생:', error);
    }
  };

  const fetchStudies = async () => {
    try {
      const response = await axios.get('/home/info', {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      });
      console.log('studies', response.data);
      setStudies(response.data.homeStudyInfoList);
    } catch (error) {
      console.error('스터디 목록 가져오기 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    checkAuth();
    fetchStudies();
  }, []);

  useEffect(() => {
    if (isAuthenticated === true) {
      console.log('로그인 상태:', isAuthenticated);
      const token = localStorage.getItem('accessToken');
      if (token) {
        fetchMemberInfo(token);
      }
    }
  }, [isAuthenticated]);

  return (
    <>
      <Header />
      <Container fluid className="px-0">
        <Container className="py-4">
          <Row className="justify-content-center mb-4">
            {isAuthenticated ? (
              <Col>
                {/* <h2>{nickName}</h2> */}
              </Col>
            ) : (
              <Col>
                <h2>Please log in to continue.</h2>
              </Col>
            )}
          </Row>
        </Container>
        {homeStudyList({ studies })}
      </Container>
      <Footer/>
    </>
  );
};

export default Home;