import Head from 'next/head';
import styled from 'styled-components';
import React from 'react';
import { 
  HomeAbout, 
  HomeHeader, 
  HomeHighlight, 
  HomeExplore, 
  HomeBanner, 
  HomeDataCarousal, 
  HomeFooter, 
  HomeFeaturedCarousal, 
  HomePartners 
} from 'components/pages/home';

export default function Home() {
  return (
    <>
      <Head>
        <title>NDP</title>
      </Head>
      <HomePage>
        <HomeHeader />
        {/* <HomeFeaturedCarousal /> */}
        <HomeAbout />
        <HomeHighlight />
        <HomeExplore />
        <HomePartners />
        {/* <HomeStates /> */}
        {/* <HomeQuiz /> */}
        <HomeBanner />
        <HomeDataCarousal/>
        <HomeFooter />
      </HomePage>
    </>
  );
}

const HomePage = styled.main``;
