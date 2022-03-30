import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { fetchAPI, explorerPopulation, fetchFromTags } from 'utils/explorer';
import { resourceGetter } from 'utils/resourceParser';

import {
  ExplorerHeader,
  ExplorerRelated,
  ExplorerViz,
} from 'components/pages/explorer';
import tempViz from 'data/tempViz.json';

type Props = {
  data: any;
  fileData;
  fileDataTable: any;
};

const Explorer: React.FC<Props> = ({ data, fileDataTable, fileData }) => {
  return (
    <>
      <Head>
        <title>Explorer | NDP</title>
      </Head>
      <Wrapper>
        <ExplorerHeader data={data} />
        <ExplorerViz
          data={data}
          fileDataTable={fileDataTable}
          vizData={fileData}
        />
        {/* <ExplorerRelated data={data} /> */}
      </Wrapper>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // fetch dataset
  const data = await fetchAPI(context.query.explorer).then((res) =>
    explorerPopulation(res.result)
  );

  // fetch and parse metadata csv
  const vizUrl = explorerPopulation(tempViz);
  // fetch and parse data csv
  const fileData = await resourceGetter(vizUrl.dataUrl, true);

  let fileDataTable = {};
  if (data.resUrls['CSV'] || data.resUrls['XLSX'] || data.resUrls['XLS']) {
    fileDataTable = await resourceGetter(
      data.resUrls['CSV'] || data.resUrls['XLSX'] || data.resUrls['XLS'],
      true
    );
  }

  return {
    props: {
      data,
      fileDataTable,
      fileData,
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
