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
import { fetchFeaturedDatasets, fetchSectorData } from 'utils/fetch';

const Home = ({ data, featuredData, sectorData }) => {
  // console.log(data.featuredData);

  const HeaderData = [{
    id: 'all',
    name: 'All',
    title: 'All'
  }, ...data];

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
        <HomeExplore sectorData={sectorData.search_facets.sector.items} />
        <HomePartners partnersData={data} />
        {/* <HomeStates /> */}
        {/* <HomeQuiz /> */}
        <HomeBanner />
        <HomeDataCarousal featuredData={featuredData}/>
        <HomeFooter />
      </HomePage>
    </>
  );
}

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchOrgs();

  const featuredDatasets = await fetchFeaturedDatasets();

  const sectorData = await fetchSectorData();

  return {
    props: {
      data: data.result,
      featuredData: featuredDatasets.result.results,
      sectorData: sectorData.result,
    },
  };
};


const HomePage = styled.main``;
