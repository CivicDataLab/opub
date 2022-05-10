import Head from 'next/head';
import styled from 'styled-components';
import React from 'react';
import { HomeAbout, HomeHeader, HomeHighlight, HomeQuiz, HomeStates, HomeExplore, HomeBanner, HomeDataCarousal, HomeFooter } from 'components/pages/home';

export default function Home() {
  return (
    <>
      <Head>
        <title>NDP</title>
      </Head>
      <HomePage>
        <HomeHeader />
        <HomeAbout />
        <HomeHighlight />
        <HomeExplore />
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
