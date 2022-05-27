import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import { MenuComp } from 'components/actions/Menu/MenuComp';

const Visualizations = () => {
  return (
    <FeaturedVizContainer>
      <h2>Featured Visualizations</h2>
      <div>
        <VizContainer>
          <VizHeader>
            <h3>Visualization Type 01</h3>
          </VizHeader>
          <VizBody></VizBody>
          <VizSource>
            <Link href={''}>Explore More</Link>
          </VizSource>
        </VizContainer>

        <div className="smallViz">
          <VizContainer>
            <VizHeader>
              <h3>Visualization Type 02</h3>
            </VizHeader>
            <VizBody></VizBody>
            <VizSource>
              <Link href={''}>Explore More</Link>
            </VizSource>
          </VizContainer>

          <VizContainer>
            <VizHeader>
              <h3>Visualization Type 03</h3>
            </VizHeader>
            <VizBody></VizBody>
            <VizSource>
              <Link href={''}>Explore More</Link>
            </VizSource>
          </VizContainer>
        </div>
      </div>
    </FeaturedVizContainer>
  );
};

export default Visualizations;

const FeaturedVizContainer = styled.div`
  .smallViz {
    display: flex;
    justify-content: space-between;
    width: 100%;

    div {
      flex-grow: 1;
    }

    div:first-child {
      margin-right: 10px;
    }
  }
`;

const VizContainer = styled.div`
  border: 2px solid #c3cfd9;
  background: white;
  margin-bottom: 20px;
`;

const VizHeader = styled.div`
  border-bottom: 2px solid #cdd1d1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem 0;
  gap: 1.5rem;
  margin: 0 1.5rem;

  // ${MenuComp} {
  //   flex-basis: 270px;
  // }
`;

const VizBody = styled.div`
  padding: 3rem;
`;

const VizSource = styled.div`
  border-top: 1px solid #cdd1d1;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 1rem 0;
  margin: 0 1.5rem;

  button,
  a {
    svg {
      width: 10px;
      margin-left: 8px;
    }
  }
`;
