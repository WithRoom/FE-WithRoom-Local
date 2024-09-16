import React from 'react';
import { Calendar, Heart, Share2 } from 'lucide-react';
import { Card, Button } from 'react-bootstrap';

const StudySchedule = ({ studyScheduleDetail }) => {
  return (
    <Card className="w-64 bg-gray-100 shadow-md">
      {/* Card Header */}
      <Card.Header className="bg-gray-200 py-2 d-flex align-items-center">
        <Calendar className="mr-2" size={20} />
        <h2 className="text-lg font-semibold mb-0">스터디 일정</h2>
      </Card.Header>

      {/* Card Content */}
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between mb-4">
          {['월', '화', '수', '목', '금', '토', '일'].map((day, index) => (
            <div
              key={index}
              className={`w-8 h-8 d-flex align-items-center justify-content-center rounded-circle ${index === 0 ? 'bg-primary text-white' : ''}`}
            >
              {day}
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <div className="d-flex justify-content-between">
            <span className="text-primary">시작일</span>
            <span>{studyScheduleDetail.startDay}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>시간</span>
            <span>{studyScheduleDetail.time}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>모집 인원</span>
            <span>{studyScheduleDetail.nowPeople}/{studyScheduleDetail.recruitPeople}</span>
          </div>
        </div>
      </Card.Body>

      {/* Card Footer */}
      <Card.Footer className="d-flex flex-column space-y-2">
        <Button className="w-100 bg-gray-300 text-gray-700 hover:bg-gray-400">참여하기</Button>
        <div className="d-flex justify-content-between w-100">
          <Button variant="outline-secondary" className="flex-1 mr-1">
            <Share2 size={16} className="mr-1" />
            공유하기
          </Button>
          <Button variant="outline-secondary" className="flex-1 ml-1">
            <Heart size={16} className="mr-1" />
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default StudySchedule;