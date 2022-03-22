import React, { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { fetchOrgs } from 'utils/orgs.helper';
import { Total } from 'components/data';
import { OrgCard } from 'components/pages/orgs';
import { Header } from 'components/layouts';

type Props = {
  data: any;
};

const headerData = {
  title: 'All Organizations',
  content: 'A list of all organizations under the Justice Hub Platform.',
};

const Orgs: React.FC<Props> = ({ data }) => {
  console.log(data);
  
  return (
    <>
      <Head>
        <title>Organizations | OPub</title>
      </Head>
      <Header data={headerData} />

      <main className="container">
        <List>
          {data.map((item, index) => {
            return (
              <li key={`list-${index}`} className="list__item">
                <OrgCard data={item} />
              </li>
            );
          })}
        </List>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchOrgs();
  return {
    props: {
      data: data.result,
    },
  };
};

export default Orgs;

const List = styled.ul`
  display: grid;
  gap: 16px;
  margin-block: 32px;
  align-items: stretch;

  grid-template-columns: repeat(auto-fit, minmax(min(350px, 100%), 1fr));
`;
