import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import StudyCard from '../Study/StudyCard';

const StudyList = ({ studies }) => (
    <Row>
    {studies.map((study) => (
      <Col key={study.studyId} md={4} className="mb-3">
        <StudyCard study={study} /> {}
      </Col>
    ))}
  </Row>
);

// 메인 컴포넌트
const MyInfo = () => {
  const [activeTab, setActiveTab] = useState('created');
  const [studies, setStudies] = useState([]);

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        let endpoint = '';
        switch (activeTab) {
          case 'created':
            endpoint = '/study/mypage/info/mystudy';
            break;
          case 'participating':
            endpoint = '/study/mypage/info/part';
            break;
        //   case 'completed':
        //     endpoint = '/api/studies/completed';
        //     break;
          case 'liked':
            endpoint = '/study/mypage/info/interest';
            break;
          case 'join':
            endpoint = '/study/mypage/info/join';
            break;
          default:
            endpoint = '/study/mypage/info/mystudy';
        }
        const response = await axios.get(endpoint,
            { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }
        );

        console.log('스터디 목록을 불러왔습니다:', response.data);

        setStudies(response.data.studies || response.data.groupLeaderStudies || []);
      } catch (error) {
        console.error('스터디 목록을 불러오는데 실패했습니다:', error);
      }
    };

    fetchStudies();
  }, [activeTab]);

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
          <Nav.Link active={activeTab === 'completed'} onClick={() => setActiveTab('completed')}>
            완료한 스터디
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
      
      {activeTab === 'created' && (
        <>
          <h2>내가 만든 스터디</h2>
          {studies.length > 0 ? (
            <StudyList studies={studies} />
          ) : (
            <p>생성한 스터디가 없습니다.</p>
          )}
        </>
      )}
      
      {activeTab === 'participating' && (
        <>
          <h2>참여 중 스터디</h2>
          {studies.length > 0 ? (
            <StudyList studies={studies} />
          ) : (
            <p>참여 중인 스터디가 없습니다.</p>
          )}
        </>
      )}
      
      {activeTab === 'completed' && (
        <>
          <h2>완료한 스터디</h2>
          {studies.length > 0 ? (
            <StudyList studies={studies} />
          ) : (
            <p>완료한 스터디가 없습니다.</p>
          )}
        </>
      )}
      
      {activeTab === 'liked' && (
        <>
          <h2>관심 스터디</h2>
          {studies.length > 0 ? (
            <StudyList studies={studies} />
          ) : (
            <p>관심 스터디가 없습니다.</p>
          )}
        </>
      )}

      {activeTab === 'join' && (
        <>
          <h2>참여 신청 한 스터디</h2>
          {studies.length > 0 ? (
            <StudyList studies={studies} />
          ) : (
            <p>참여 신청한 스터디가 없습니다.</p>
          )}
        </>
      )}
      
      <Button variant="primary" className="mt-4">스터디 만들기</Button>
    </Container>
  );
};

export default MyInfo;