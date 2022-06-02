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
import { GetStaticProps } from 'next';
import { fetchOrgs } from 'utils/orgs.helper';

const Home = (data?) => {
  // console.log(data);

  const HeaderData = [{
    id: 'all',
    name: 'All',
    title: 'All'
  }, ...data.data]
  return (
    <>
      <Head>
        <title>NDP</title>
      </Head>
      <HomePage>
        <HomeHeader orgs={HeaderData}/>
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

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchOrgs();

  return {
    props: {
      data: data.result,
    },
  };
};


const HomePage = styled.main``;
