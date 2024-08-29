import React from 'react';
import Layout from './components/Layout';
import { Container, Row, Col, Button} from 'react-bootstrap';

import './Home.css'; // Import the CSS file

const Home = () => {
  return (
    <Layout>
      <Container className="home-container">
        <Row className="justify-content-center">
          <Col md="auto">
            <h1 className="home-header">Study With Me</h1>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Home;