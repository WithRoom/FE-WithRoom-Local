import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../components/Header';
import StudyForm from './StudyForm';
import MainContent from '../Home/MainContent';

/*
* 모집 완료 : 비활성화
* 모집 중 : 활성화
*/
const StudyGroupList = () => {
  return (
    <Container>
      <StudyForm/>
     
    </Container>
  );
};

export default StudyGroupList;