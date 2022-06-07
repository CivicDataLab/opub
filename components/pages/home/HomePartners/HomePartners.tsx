import React from 'react';
import styled from 'styled-components';
import { Button } from 'components/actions';
import Image from 'next/image';
import Carousel2 from 'components/layouts/Carousel/Carousel2';

const HomePartners = (partnersData) => {
  // console.log(partnersData.partnersData);

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

  const partner = {
    name: 'Google',
    datasetsNumber: '199,812,341',
    avgRating: '4.5',
    downloads: '458762',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
    link: '',
  };

  return (
    <About>
      <div className="container">
        {/* <div className='headingContainer'>
        <h1>Some of Our Partner Organizations</h1>
      </div> */}

        <Carousel2
          prevBtn={svgIcon}
          nextBtn={svgIcon}
          label={''}
          thumbnails={partnersData.partnersData}
        >
          {partnersData.partnersData.map((partner, index) => (
            <div key={`number-slide${index}`}>
              <figure>
                <Image
                  src={
                    partner.image_display_url
                      ? partner.image_display_url
                      : '/assets/images/placeholder.jpg'
                  }
                  width={'100%'}
                  height={'100%'}
                  alt=""
                  className="img-cover"
                />
              </figure>
              <div className="partner___content">
                <h2>{partner.title}</h2>
                <div className="microDetails">
                  <div className="detailsBadge">
                    <h5>Number of Datasets: </h5>
                    <p>{partner.package_count}</p>
                  </div>
                  <div className="detailsBadge">
                    <h5>Average Rating: </h5>
                    <p>{partner.num_followers}</p>
                  </div>
                  <div className="detailsBadge">
                    <h5>Downloads: </h5>
                    <p>{partner.num_followers}</p>
                  </div>
                </div>
                <p>{partner.description}</p>
                <Button kind="primary-outline" size="sm">
                  Explore all {partner.title} data
                </Button>
              </div>
            </div>
          ))}
        </Carousel2>
      </div>
    </About>
  );
};

export default HomePartners;

const About = styled.section`
  background-color: #f7f9fa;

  .headingContainer {
    flex: 1 0 100%;
    align-self: flex-start;
  }

  > .container {
    display: flex;
    flex-wrap: wrap;
    gap: 42px;
    padding-block-end: 20vh;

    > div {
      flex-basis: 0;
      flex-grow: 999;
      min-inline-size: 35%;
    }
  }

  //   p {
  //     margin-top: 12px;
  //   }

  button {
    margin-top: 16px;
  }

  figure {
    flex-grow: 1;
    width: 20%;
  }

  .partner___content {
    // > p {
    //   font-size: 1.2rem;
    // }

    .microDetails {
      display: flex;
      margin-top: 2%;
      margin-bottom: 2%;

      .detailsBadge {
        display: flex;
        font-size: 90%;

        // border: 2px solid grey;
        border-radius: 20px;
        padding-left: 1%;
        padding-right: 1%;
        background: #dfe6ed;
        margin-right: 2%;
        align-items: center;

        h5 {
          color: #eb6a17;
          font-weight: bold;
          margin-right: 4px;
        }
      }
    }
  }
`;
