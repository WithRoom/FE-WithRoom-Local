import React from 'react';
import { Container, Row, Col, Nav, Button, InputGroup, FormControl } from 'react-bootstrap';
import StudyGroupList from '../Study/StudyGroupList';

const MainContent = () => {
  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="mb-3">전체</h1>
          <Nav variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
              <Nav.Link href="/home">전체</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="recruiting">모집중</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="completed">모집완료</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <InputGroup>
            <FormControl
              placeholder="관심 스터디를 검색해보세요!"
              aria-label="Study search"
              aria-describedby="basic-addon2"
            />
            <Button variant="outline-secondary" id="button-addon2">
              검색
            </Button>
          </InputGroup>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Button variant="outline-secondary" className="me-2 mb-2">최신순</Button>
          <Button variant="outline-secondary" className="me-2 mb-2">정확도순</Button>
          <Button variant="outline-secondary" className="me-2 mb-2">댓글많은순</Button>
          <Button variant="outline-secondary" className="mb-2">좋아요순</Button>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col className="d-flex justify-content-between">
          <Button variant="outline-primary">스터디 가이드</Button>
          <Button variant="primary">글쓰기</Button>
        </Col>
      </Row>

      <StudyGroupList />
    </Container>
  );
};

export default MainContent;