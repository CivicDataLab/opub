import React, { useRef, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { Button } from 'components/actions';

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


  return (
    <section className="container FeaturedCarousal">
      <h1>Featured Datasets</h1>
      <div className='CardItems'>
      {data.map((item, index) => (
          <a key={`FeaturedItem-${index}`}>
            <div className='itemCard'>
              <h2>{item.text}</h2>
              <p>{item.content}</p>
              <div className="datePublisher">
                <h4>{item.pubDate}</h4>
                <h4>.</h4>
                <h4>{item.org}</h4>
              </div>
            </div>
          </a>
          // <div key={`carousel-${index}`}>
          //   <div className="content">
          //     <h2>{item.text}</h2>
          //     <p>{item.content}</p>
          //     <div className="datePublisher">
          //       <h4>{item.pubDate}</h4>
          //       <h4>.</h4>
          //       <h4>{item.org}</h4>
          //     </div>
          //   </div>
          // </div>
        ))}
      </div>
      
    </section>
  );
};

export default HomeBanner;

const FeaturedCarousal = styled.div`
  text-align: center;
`;

const CardItems = styled.div`
  display: flex;

  .carousel__content {
    flex-basis: 50%;
    padding: 2%;
    
    .itemCard {
      padding-top: 1%;
      padding-bottom: 1%;
      margin: 2%;
      border: 2px solid #dfe6ed;
      background: white;
      display: flex;
      align-items: center;
    }
    
    @media (max-width: 980px) {
      width: 90%;
    }
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

const Options = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
  gap: 16px;

  > label {
    min-width: 45%;
  }
`;

const Item = styled.label`
  display: grid;
  grid-template-columns: 1em auto;
  gap: 0.5em;

  input {
    /* Remove native radio style */
    appearance: none;
    background-color: #fff;
    margin: 0;

    font: inherit;
    color: currentColor;
    width: 1.15em;
    height: 1.15em;
    border: 0.15em solid currentColor;
    border-radius: 50%;
    transform: translateY(0.2em);

    display: grid;
    place-content: center;

    &::before {
      content: '';
      width: 0.65em;
      height: 0.65em;
      border-radius: 50%;
      transform: scale(0);
      transition: 120ms transform ease-in-out;
      box-shadow: inset 1em 1em var(--color-grey-200);

      /* Windows High Contrast Mode */
      background-color: CanvasText;
    }

    &:checked::before {
      transform: scale(1);
    }

    &:focus-visible {
      outline: max(2px, 0.15em) solid currentColor;
      outline-offset: max(2px, 0.15em);
    }
  }

  &.quiz-wrong {
    color: var(--color-error);

    input::before {
      box-shadow: inset 1em 1em var(--color-error);
      transform: scale(1);
    }
  }
`;