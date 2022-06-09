import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { fetchAPI, explorerPopulation, fetchFromTags } from 'utils/explorer';
import { resourceGetter } from 'utils/resourceParser';

import { ExplorerHeader, ExplorerInfo, ExplorerRelated, ExplorerViz } from 'components/pages/explorer';
import tempViz from 'data/tempViz.json';

type Props = {
  data: any;
  meta;
  fileData;
  headerData;
};

const Explorer: React.FC<Props> = ({ data, fileData, headerData }) => {
  const [resUrl, setResUrl] = useState(
    data.resUrls['CSV'] ? data.resUrls['CSV'] : ''
  );

  // console.log(headerData.result)

  return (
    <>
      <Head>
        <title>Explorer | NDP</title>
      </Head>
      <Wrapper>
        <ExplorerHeader data={headerData} />
        {/* <ExplorerViz
          data={data}
          vizData={fileData}
          resUrl={resUrl}
        /> */}
        {/* <ExplorerRelated data={data} /> */}
        <ExplorerInfo data={headerData} 
          vizData={fileData}
          resUrl={resUrl} />
      </Wrapper>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // fetch dataset
  const data = await fetchAPI(context.query.explorer).then((res) =>
    explorerPopulation(res.result)
  );

  const headerData = await fetchAPI(context.query.explorer);

  // fetch and parse metadata csv
  const vizUrl = explorerPopulation(tempViz);
  // fetch and parse data csv
  const fileData = await resourceGetter(vizUrl.dataUrl, true);

  return {
    props: {
      data,
      fileData,
      headerData
    },
  };
};

export default Explorer;

const Wrapper = styled.main`
  .indicator-mobile {
    margin-top: 2rem;

    @media (min-width: 980px) {
      display: none;
    }
  }

  .heading {
    margin-bottom: 0.5rem;
    font-weight: 900;
    font-size: 2.5rem;
  }
`;
