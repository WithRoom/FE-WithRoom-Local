import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaUsers, FaHeart } from 'react-icons/fa';

const StudyCard = ({ study }) => {
  return (
    <Card style={{ width: '18rem', borderRadius: '15px', border: '1px solid lightgray' }}>
      <Card.Body>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Card.Title>{study.title}</Card.Title>
          <FaHeart style={{ color: 'gray', cursor: 'pointer' }} />
        </div>
        <div style={{ height: '100px', backgroundColor: '#f8f9fa', marginBottom: '10px' }}></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <div>{study.hashTags.map(tag => `#${tag} `)}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FaUsers style={{ marginRight: '5px' }} />
            <span>{study.currentMembers}/{study.maxMembers}</span>
          </div>
          <Button variant="outline-secondary" size="sm">Join</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default StudyCard;