import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ImageImport from './ImageImport';
import 'bootstrap/dist/css/bootstrap.min.css';
import test from '../../images/test.png';
import study from '../../images/study.png';

function CarouselFadeExample() {
  return (
    <Carousel fade>
      <Carousel.Item>
         <a href="https://www.notion.so/Study-With-Me-7ffb049d2bba4814a4da7dc010d8216e">
            <ImageImport src={test} alt="인프런" />
          </a>
        <Carousel.Caption>
          <h3>Welcome</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
         <ImageImport src={study} alt="스터디" />
      <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
          <ImageImport src={test} alt="인프런" />
      <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselFadeExample;