import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button, Container, ButtonGroup } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const StudyForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [memberCount, setMemberCount] = useState('');
  const [days, setDays] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [difficulty, setDifficulty] = useState('');
  const [searchTags, setSearchTags] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [file, setFile] = useState(null);  

  const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];
  const studyTags = ['개념학습', '응용/실용', '프로젝트', '챌린지', '자격증/시험', '취업/코테', '특강', '기타'];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    const validExtensions = ['image/jpeg', 'image/png', 'image/gif'];

    if (file && validExtensions.includes(file.type)) {
      setImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid file type',
        text: 'Please select an image file (jpeg, png, gif).',
      });
    }
  };

  const uploadImageToS3 = async (e) => {
    e.preventDefault();
    if (!image) return '';

    const token = localStorage.getItem('accessToken');

    const formData = new FormData();
    formData.append('file', file);

    /*
    * file : {}
    */

    console.log('Uploading image:', formData);

    try {
        const response = await axios.post('/image/upload/study', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            },
        });
    
        console.log('Image uploaded:', response);
    
        const imageUrl = response.data.imageUrl; 


        setImageUrl(imageUrl);
        Swal.fire({
            icon: 'success',
            title: 'Image uploaded successfully',
        });
    } catch (error) {
        console.error('Error uploading image:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error uploading image',
            text: error.message,
        });
    }
  };

  const createRegisterForm = async (e) => {
    e.preventDefault();

    console.log('imageUrl : ' ,imageUrl);

    if (!imageUrl) {
      Swal.fire({
        icon: 'error',
        title: '이미지를 업로드해주세요!',
      });
      return;
    }

    // Validation
    if (!title || !type || !memberCount || !days.length || !startDate || !duration || !description || !tags.length || !difficulty || !searchTags || !imageUrl) {
      Swal.fire({
        icon: 'error',
        title: '모든 필드를 채워주세요!',
      });
      return;
    }

    console.log('Form submitted:', imageUrl, title, type, memberCount, days, startDate, duration, description, tags, difficulty, searchTags);

    const formData = {
      studyInfo: {
        studyImageUrl: imageUrl,
        title,
        type,
        recruitPeople: parseInt(memberCount, 10),
        introduction: description,
        topic: tags.join(', '),
        difficulty,
        tag: searchTags,
      },
      studySchedule: {
        weekDay: days.join(', '),
        startDay: startDate,
        period: duration,
        time: '',
      },
    };
    
    console.log('Form data:', formData);

    const token = localStorage.getItem('accessToken');
    console.log('Token:', token);

    axios.post('/study/create', formData, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) => {
      console.log(response);
      Swal.fire({
        icon: 'success',
        title: '스터디 생성 완료!',
      });
      navigate('/home');
    })
    .catch((error) => {
      console.error("Error during form submission:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error during form submission',
        text: error.message,
      });
    });
  };

  return (
    <Container>
      <Form onSubmit={createRegisterForm}>
        <Row className="mb-4">
          <Col md={6}>
            <div className="position-relative" style={{height: '400px', background: '#f8f9fa', border: '1px solid #dee2e6'}}>
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div className="position-absolute top-50 start-50 translate-middle text-center">
                  <p>대표 이미지 삽입</p>
                  <p>(권장사이즈 1200*1200px)</p>
                </div>
              )}
              <div className="position-absolute bottom-0 end-0 m-2">
                <Button variant="light" className="rounded-circle">
                  <i className="bi bi-camera"></i>
                  <input type="file" accept="image/*" onChange={handleImageChange} style={{ opacity: 0, position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }} />
                </Button>
              </div>
            </div>
            <Button variant="primary" onClick={uploadImageToS3} className="mt-2">이미지 업로드</Button>
          </Col>
          <Col md={6}>
            <div className="text-end mt-4">
                <Button variant="secondary" type="submit">스터디 생성</Button>
            </div>
            <Form.Group className="mb-3">
              <Form.Label>스터디 제목<span className="text-danger">*</span></Form.Label>
              <Form.Control 
                type="text" 
                placeholder="50자 내의 스터디 제목을 입력해주세요."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={50}
              />
              <Form.Text className="text-end d-block">{title.length}/50</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>스터디 유형<span className="text-danger">*</span></Form.Label>
              <div>
                <Form.Check
                  inline
                  type="radio"
                  label="오프라인"
                  name="studyType"
                  id="offline"
                  checked={type === 'offline'}
                  onChange={() => setType('offline')}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="온라인"
                  name="studyType"
                  id="online"
                  checked={type === 'online'}
                  onChange={() => setType('online')}
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>모집 인원<span className="text-danger">*</span></Form.Label>
              <Form.Control 
                type="number" 
                placeholder="명"
                value={memberCount}
                onChange={(e) => setMemberCount(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <h4>상세 일정</h4>
        <Form.Group className="mb-3">
          <Form.Label>스터디 요일<span className="text-danger">*</span></Form.Label>
          <div>
            {daysOfWeek.map((day) => (
              <Form.Check
                key={day}
                inline
                type="checkbox"
                label={day}
                id={`day-${day}`}
                checked={days.includes(day)}
                onChange={() => {
                  if (days.includes(day)) {
                    setDays(days.filter(d => d !== day));
                  } else {
                    setDays([...days, day]);
                  }
                }}
              />
            ))}
          </div>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>스터디 시작일<span className="text-danger">*</span></Form.Label>
          <Form.Control 
            type="date" 
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>스터디 기간<span className="text-danger">*</span></Form.Label>
          <Form.Select 
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            <option>선택해주세요</option>
            <option value="1">1주</option>
            <option value="2">2주</option>
            <option value="4">1개월</option>
            <option value="12">3개월</option>
            <option value="24">6개월</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>스터디 소개<span className="text-danger">*</span></Form.Label>
          <ReactQuill 
            value={description} 
            onChange={setDescription}
            style={{height: '200px', marginBottom: '50px'}}
          />
          <Form.Text className="text-muted">
            스터디의 소개, 목표, 대상, 난이도, 진행 방식 등을 설명해주세요
          </Form.Text>
        </Form.Group>

        <h4>스터디 태그 설정</h4>
        <Form.Group className="mb-4">
          <Form.Label>스터디 주제<span className="text-danger">*</span></Form.Label>
          <div>
            {studyTags.map((tag) => (
              <Button
                key={tag}
                variant={tags.includes(tag) ? "primary" : "outline-primary"}
                className="me-2 mb-2"
                onClick={() => {
                  if (tags.includes(tag)) {
                    setTags(tags.filter(t => t !== tag));
                  } else {
                    setTags([...tags, tag]);
                  }
                }}
              >
                {tag}
              </Button>
            ))}
          </div>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>스터디 난이도<span className="text-danger">*</span></Form.Label>
          <ButtonGroup className="d-flex">
            {['초급', '중급', '고급'].map((level) => (
              <Button
                key={level}
                variant={difficulty === level ? "primary" : "outline-primary"}
                onClick={() => setDifficulty(level)}
              >
                {level}
              </Button>
            ))}
          </ButtonGroup>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>검색 태그<span className="text-danger">*</span></Form.Label>
          <Form.Control
            type="text"
            placeholder="최대 5개까지 입력가능 (20자 제한)"
            value={searchTags}
            onChange={(e) => setSearchTags(e.target.value)}
            maxLength={20}
          />
        </Form.Group>
      </Form>
    </Container>
  );
}

export default StudyForm;