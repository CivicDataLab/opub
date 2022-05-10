import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'components/layouts';
import Image from 'next/image';
import { Button } from 'components/actions';
import { CarouselWrapper } from 'components/layouts/Carousel/Carousel';
import { registerPostUpdate } from 'echarts';

const HomeDataCarousel = () => {
  const svgIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="62"
      height="62"
      fill="none"
      viewBox="0 0 56 56"
      className="x"
    >
      <path
        fill="#FFF"
        d="M56 28c0 15.464-12.536 28-28 28S0 43.464 0 28 12.536 0 28 0s28 12.536 28 28Z"
        opacity=".63"
      />
      <path
        fill="#000"
        d="M21 29h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42.39.39 1.02.39 1.41 0l6.59-6.59c.39-.39.39-1.02 0-1.41l-6.58-6.6c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L32.17 27H21c-.55 0-1 .45-1 1s.45 1 1 1Z"
      />
    </svg>
  );

  const data = [
    {
      text: 'National Highways Data - A Placeholder text for Headings',
      content:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
      link: 'k',
      image: '/assets/images/placeholder.jpg',
      pubDate: '12 Apr, 2022',
      org: 'PhonePe',
    },
    {
      text: 'Beti Bachao ',
      content:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
      link: 'k',
      image: '/assets/images/placeholder.jpg',
      pubDate: '13 Jun, 2022',
      org: 'NIC',
    },
  ];
  return (
    <Wrapper>
      <div className="container">
        <Carousel
          label="handpicked datasets"
          nextBtn={svgIcon}
          prevBtn={svgIcon}
        >
          {data.map((item, index) => (
            <div key={`carousel-${index}`}>
              <div className="image">
                <Image
                  alt=""
                  className="placeholder"
                  src={item.image}
                  height={350}
                  width={540}
                />
              </div>
              <div className="carousel__content">
                <h2>{item.text}</h2>
                <p>{item.content}</p>
                <div className="datePublisher">
                  <h4>{item.pubDate}</h4>
                  <h4>.</h4>
                  <h4>{item.org}</h4>
                </div>
                <div className='buttonsAlign'>
                  <Button kind="primary" size='sm'> Explore Viz. </Button>
                  <Button kind="primary-outline" size='sm'> See Data Viz. Gallery </Button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </Wrapper>
  );
};

export default HomeDataCarousel;

const Wrapper = styled.div`
padding-block-end: 10%;
background: #f7f9fa;

.placeholder{
  border: 1px solid #D1CDD1 !important;
  border-radius:6px;
}

.carouselBtnWrapper {
  margin-top:-18%;
  button:last-child {
      margin-left: 35%;
  }
}

.datePublisher {
    display: flex;
    flex-wrap: nowrap;

    color: #788896;
    margin-bottom: 2%;

    h4 {
      margin-left: 1%;  
    }

    h4:first-child {
        margin-left: 0;  
      }
}

.buttonsAlign {
    display: flex;
    flex-wrap: nowrap;

    button:last-child {
        margin-left: 1%;
    }
}

.carousel__content {
  flex-basis: 50%;
  padding: 2%;
  
  h2 {
    font-weight: var(--font-weight-bold);
    font-size: 24px;
  }
  
  p {
    font-weight: var(--font-weight-light);
    font-size: 16px;
    margin-top:16px;
    margin-bottom:24px;
  }
  
  @media (max-width: 980px) {
    width: 90%;
  }
}
  @media (max-width: 935px) {
    .image {
      display:none;
    }
    .carousel__content {
      flex-basis: 95%;
    }
    .carouselBtnWrapper {
      margin-top:30px;
      display:block;
    }
  }
  ${CarouselWrapper} {
    // background: #EBF0FF;
    padding:32px;
    // border: 1px solid #D1CDD1;
    box-sizing: border-box;
    border-radius: 12px;
    .keen-slider__slide {
      display:flex;
      flex-basis:50%;
      gap:24px;
    }
    .carouselPrevBtn{
      svg {
       transform:rotate(180deg);
       filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.08));
       margin-right:10px;
      }
    }
    .carouselNextBtn{
      filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.08));
    }
  }
 }
`;

const CarouselHeading = styled.div`
  padding: 100px 0 40px 0;
  .heading__text {
    display: flex;
    h4 {
      color: rgba(0, 0, 0, 0.32);
      font-family: Rubik;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
    }
    hr {
      width: 56px;
      background: #4965b2;
      border-radius: 1px;
      margin: 15px;
    }
  }
  .heading__content {
    font-weight: normal;
    font-size: 40px;
    padding: 10px 0;
    line-height: 1;
  }
`;
