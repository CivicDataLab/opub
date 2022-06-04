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
import { fetchFeaturedDatasets } from 'utils/fetch';

const Home = (data?) => {
  console.log(data.featuredData);

  const HeaderData = [{
    id: 'all',
    name: 'All',
    title: 'All'
  }, ...data.data];

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
        <HomeDataCarousal featuredData={data.featuredData}/>
        <HomeFooter />
      </HomePage>
    </>
  );
}

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchOrgs();

  const featuredDatasets = await fetchFeaturedDatasets();

  console.log("Get Static Props :::::>>>>> ", featuredDatasets);

  return {
    props: {
      data: data.result,
      featuredData: featuredDatasets.result.results,
    },
  };
};


const HomePage = styled.main``;
