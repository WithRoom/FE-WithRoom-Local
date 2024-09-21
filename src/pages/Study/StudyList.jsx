import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import axios from 'axios';
import StudyCard from './StudyCard';
import Header from '../components/Header';

const StudyList = () => {
  const [allStudies, setAllStudies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const studiesPerPage = 8;

  useEffect(() => {
    fetchAllStudies();
  }, []);

  const fetchAllStudies = async () => {
    try {
      const response = await axios.get('/home/info', {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      });
      setAllStudies(response.data.homeStudyInfoList);
    } catch (error) {
      console.error('Error fetching studies:', error);
    }
  };

  const indexOfLastStudy = currentPage * studiesPerPage;
  const indexOfFirstStudy = indexOfLastStudy - studiesPerPage;
  const currentStudies = allStudies.slice(indexOfFirstStudy, indexOfLastStudy);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(allStudies.length / studiesPerPage);

  return (
    <Container>
      <Header />
      <Row xs={1} md={2} lg={4} className="mt-4 g-4">
        {currentStudies.map((study) => (
          <Col key={study.studyId}>
            <StudyCard study={study} />
          </Col>
        ))}
      </Row>
      <Row className="mt-4">
        <Pagination className="d-flex justify-content-center">
        <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
            {[...Array(totalPages).keys()].map((number) => (
                <Pagination.Item
                key={number + 1}
                active={number + 1 === currentPage}
                onClick={() => handlePageChange(number + 1)}
                >
                {number + 1}
                </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
            <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
      </Row>
    </Container>
  );
};

export default StudyList;