import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { StudyContext } from './StudyContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StudySchedule from './StudySchedule';

const StudyDetail = () => {
  const { studyId } = useContext(StudyContext);

  const [studyDetail, setStudyDetail] = useState(null);
  const [studyGroupLeader, setStudyGroupLeader] = useState(null);
  const [studyScheduleDetail, setStudyScheduleDetail] = useState(null);

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
        console.log('Response data:', response.data); // 서버 응답 확인
        const { studyDetail, studyGroupLeader, studyScheduleDetail } = response.data;
        setStudyDetail(studyDetail);
        setStudyGroupLeader(studyGroupLeader);
        setStudyScheduleDetail(studyScheduleDetail);
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

  if (!studyDetail || !studyGroupLeader || !studyScheduleDetail) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Header />
      <Row className="my-4">
        <Col md={8}>
          <Card>
            <Card.Img variant="top" src={studyDetail.studyImageUrl} alt={studyDetail.title} />
            <Card.Body>
              <Card.Title>{studyDetail.title}</Card.Title>
              <Card.Text>{studyDetail.introduction}</Card.Text>
              <Card.Text>Topic: {studyDetail.topic}</Card.Text>
              <Card.Text>Difficulty: {studyDetail.difficulty}</Card.Text>
              <Card.Text>Tags: {studyDetail.tag}</Card.Text>
              <Card.Text>Status: {studyDetail.state ? 'Active' : 'Inactive'}</Card.Text>
            </Card.Body>
          </Card>
          <Card className="mt-4">
            <Card.Body>
              <Card.Title>Group Leader</Card.Title>
              <Card.Text>Name: {studyGroupLeader.name}</Card.Text>
              <Card.Text>Preferred Area: {studyGroupLeader.preferredArea}</Card.Text>
              <img src={studyGroupLeader.profileImage} alt={studyGroupLeader.name} style={{ width: '100px', height: '100px' }} />
            </Card.Body>
          </Card>
          <Card className="mt-4">
            <Card.Body>
              <Card.Title>Schedule</Card.Title>
              <Card.Text>Start Day: {studyScheduleDetail.startDay}</Card.Text>
              <Card.Text>Week Day: {studyScheduleDetail.weekDay}</Card.Text>
              <Card.Text>Time: {studyScheduleDetail.time}</Card.Text>
              <Card.Text>Participants: {studyScheduleDetail.nowPeople}/{studyScheduleDetail.recruitPeople}</Card.Text>
              <Card.Text>Status: {studyScheduleDetail.state ? 'Ongoing' : 'Completed'}</Card.Text>
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