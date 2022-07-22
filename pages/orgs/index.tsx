import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { fetchOrgs } from './orgs.helper';
import { OrgCard } from 'components/pages/orgs';
import { Header } from 'components/layouts';
import { Seo } from 'components/common';

type Props = {
  data: any;
};

const headerData = {
  title: 'All Organizations',
  content: 'A list of all organizations under the Justice Hub Platform.',
};

const seo = {
  title: 'Organizations | Opub',
};

const Orgs: React.FC<Props> = ({ data }) => {
  return (
    <>
      <Seo seo={seo} />
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
