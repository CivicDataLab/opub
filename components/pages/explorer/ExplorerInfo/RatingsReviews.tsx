import React from 'react';
import styled from 'styled-components';

const RatingsReviews = () => {
  return (
    <RatingsReviewsWrapper>
      <h2>Add your Ratings and Reviews</h2>
      <div className="newReviewContainer">
        <p>Add your Ratings and Reviews</p>
      </div>
      <h2>Ratings</h2>
      <div className="ratingsContainer">
        <p>Placeholder for Rating Details</p>
      </div>
      <h2>Reviews</h2>
      <div className="ratingsContainer">
        <p>All Reviews listed here</p>
      </div>
    </RatingsReviewsWrapper>
  );
};

export default RatingsReviews;

const RatingsReviewsWrapper = styled.div`
  .newReviewContainer {
    border: 2px dashed #9eadba;
    background: #dfe6ed;
    padding: 50px;
    text-align: center;
    margin-top: 1%;
    margin-bottom: 1%;
  }

  .ratingsContainer {
    border: 2px solid #9eadba;
    background: white;
    padding: 50px;
    text-align: center;
    margin-top: 1%;
    margin-bottom: 1%;
  }
`;
