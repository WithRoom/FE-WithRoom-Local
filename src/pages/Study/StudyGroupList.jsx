import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import StudyGroupCard from './StudyGroupCard';
import Header from '../components/Header';
import StudyForm from './StudyForm';
import MainContent from '../Home/MainContent';

/*
* 모집 완료 : 비활성화
* 모집 중 : 활성화
*/

const studyGroups = [
  {
    id: 1,
    title: '부산 IT 모임 부스코 - 모각코 모집',
    description: '부산 IT 모임 부스코입니다. 자유로운 공개 모임 모각하는 모각코를 진행할... 부산 IT 모임 부스코입니다. 자유로운 공개 모임 모각하는 모각코를 진행할... 부산 IT 모임 부스코입니다. 자유로운 공개 모임 모각하는 모각코를 진행할...',
    tags: ['프론트엔드', '백엔드', 'Java'],
    status: '모집중',
    members: 3,
    maxMembers: 5
  },
  {
    id: 2,
    title: '[수원역] 주말 모각코',
    description: '스터디 주제와 목에 놀아서 취향 나! 카페 또는 스터디룸에 취향 고민이 있다면 참가 나누고, 같이 공부하고...',
    tags: ['모각코', '프론트엔드', '백엔드'],
    status: '모집중',
    members: 2,
    maxMembers: 4
  },
  {
    id: 3,
    title: '[수원역] 주말 모각코',
    description: '스터디 주제와 목에 놀아서 취향 나! 카페 또는 스터디룸에 취향 고민이 있다면 참가 나누고, 같이 공부하고...',
    tags: ['모각코', '프론트엔드', '백엔드'],
    status: '모집완료',
    members: 2,
    maxMembers: 4
  },
  {
    id: 4,
    title: '[수원역] 주말 모각코',
    description: '스터디 주제와 목에 놀아서 취향 나! 카페 또는 스터디룸에 취향 고민이 있다면 참가 나누고, 같이 공부하고...',
    tags: ['모각코', '프론트엔드', '백엔드'],
    status: '모집중',
    members: 2,
    maxMembers: 4
  },
];

const StudyGroupList = () => {
  return (
    <Container>
      <Header/>
      <Container className="py-4">
          <Row className="justify-content-center mb-4">
            <Col md="auto">
              <h1 className="home-header">Study With Me</h1>
            </Col>
          </Row>
        </Container>

      <StudyForm/>

      <Row>
        {studyGroups.map((group) => (
          <Col md={6} lg={4} key={group.id}>
            <StudyGroupCard {...group} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default StudyGroupList;