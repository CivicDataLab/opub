import Head from 'next/head';
import styled from 'styled-components';
import React from 'react';
import {
  HomeAbout,
  HomeHeader,
  HomeHighlight,
  HomeQuiz,
  HomeStates,
} from 'components/pages/home';
import { Seo } from 'components/common';
import HomeCarousel from 'components/pages/home/HomeCarousel';

export default function Home() {
  return (
    <>
      <Seo />
      <Head>
        <title>Open Publishers</title>
      </Head>
      <HomePage>
        <HomeHeader />
        <HomeHighlight />
        <HomeAbout />
        <HomeStates />
        <HomeQuiz />
        <HomeCarousel />
      </HomePage>
    </>
  );
}

const HomePage = styled.main``;
