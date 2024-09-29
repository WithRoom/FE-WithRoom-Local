import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Button, Card, Spinner } from 'react-bootstrap';
import axios from 'axios';
import StudyCard from '../Study/StudyCard';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { FaCubes } from 'react-icons/fa';

const StudyList = ({ studies }) => (
  <Row>
    {studies.map((study) => (
      <Col key={study.studyId} md={4} className="mb-3">
        <StudyCard study={study} />
      </Col>
    ))}
  </Row>
);

const LoadingSpinner = () => (
  <div className="text-center">
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>
);

const MyInfo = () => {
  const [activeTab, setActiveTab] = useState('created');
  const [studies, setStudies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStudies = async () => {
      setIsLoading(true);
      try {
        let endpoint = '';
        switch (activeTab) {
          case 'created':
            endpoint = '/study/mypage/info/mystudy';
            break;
          case 'participating':
            endpoint = '/study/mypage/info/part';
            break;
          case 'request-join':
            endpoint = '/study/mypage/info/request-join';
            break;
          case 'liked':
            endpoint = '/study/mypage/info/interest';
            break;
          case 'join':
            endpoint = '/study/mypage/info/join';
            break;
          default:
            endpoint = '/study/mypage/info/mystudy';
        }
        const response = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        });
        console.log('endpoint : ', endpoint);
        console.log('스터디 목록을 불러왔습니다:', response.data);

        if (endpoint === '/study/mypage/info/mystudy') {
          setStudies(response.data.groupLeaderStudies);
        } else if (endpoint === '/study/mypage/info/part') {
          setStudies(response.data.participationStudies);
        } else if (endpoint === '/study/mypage/info/request-join') {
          setStudies(response.data.responseSignUpStudies);
        } else if (endpoint === '/study/mypage/info/interest') {
          setStudies(response.data.interestStudies);
        } else if (endpoint === '/study/mypage/info/join') {
          setStudies(response.data.signUpStudies);
        }
      } catch (error) {
        console.error('스터디 목록을 불러오는데 실패했습니다:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudies();
  }, [activeTab]);

  const renderStudyList = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (studies.length === 0) {
      return (
        <div className="text-center d-flex flex-column align-items-center">
          <FaCubes size={200} color="gray" />
          <p>{getEmptyMessage(activeTab)}</p>
        </div>
      );
    }

    return activeTab === 'request-join' ? (
      <Row>
        {studies.map((study) => (
          <Col key={study.studyId} md={4} className="mb-3">
            <StudyCard study={study} cardType="request-join" />
          </Col>
        ))}
      </Row>
    ) : (
      <StudyList studies={studies} />
    );
  };

  const getEmptyMessage = (tab) => {
    switch (tab) {
      case 'created':
        return '생성한 스터디가 없습니다.';
      case 'participating':
        return '참여 중인 스터디가 없습니다.';
      case 'request-join':
        return '참여 신청 온 스터디가 없습니다.';
      case 'liked':
        return '관심 스터디가 없습니다.';
      case 'join':
        return '참여 신청한 스터디가 없습니다.';
      default:
        return '스터디가 없습니다.';
    }
  };

  return (
    <Container>
      <Nav variant="tabs" className="mb-3 justify-content-center">
        <Nav.Item>
          <Nav.Link active={activeTab === 'created'} onClick={() => setActiveTab('created')}>
            내가 만든 스터디
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active={activeTab === 'participating'} onClick={() => setActiveTab('participating')}>
            참여 중 스터디
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active={activeTab === 'request-join'} onClick={() => setActiveTab('request-join')}>
            참여 신청 온 스터디
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active={activeTab === 'liked'} onClick={() => setActiveTab('liked')}>
            관심 스터디
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active={activeTab === 'join'} onClick={() => setActiveTab('join')}>
            신청한 스터디
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {renderStudyList()}

      <div className="text-center d-flex flex-column align-items-center">
        <Link to="/study">
          <Button variant="primary" className="mt-4">스터디 만들기</Button>
        </Link>
      </div>
    </Container>
  );
};

export default MyInfo;