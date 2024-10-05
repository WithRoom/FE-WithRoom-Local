import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { Gear } from 'react-bootstrap-icons';
import { Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProfileCard = ({ name, preferredLocation, interests }) => {
    const navigate = useNavigate();

    const openProfile = () => {
        navigate('/update/profile');
    };

    return ( 
      <Card className="profile-card" style={{ position: 'relative' }}>
         <div className="gear-icon" 
             onClick={openProfile} 
             style={{
               position: 'absolute',
               top: '10px',
               right: '10px',
               cursor: 'pointer'
             }}>
          <Gear size={20} />
        </div>
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