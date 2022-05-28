import React from 'react';
import styled from 'styled-components';

const relatedDatasetsData = [
  {
    text: 'National Highways Data - A Placeholder text for Headings',
    content:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
    link: '',
    image: '/assets/images/placeholder.jpg',
    pubDate: '12 Apr, 2022',
    org: 'PhonePe',
    tag: 'Category Tag',
  },
  {
    text: 'Beti Bachao ',
    content:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
    link: '',
    image: '/assets/images/placeholder.jpg',
    pubDate: '13 Jun, 2022',
    org: 'NIC',
    tag: 'Category Tag',
  },
  {
    text: 'Beti Bachao ',
    content:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
    link: '',
    image: '/assets/images/placeholder.jpg',
    pubDate: '13 Jun, 2022',
    org: 'NPCI',
    tag: 'Category Tag',
  },
];

const RelatedDatasets = () => {
  return (
    <RelatedDatasetsContainer>
      <div className="container">
        <h2>Related Datasets</h2>
        <div className="relatedDataContainer">
          {relatedDatasetsData.map((dataset, index) => (
            <a key={`FeaturedItem-${index}`}>
              <div className="itemCard">
                <p>Category Dataset</p>
                <h4>{dataset.text}</h4>
                <div className="datePublisher">
                  <h4>{dataset.pubDate}</h4>
                  <h4>.</h4>
                  <h4>{dataset.org}</h4>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </RelatedDatasetsContainer>
  );
};

export default RelatedDatasets;

const RelatedDatasetsContainer = styled.div`
  background-color: #dfe6ed;
  margin-top: 20px;
  padding-top: 10px;
  padding-bottom: 10px;

  .relatedDataContainer {
    display: flex;
    justify-content: space-between;

    a {
      width: 33%;
    }

    .itemCard {
      padding: 2%;
      margin: 2% 2% 2% 0;
      border: 2px solid #c3cfd9;
      background: white;
      height: 90%;
    }

    .datePublisher {
      display: flex;
      margin-right: 2px;
      color: #788896;
    }
  }
`;
