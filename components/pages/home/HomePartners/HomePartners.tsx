import React from 'react';
import styled from 'styled-components';
import { Button } from 'components/actions';
import Image from 'next/image';

const HomePartners = () => {
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
        <figure>
          <Image
            src="/assets/images/placeholder.jpg"
            width={360}
            height={360}
            alt=""
            className="img-cover"
          />
        </figure>
        <div className="partner___content">
          <h2>{partner.name}</h2>
          <div className="microDetails">
            <div className="detailsBadge">
              <h5>Number of Datasets: </h5>
              <p>{partner.datasetsNumber}</p>
            </div>
            <div className="detailsBadge">
              <h5>Average Rating: </h5>
              <p>{partner.avgRating}</p>
            </div>
            <div className="detailsBadge">
              <h5>Downloads: </h5>
              <p>{partner.downloads}</p>
            </div>
          </div>
          <p>{partner.content}</p>
          <Button kind="primary-outline" size="sm">
            Explore all {partner.name} data
          </Button>
        </div>
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
