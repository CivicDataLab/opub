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
import tempViz from 'data/tempViz.json'

type Props = {
  data: any;
  meta: any;
  fileData: any;
  fileDataTable: any;
};

const Explorer: React.FC<Props> = ({
  data,
  meta,
  fileData,
  fileDataTable,
}) => {
  console.log(fileDataTable);

  return (
    <>
      <Head>
        <title>OPub | Explorer</title>
      </Head>
      <Wrapper>
        <ExplorerHeader data={data} />
        {/* <ExplorerViz data={data} fileDataTable={fileDataTable} /> */}
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

  // const vizData = explorerPopulation(tempViz)

  // fetch and parse metadata csv
  // const metaRes = await resourceGetter(vizData.metaUrl);
  // const meta = {};
  // metaRes.forEach((elm) => {
  //   meta[elm[0]] = elm[1] || '';
  // });

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
      // meta,
      fileDataTable,
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
