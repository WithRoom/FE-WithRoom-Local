import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Pagination } from 'react-bootstrap';
import axios from 'axios';
import StudyCard from './StudyCard';
import Header from '../components/Header';
import StudySearchFilter from './StudySearchFilter';
import noSearchImg from '../../images/nosearch.png';

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

  const updateStudies = (filteredStudies) => {
    setAllStudies(filteredStudies);
    setCurrentPage(1); // 검색 결과가 업데이트되면 첫 페이지로 이동
  };

  const indexOfLastStudy = currentPage * studiesPerPage;
  const indexOfFirstStudy = indexOfLastStudy - studiesPerPage;
  const currentStudies = allStudies.slice(indexOfFirstStudy, indexOfLastStudy);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(allStudies.length / studiesPerPage);

  return (
    <Container>
      <Header />
      <Card>
         <StudySearchFilter updateStudies={updateStudies} />
      </Card>
        {currentStudies.length > 0 ? (
            <div className="mt-4 g-4 row row-cols-lg-4 row-cols-md-2 row-cols-1">
              {currentStudies.map((study) => (
                <div className="col" key={study.studyId}>
                  <StudyCard study={study} />
                </div>
              ))}
            </div>
          ) : (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh', width: '100%' }}>
              <div className="text-center">
                <img src={noSearchImg} alt="noSearchImg" style={{ width: '300px', height: 'auto', marginBottom: '20px' }} />
              </div>
            </div>
          )}

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