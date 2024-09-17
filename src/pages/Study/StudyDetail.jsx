import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import DOMPurify from 'dompurify';
import { StudyContext } from './StudyContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StudySchedule from './StudySchedule';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const StudyDetail = () => {
  const { studyId } = useContext(StudyContext);

  const [studyDetail, setStudyDetail] = useState(null);
  const [studyGroupLeader, setStudyGroupLeader] = useState(null);
  const [studyScheduleDetail, setStudyScheduleDetail] = useState(null);
  const [studyCommentList, setStudyCommentList] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchStudyDetail = async () => {
      if (!studyId) {
        console.error('No studyId found in context');
        return;
      }

      try {
        console.log(`Fetching study details for studyId: ${studyId}`);
        const response = await axios.post(`/study/info/detail`, { studyId }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        });
        console.log('Response data:', response.data);
        const { studyDetail, studyGroupLeader, studyScheduleDetail, studyCommentList } = response.data;
        setStudyDetail(studyDetail);
        setStudyGroupLeader(studyGroupLeader);
        setStudyScheduleDetail(studyScheduleDetail);
        setStudyCommentList(studyCommentList);
        console.log('Study studyCommentList:', studyCommentList);
      } catch (error) {
        console.error('Error fetching study detail:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error fetching study detail',
          text: error.message,
        });
      }
    };

    fetchStudyDetail();
  }, [studyId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      Swal.fire({
        icon: 'error',
        title: '댓글을 입력해주세요.',
      });
      return;
    }

    try {
      const response = await axios.post('/comment/create', {
        studyId,
        memberId: localStorage.getItem('memberId'), // Assuming memberId is stored in localStorage
        content: newComment,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      });

      setStudyCommentList([...studyCommentList, response.data]);
      setNewComment('');
      Swal.fire({
        icon: 'success',
        title: '댓글이 추가되었습니다.',
      });
    } catch (error) {
      console.error('Error creating comment:', error);
      Swal.fire({
        icon: 'error',
        title: '댓글 추가에 실패했습니다.',
        text: error.message,
      });
    }
  };

  if (!studyDetail || !studyGroupLeader || !studyScheduleDetail) {
    return (
      <Container>
        <Header />
        <Row className="my-4">
          <Col md={8}>
            <Skeleton height={200} />
            <Skeleton count={5} style={{ marginTop: '10px' }} />
          </Col>
          <Col md={4}>
            <Skeleton height={300} />
          </Col>
        </Row>
        <Footer />
      </Container>
    );
  }

  const sanitizedIntroduction = DOMPurify.sanitize(studyDetail.introduction.replace(/<\/?p>/g, ''));

  return (
    <Container>
      <Header />
      <Row className="my-4">
        <Col md={1}>
          <Card className="mt-4 shadow-sm">
            <Card.Img variant="top" src={studyDetail.studyImageUrl} alt={studyDetail.title} style={{ width: '100%', height: 'auto' }} />
          </Card>
        </Col>
        <Col md={7}>
          <Card className="mt-4 shadow-sm">
            <Card.Body>
              <Card.Title>{studyDetail.title}</Card.Title>
              <Card.Text dangerouslySetInnerHTML={{ __html: sanitizedIntroduction }} />
              <Card.Text><strong>주제</strong> {studyDetail.topic}</Card.Text>
              <Card.Text><strong>난이도</strong> {studyDetail.difficulty}</Card.Text>
              <Card.Text><strong>태그</strong> {studyDetail.tag}</Card.Text>
              <Card.Text><strong>상태</strong> {studyDetail.state ? 'Active' : 'Inactive'}</Card.Text>
            </Card.Body>
          </Card>
          <Row>
            <Col md={6}>
              <Card className="mt-4 shadow-sm">
                <Card.Body>
                  <Card.Title>그룹장 정보</Card.Title>
                  <Card.Text><strong>이름</strong> {studyGroupLeader.name}</Card.Text>
                  <Card.Text><strong>선호 지역</strong> {studyGroupLeader.preferredArea}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="mt-4 shadow-sm">
                <Card.Body>
                  <Card.Title>스터디 일정</Card.Title>
                  <Card.Text><strong>시작일</strong> {studyScheduleDetail.startDay}</Card.Text>
                  <Card.Text><strong>스터디 요일</strong> {studyScheduleDetail.weekDay}</Card.Text>
                  <Card.Text><strong>스터디 시간대</strong> {studyScheduleDetail.time}</Card.Text>
                  <Card.Text><strong>현재 인원</strong> {studyScheduleDetail.nowPeople}/{studyScheduleDetail.recruitPeople}</Card.Text>
                  <Card.Text><strong>진행 상태</strong> {studyScheduleDetail.state ? 'Ongoing' : 'Completed'}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Card className="mt-4 shadow-sm">
            <Card.Body>
              <Card.Title>댓글</Card.Title>
              <ListGroup variant="flush">
                {studyCommentList.map((comment, index) => (
                  <ListGroupItem key={index}>
                    <div className="d-flex align-items-center">
                      <img src={comment.profileImage} alt={comment.nickName} className="rounded-circle" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
                      <div>
                        <strong>{comment.nickName}</strong>
                        <p>{comment.content}</p>
                      </div>
                    </div>
                  </ListGroupItem>
                ))}
              </ListGroup>
              <Form onSubmit={handleCommentSubmit} className="mt-3">
                <Form.Group controlId="newComment">
                  <Form.Label>새 댓글</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="댓글을 입력하세요..."
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-2">
                  댓글 추가
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <StudySchedule studyScheduleDetail={studyScheduleDetail} />
        </Col>
      </Row>
      <Footer />
    </Container>
  );
};

export default StudyDetail;