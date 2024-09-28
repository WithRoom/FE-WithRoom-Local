import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import { FaBook, FaTrophy, FaTags, FaPaperPlane } from 'react-icons/fa'; // Import the icon
import axios from 'axios';
import Swal from 'sweetalert2';
import DOMPurify from 'dompurify';
import { StudyContext } from './StudyContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StudySchedule from './StudySchedule';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styled from 'styled-components';

const Title = styled.h1`
  font-weight: bold;
  text-align: center;
  font-size: 24px;
  font-family: 'Arial', sans-serif;
  margin-bottom: 20px;
`;

const Content = styled.div`
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f9f9f9;
  margin-bottom: 20px;
  line-height: 1.6;
`;

const IconText = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const Icon = styled.span`
  margin-right: 10px;
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  border: none;
  overflow: hidden;
  margin-top: 20px;
`;

const CommentInput = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 15px;
  resize: vertical;
  font-size: 14px;
  &::placeholder {
    color: #bbb;
  }
`;

const SubmitButton = styled(Button)`
  size: 8px;
  align-self: flex-end;
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 12px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;
  background-color: #000000;
  color: #ffffff;
  border: 2px solid transparent;
  
  &:hover {
    background-color: #black;
    transform: scale(1.05);
    color: #black;
    font-size: 12px;
    border-radius: 25px;
    border: 2px solid #black;

  }
  
  svg {
    margin-left: 8px;
  }
`;

const CommentCount = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const StudyDetail = () => {
  const { studyId } = useContext(StudyContext);

  const [studyDetail, setStudyDetail] = useState(null);
  const [studyGroupLeader, setStudyGroupLeader] = useState(null);
  const [studyScheduleDetail, setStudyScheduleDetail] = useState(null);
  const [studyCommentList, setStudyCommentList] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const fetchStudyDetail = async () => {
      if (!studyId) {
        console.error('No studyId found in context');
        return;
      }

      try {
        const response = await axios.post('/study/info/detail', { studyId }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        });
        setStudyDetail(response.data.studyDetail);
        setStudyGroupLeader(response.data.studyGroupLeader);
        setStudyScheduleDetail(response.data.studyScheduleDetail);
        setStudyCommentList(response.data.studyCommentList);
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
      await axios.post('/comment/create', {
        studyId,
        content: newComment,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      });
  
      Swal.fire({
        icon: 'success',
        title: '댓글이 추가되었습니다.',
      });
  
      const detailResponse = await axios.post('/study/info/detail', { studyId }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      });
  
      setStudyCommentList(detailResponse.data.studyCommentList);
      setNewComment('');
    } catch (error) {
      console.error('Error creating comment:', error);
      Swal.fire({
        icon: 'error',
        title: '댓글 추가에 실패했습니다.',
        text: error.message,
      });
    }
  };

  const handleFinishStudy = async () => {
    try {
      const response = await axios.post('/study/finish', { studyId }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      });

      if (response.data === true) {
        Swal.fire({
          icon: 'success',
          title: '스터디를 마감합니다.',
          showConfirmButton: true,
        });
        setIsFinished(true);
      } else {
        Swal.fire({
          icon: 'error',
          title: '그룹장만 스터디를 마감할 수 있습니다.',
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error('Error finishing study:', error);
      Swal.fire({
        icon: 'error',
        title: '스터디 마감에 실패했습니다.',
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
        <Col md={3}>
          <Card className="mt-4 shadow-sm">
            <Card.Img variant="top" src={studyDetail.studyImageUrl} alt={studyDetail.title} style={{ width: '100%', height: 'auto' }} />
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mt-4 shadow-sm">
            <Card.Body>
              <Title>{studyDetail.title}</Title>
              <Content dangerouslySetInnerHTML={{ __html: sanitizedIntroduction }} />
              <IconText>
                <Icon><FaBook /></Icon>
                <span><strong>주제:</strong> {studyDetail.topic}</span>
              </IconText>
              <IconText>
                <Icon><FaTrophy /></Icon>
                <span><strong>난이도:</strong> {studyDetail.difficulty}</span>
              </IconText>
              <IconText>
                <Icon><FaTags /></Icon>
                <span><strong>태그:</strong> {studyDetail.tag}</span>
              </IconText>
            </Card.Body>
          </Card>
          <Row>
            <Col md={12}>
              <Card className="mt-4 shadow-sm">
                <Card.Body>
                  <Card.Title>그룹장 정보</Card.Title>
                  <Card.Text><strong>이름:</strong> {studyGroupLeader.name}</Card.Text>
                  <Card.Text><strong>선호 지역:</strong> {studyGroupLeader.preferredArea}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Card.Body>
            <CommentCount>댓글 {studyCommentList.length}</CommentCount>
            <ListGroup variant="flush">
              {studyCommentList.map((comment, index) => (
                <ListGroup.Item key={index} className="py-3">
                  <Row className="align-items-center">
                    <Col xs={10} md={11}>
                      <div>[{comment.nickName}] {comment.content}</div>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <CommentForm onSubmit={handleCommentSubmit} className="d-flex flex-column">
                  <CommentInput
                    placeholder="댓글을 입력하세요."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="form-control mb-3" // adds some margin-bottom for spacing
                  />
                  
                  <div className="d-flex justify-content-end">
                    <SubmitButton variant="" type="submit" className="d-flex align-items-center no-border">
                      <span>댓글 등록</span>
                      <FaPaperPlane className="ml-2" />
                    </SubmitButton>
                  </div>
          </CommentForm>

          
          </Card.Body>
        </Col>
        <Col md={3} className="mb-3">
          <StudySchedule studyScheduleDetail={studyScheduleDetail} />
          {isFinished ? (
            <div className="mt-3 text-center text-danger">
              마감된 스터디
            </div>
          ) : (
            <Button variant="danger" className="mt-3" onClick={handleFinishStudy}>
              스터디 마감
            </Button>
          )}
        </Col>
      </Row>
      <Footer />
    </Container>
  );
};

export default StudyDetail;