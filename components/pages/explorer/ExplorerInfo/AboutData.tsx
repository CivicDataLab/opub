import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

const AboutData = (data: any) => {
  // console.log(data);
  return (
    <AboutDataWrapper>
      <div className="AboutDataContainer">
        <h2>Description</h2>
        <p>{data.data.result.notes}</p>
        <h2>About Contributor</h2>
        <div className="publisherContainer">
          <Image
            alt="Logo"
            src={data.data.result.organization.image_url}
            width={200}
            height={100}
          />
          <div>
            <h3>{data.data.result.organization.title}</h3>
            {/* <p>{aboutDataItem.content.publisherSubtitle}</p> */}
            <a href={`/orgs/${data.data.result.organization.name}`}>Contributor Page</a>
          </div>
        </div>
        <p>{data.data.result.organization.description}</p>
        {/* <div>
          <h2>More by this Publisher</h2>
          {aboutDataItem.content.publisherMore.map((article, index) => (
            <li className="morePublisher" key={`LinkItem-${index}`}>
              <Link href={article.link}>{article.title}</Link>
            </li>
          ))}
        </div> */}
      </div>
    </AboutDataWrapper>
  );
};

export default AboutData;

const AboutDataWrapper = styled.div`
  .AboutDataContainer {
    h2 {
      margin-top: 1%;
      margin-bottom: 1%;
    }

    .publisherContainer {
      display: flex;

      div {
        margin-left: 1%;
      }
      p {
        color: #788896;
      }
      a {
        color: #0e5cf2;
      }
    }

    .morePublisher {
      list-style: none;
      color: #0e5cf2;
      text-decoration: none;
    }
  }
`;
