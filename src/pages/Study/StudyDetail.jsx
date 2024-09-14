import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { StudyContext } from './StudyContext';

const StudyDetail = () => {
  // const { studyId } = useContext(StudyContext);

  const studyId = 1; // 테스트를 위한 설정

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
        const response = await axios.get(`/study/info/detail`, {
          data: { studyId },
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        });
        const { studyDetail, studyGroupLeader, studyScheduleDetail } = response.data;
        setStudyDetail(studyDetail);
        setStudyGroupLeader(studyGroupLeader);
        setStudyScheduleDetail(studyScheduleDetail);
      } catch (error) {
        console.error('Error fetching study detail:', error);
      }
    };

    fetchStudyDetail();
  }, [studyId]);

  if (!studyDetail || !studyGroupLeader || !studyScheduleDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{studyDetail.title}</h1>
      <img src={studyDetail.studyImageUrl} alt={studyDetail.title} />
      <p>{studyDetail.introduction}</p>
      <p>Topic: {studyDetail.topic}</p>
      <p>Difficulty: {studyDetail.difficulty}</p>
      <p>Tags: {studyDetail.tag}</p>
      <p>Status: {studyDetail.state ? 'Active' : 'Inactive'}</p>

      <h2>Group Leader</h2>
      <p>Name: {studyGroupLeader.name}</p>
      <p>Preferred Area: {studyGroupLeader.preferredArea}</p>
      <img src={studyGroupLeader.profileImage} alt={studyGroupLeader.name} />

      <h2>Schedule</h2>
      <p>Start Day: {studyScheduleDetail.startDay}</p>
      <p>Week Day: {studyScheduleDetail.weekDay}</p>
      <p>Time: {studyScheduleDetail.time}</p>
      <p>Participants: {studyScheduleDetail.nowPeople}/{studyScheduleDetail.recruitPeople}</p>
      <p>Status: {studyScheduleDetail.state ? 'Ongoing' : 'Completed'}</p>
    </div>
  );
};

export default StudyDetail;