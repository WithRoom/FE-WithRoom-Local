import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Heart, Users } from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';

const LikeButton = ({ isLiked, onClick, studyId }) => {
  const handleLikeClick = () => {
    axios.post('/study/interest', { studyId }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
    })
      .then((response) => {
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: '관심 등록되었습니다.',
          showConfirmButton: false,
          timer: 1500
        });
        onClick();
      })
      .catch((error) => {
        console.error("Error during interest request:", error);
        Swal.fire({
          icon: 'error',
          title: '관심 등록에 실패했습니다.',
          text: error.response ? error.response.data : 'Unknown error',
        });
      });
  };

  return (
    <Button
      variant="link"
      className="p-0"
      onClick={handleLikeClick}
    >
      <Heart fill={isLiked ? "red" : "none"} color={isLiked ? "red" : "black"} />
    </Button>
  );
};

const StudyImage = ({ src }) => (
  <Card.Img
    variant="top"
    src={src}
    className="my-3"
  />
);

const Tags = ({ tags }) => {
  if (!tags || tags.length === 0) return null;
  const tagsString = Array.isArray(tags) ? tags.join(',') : tags;
  const tagArray = tagsString.split(',').map(tag => tag.trim());

  return (
    <div className="mb-2">
      {tagArray.map((tag, index) => (
        <span key={index} className="badge bg-secondary me-2">#{tag}</span>
      ))}
    </div>
  );
};

const OnlineStatus = ({ type }) => (
  <div className="mb-2">
    <span className="text-muted">{type === 'online' ? '온라인' : '오프라인'}</span>
  </div>
);

const RecruitmentInfo = ({ nowPeople, recruitPeople }) => (
  <div>
    <Users size={18} className="me-1" />
    {nowPeople}/{recruitPeople}
  </div>
);

const ActionButton = ({ state, studyId }) => {
  console.log(state, studyId);

  const studyJoin = async () => {
    try {
      const response = await axios.post('/study/join', { studyId },
        { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      });
      console.log('Join response:', response.data);

      Swal.fire({
        icon: 'success',
        title: '스터디 신청 완료',
        showConfirmButton: false,
        timer: 1500
      })

    } catch (error) {
      console.error('Error joining study:', error);
    }
  };

  return (
    <Button
      variant="outline-primary"
      size="sm"
      onClick={state ? studyJoin : null}
      disabled={!state}
    >
      {state ? "참여하기" : "마감됨"}
    </Button>
  );
};

const StudyCard = ({ study }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Link to={`/study/info/detail?studyId=${study.studyId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card className="mb-3" style={{ width: '18rem', borderRadius: '15px', border: '1px solid lightgray' }}>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start">
            <Card.Title>{study.title}</Card.Title>
            <LikeButton isLiked={isLiked} onClick={() => setIsLiked(!isLiked)} studyId={study.studyId} />
          </div>
          <StudyImage src={study.studyImageUrl} />
          <Tags tags={[study.topic, study.difficulty]} />
          <OnlineStatus type={study.type} />
          <div className="d-flex justify-content-between align-items-center">
            <RecruitmentInfo nowPeople={study.nowPeople} recruitPeople={study.recruitPeople} />
            <ActionButton state={study.state} studyId={study.studyId} />
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default StudyCard;