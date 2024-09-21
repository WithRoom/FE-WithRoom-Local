import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ImageImport from './ImageImport';
import 'bootstrap/dist/css/bootstrap.min.css';
import home from '../../images/HOME.png';
import study from '../../images/study.png';

function CarouselFadeExample() {
  return (
    <Carousel fade>
      <Carousel.Item>
         <a href="https://www.notion.so/Study-With-Me-7ffb049d2bba4814a4da7dc010d8216e">
            <ImageImport src={home} alt="인프런" />
          </a>
        <Carousel.Caption>
          <h3>Welcome</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
         <ImageImport src={study} alt="스터디" />
      <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
          <ImageImport src={home} alt="인프런" />
      <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselFadeExample;