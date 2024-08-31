import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';

const StudyGroupCard = ({ title, description, tags, status, members, maxMembers }) => {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <div className="mb-2">
          {tags.map((tag, index) => (
            <Badge bg="secondary" className="me-1" key={index}>
              {tag}
            </Badge>
          ))}
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Badge bg={status === '모집중' ? 'success' : 'danger'}>{status}</Badge>
            <span className="ms-2">
              {members}/{maxMembers} 명
            </span>
          </div>
          <Button variant="primary">참여하기</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default StudyGroupCard;