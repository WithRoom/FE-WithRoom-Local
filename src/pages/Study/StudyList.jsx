import React, { useState, useEffect } from 'react';
import { Container, Grid, Pagination as MuiPagination, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import StudyCard from './StudyCard';
import Header from '../components/Header';
import StudySearchFilter from './StudySearchFilter';
import noSearchImg from '../../images/nosearch.png';
import { useLocation } from 'react-router-dom';

const StudyList = () => {
  const location = useLocation();

  const initialStudies = location.state?.homeStudyInfoList || [];
  const [allStudies, setAllStudies] = useState(initialStudies);
  const [currentPage, setCurrentPage] = useState(1);

  const studiesPerPage = 8;

  useEffect(() => {
    if (initialStudies.length === 0) {
      fetchAllStudies();
      return;
    }else{
      setAllStudies(initialStudies);
      return;
    }
  }, [initialStudies]);

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

  // Update studies list with search results
  const updateStudies = (filteredStudies) => {
    setAllStudies(filteredStudies);
    setCurrentPage(1); // Reset to first page on search update
  };

  const indexOfLastStudy = currentPage * studiesPerPage;
  const indexOfFirstStudy = indexOfLastStudy - studiesPerPage;
  const currentStudies = allStudies.slice(indexOfFirstStudy, indexOfLastStudy);

  const handlePageChange = (event, pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(allStudies.length / studiesPerPage);

  return (
    <Container>
      <Header />
      <Card>
        <CardContent>
          <StudySearchFilter updateStudies={updateStudies} />
        </CardContent>
      </Card>
      {currentStudies.length > 0 ? (
        <Grid container spacing={4} className="mt-4">
          {currentStudies.map((study) => (
            <Grid item xs={12} md={6} lg={3} key={study.studyId}>
              <StudyCard study={study} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh', width: '100%' }}>
          <div className="text-center">
            <img src={noSearchImg} alt="noSearchImg" style={{ width: '300px', height: 'auto', marginBottom: '20px' }} />
            <Typography variant="h6">No studies found</Typography>
          </div>
        </div>
      )}
      <Grid container justifyContent="center" className="mt-4">
        <MuiPagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Grid>
    </Container>
  );
};

export default StudyList;
