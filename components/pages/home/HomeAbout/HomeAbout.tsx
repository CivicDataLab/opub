import React from 'react';
import styled from 'styled-components';
import { Button } from 'components/actions';
import Image from 'next/image';

const HomeAbout = () => {
  return (
    <About>
      <div className="container">
        <figure>
          <Image
            src="/assets/images/placeholder.jpg"
            width={560}
            height={240}
            alt=""
            className="img-cover"
          />
        </figure>
        <div>
          <h2>About the platform</h2>
          <p>
            National Data Platform is to be an open source data exchange to authorize organizations to securely Exchange data and possibly monetizing while maintaining control over visibility, access and distribution through Private APIs. It would enable creating data pricing models that will facilitate easy and efficient Exchange of data among various stakeholders and data providers by interconnecting with data in silos and enabling co–creation initiatives and innovations.
          </p>
          <Button kind="primary-outline" size="sm">
            Know More
          </Button>
        </div>
      </div>
    </About>
  );
};

export default HomeAbout;

const About = styled.section`
  background-color: #f7f9fa;

  > .container {
    display: flex;
    flex-wrap: wrap;
    gap: 42px;
    padding-block: 48px;

    > div {
      flex-basis: 0;
      flex-grow: 999;
      min-inline-size: 35%;
    }
  }

  p {
    margin-top: 12px;
  }

  button {
    margin-top: 16px;
  }

  figure {
    flex-grow: 1;
    line-height: 0;
    flex-basis: 480px;
  }
`;
