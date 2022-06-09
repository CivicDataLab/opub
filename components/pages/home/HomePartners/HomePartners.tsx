import React from 'react';
import styled from 'styled-components';
import { Button } from 'components/actions';
import Image from 'next/image';
import Carousel2 from 'components/layouts/Carousel/Carousel2';
import ArrowRight from 'components/icons/ArrowRight';

const HomePartners = (partnersData) => {
  // console.log(partnersData.partnersData);

  const svgIcon = (<ArrowRight />);

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
                  width={200}
                  height={200}
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
    flex-basis:200px;
    flex-shrink:0;

    .img-cover {
      object-fit:contain;
    }
  }

  .partner___content {
    // > p {
    //   font-size: 1.2rem;
    // }

    margin-left:5%;
    margin-bottom:4%;
    
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
