import React, { useRef, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { Button } from 'components/actions';
import { ArrowTail } from 'components/icons';

const data = [
  {
    text: 'National Highways Data - A Placeholder text for Headings',
    content:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
    link: 'k',
    image: '/assets/images/placeholder.jpg',
    pubDate: '12 Apr, 2022',
    org: 'PhonePe',
    tag: 'Category Tag'
  },
  {
    text: 'Beti Bachao ',
    content:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
    link: 'k',
    image: '/assets/images/placeholder.jpg',
    pubDate: '13 Jun, 2022',
    org: 'NIC',
    tag: 'Category Tag'
  },
  {
    text: 'Beti Bachao ',
    content:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
    link: 'k',
    image: '/assets/images/placeholder.jpg',
    pubDate: '13 Jun, 2022',
    org: 'NPCI',
    tag: 'Category Tag'
  },
];

const HomeBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  function updateSchemes(pos) {
    const len = data.length - 1;
    if (pos == -1 && currentSlide == 0) {
      setCurrentSlide(len);
    } else if (pos == 1 && currentSlide == len) {
      setCurrentSlide(0);
    } else setCurrentSlide((prevState) => prevState + pos);
  }

  return (
    <section className="container">
      <FeaturedCarousalMain>
        <h1>Featured Datasets</h1>
        <div className='datasets__container'>
          <button>
            <ArrowTail className='reverseArrow'/>
          </button>
          <div className='dataset__cardItems'>
          {data.map((item, index) => (
              <a key={`FeaturedItem-${index}`}>
                <div className='itemCard'>
                  <p>Category Dataset</p>
                  <h3>{item.text}</h3>
                  <div className="datePublisher">
                    <h4>{item.pubDate}</h4>
                    <h4>.</h4>
                    <h4>{item.org}</h4>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <button>
            <ArrowTail />
          </button>
        </div>    
      </FeaturedCarousalMain>        
    </section>
  );
};

export default HomeBanner;

const FeaturedCarousalMain = styled.div`
  text-align: center;
  position: absolute;
  left:0;
  right:0;
  margin-top: -8%;
  

  .datasets__container{
    display: flex;

    justify-content: center;
    padding-left: 10vw;
    padding-right: 10vw;
  }

  .reverseArrow {
    transform: rotate(180deg);
  }

  .dataset__cardItems{
    display: flex;

    justify-content: space-between;
    text-align: left;
    width: 100%;

    .itemCard {
      padding: 1%;
      margin: 2%;
      border: 2px solid #c3cfd9;
      background: white;
      align-items: center;
      width: 20vw;
      height: 15vh;
      align-content: space-between;
    }
    
    @media (max-width: 980px) {
      width: 90%;
    }

    .datePublisher {
      display: flex;
      margin-right: 2px;
      color: #788896;
    }
  }
`;

const CardItems = styled.div`
  display: flex;
    
  .itemCard {
    padding-top: 1%;
    padding-bottom: 1%;
    margin: 2%;
    border: 2px solid #dfe6ed;
    background: white;
    align-items: center;
  }
  
  @media (max-width: 980px) {
    width: 90%;
  }
`;

const Card = styled.div`
  
  border: 1px solid #c3cfd9;
  // margin-top: -86px;
  background-color: white;
  // margin-bottom: 86px;

  button {
    margin-top: 1%;
    position: relative;
    float: left;
    margin-left: 1%;
    font-size: 120%;
    padding: 1%;
  }
  button:first-child {
      margin-left: 0;
  }

  .actionButtons {
    margin-top: 3%;
  }

  figure {
    line-height: 0;
    display: flex;
  }

  @media (max-width: 768px) {
    padding: 24px;

    figure {
      display: none;
    }
  }
`;
