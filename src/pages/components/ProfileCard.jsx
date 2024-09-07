import React from 'react';
import { Card, Badge } from 'react-bootstrap';

const ProfileCard = ({ name, preferredLocation, interests }) => {
    console.log({ name, preferredLocation, interests }); // Log the props
    return (
      <Card className="profile-card">
        <Card.Header className="text-center">
          <div className="profile-avatar">
            <i className="bi bi-person"></i>
          </div>
        </Card.Header>
        <Card.Body>
          <div className="profile-item">
            <span className="profile-label">이름</span>
            <span className="profile-value">{name}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">선호지역</span>
            <span className="profile-value">{preferredLocation}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">관심분야</span>
            {interests.map((interest, index) => (
              <Badge key={index} bg="primary" className="me-1">{interest}</Badge>
            ))}
          </div>
        </Card.Body>
      </Card>
    );
  };

export default ProfileCard;