import React from 'react';
import { Link } from 'react-router-dom';
import Layout from './components/Layout';
import { Container, Row, Col, Button} from 'react-bootstrap';
import kakaoimg from '../images/kakao.png';


import './Home.css'; // Import the CSS file

const Home = () => {
  return (
    <Layout>
      <Container className="home-container">
        <Row className="justify-content-center">
          <Col md="auto">
            <h1 className="home-header">Home Page</h1>
            <p>Welcome to the home page!</p>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="auto">
            <Link to="/login" className="m-2">
            <Button variant="outline-primary" style={{ backgroundColor: 'white', borderColor: 'yellow' }}>
            <img src={kakaoimg} alt="Login" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
              </Button>
            </Link>
              <Link to="/study" className="m-2">
                <Button as="div" variant="secondary">Study</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Home;