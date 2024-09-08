import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Heart, Users } from 'lucide-react'; // Import the Users icon

const LikeButton = ({ isLiked, onClick }) => (
  <Button 
    variant="link" 
    className="p-0" 
    onClick={onClick}
  >
    <Heart fill={isLiked ? "red" : "none"} color={isLiked ? "red" : "black"} />
  </Button>
);

const StudyImage = ({ src }) => (
  <Card.Img 
    variant="top" 
    src={src} 
    className="my-3"
  />
);

const Tags = ({ tags }) => {
  if (!tags || tags.length === 0) return null;

  // If tags is an array, join it into a string
  const tagsString = Array.isArray(tags) ? tags.join(',') : tags;

  // Split by comma and trim each tag
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

const RecruitmentInfo = ({  nowPeople , recruitPeople }) => (
  <div>
    <Users size={18} className="me-1" /> {}
    {nowPeople}/{recruitPeople}
  </div>
);

const ActionButton = ({ state }) => (
  <Button variant="outline-primary" size="sm">
    {state ? "참여하기" : "마감됨"}
  </Button>
);

const StudyCard = ({ study }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Card className="mb-3" style={{ width: '18rem', borderRadius: '15px', border: '1px solid lightgray' }}>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
          <Card.Title>{study.title}</Card.Title>
          <LikeButton isLiked={isLiked} onClick={() => setIsLiked(!isLiked)} />
        </div>
        <StudyImage src={study.studyImageUrl} />
        <Tags tags={[study.topic, study.difficulty]} />
        <OnlineStatus type={study.type} />
        <div className="d-flex justify-content-between align-items-center">
          <RecruitmentInfo nowPeople = {study.nowPeople} recruitPeople={study.recruitPeople} />
          <ActionButton state={study.state} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default StudyCard;