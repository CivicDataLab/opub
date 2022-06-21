import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';

import Header from 'components/pages/state/Header';
import SchemeList from 'components/pages/state/SchemeList';
import { Button } from 'components/actions';
import { Banner } from 'components/layouts';
import { stateDataFetch, stateSchemeFetch } from 'utils/fetch';
import { Seo } from 'components/common';

type Props = {
  stateScheme: any;
  stateData: any;
  query: any;
};

const Datasets: React.FC<Props> = ({ query, stateScheme, stateData }) => {
  const [currentState, setCurrentState] = useState<any>();
  const state = query.stateName
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

  useEffect(() => {
    setCurrentState(
      stateData.find((o) => o.State.toLowerCase() == state.toLowerCase())
    );
  }, [stateData]);

  const bannerDetails = {
    heading:
      'Do you know what is the Total Available Fund for Swachh Bharat Mission - Gramin (SBM-G) for Uttar Pradesh?',
    content: (
      <Button kind="secondary" size="sm">
        Explore Now
      </Button>
    ),
    image: '/assets/images/banner.png',
  };

  // regext is to capitalise the string
  const seo = {
    title: `${state} - Constituency Dashboard`,
    description: `Explore scheme-wise fiscal information at the level of Lok Sabha and Vidhan Sabha constituencies in the state of ${state}`,
  };
  return (
    <>
      <Seo seo={seo} />
      {currentState ? (
        <>
          <Head>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Wrapper className="container">
            <Header data={currentState} />
            <SchemeList
              data={stateScheme[currentState.State]}
              state={currentState.State}
            />
            {/* <Banner details={bannerDetails} /> */}
          </Wrapper>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query || {};
  const [stateScheme, stateData] = await Promise.all([
    stateSchemeFetch(),
    stateDataFetch('State Info'),
  ]);

  return {
    props: {
      query,
      stateScheme,
      stateData: stateData[0],
    },
  };
};

export default Datasets;

const Wrapper = styled.main`
  .banner {
    margin-top: 32px;
    margin-bottom: 212px;
  }
`;