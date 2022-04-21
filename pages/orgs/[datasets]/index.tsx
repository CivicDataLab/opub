import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { fetchFilters, convertToCkanSearchQuery } from 'utils/fetch';

import { Header } from 'components/layouts';
import {
  Search,
  Total,
  Filter,
  Sort,
  Pagination,
  Tags,
} from 'components/data';
import MobileAlter from 'components/data/MobileAlter/MobileAlter';
import { fetchOrgDatasets } from 'utils/orgs.helper';
import { truncate } from 'utils/helper';
import { MenuComp } from 'components/actions/Menu/MenuComp';
import { DatasetListComp } from 'components/pages/datasets/List/ListComp';
import { explorerPopulation } from 'utils/explorer';
import Link from 'next/link';
import { DatasetCardComp } from 'components/data/Cards/DatasetCard/CardComp';

type Props = {
  data: any;
  facets: any;
  query: any;
  variables: any;
};

const list = '"tags", "res_format"';

const Datasets: React.FC<Props> = ({ data, facets, query, variables }) => {
  const router = useRouter();
  const { q, sort, size, fq, from } = router.query;
  const [search, setSearch] = useState(q);
  const [sorts, setSorts] = useState(sort);
  const [items, setItems] = useState(size);
  const [datsetsFilters, setDatasetsFilters] = useState(fq);
  const [pages, setPages] = useState(from);

  const { results, count } = data.result;
  useEffect(() => {
    router.push({
      pathname: `/orgs/${router.query.datasets}`,
      query: {
        fq: datsetsFilters,
        q: search,
        sort: sorts,
        size: items,
        from: pages,
      },
    });
  }, [datsetsFilters, search, sorts, pages, items]);

  function handleDatasetsChange(val: any) {
    switch (val.query) {
      case 'q':
        setSearch(val.value);
        break;
      case 'sort':
        setSorts(val.value);
        break;
      case 'size':
        setItems(val.value);
        break;
      case 'fq':
        setDatasetsFilters(val.value);
        break;
      case 'from':
        setPages(val.value);
        break;
    }
  }
  // console.log(results);


  const headerData = {
    title: results.length
      ? results[0].organization.title
      : query.datasets.replaceAll('-', ' '),
    description: results.length
      ? results[0].organization.description
      : undefined,
  };
  const simplifyNames = {
    res_format: 'Format',
  };

  return (
    <>
      <Head>
        <title>
          {results.length ? results[0].organization.title : 'OPub'} | OPub
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header data={headerData} />
      <Wrapper className="container">
        {data && (
          <DatasetsComp>
            <Filter
              data={facets}
              newFilters={handleDatasetsChange}
              fq={datsetsFilters}
              simpleNames={simplifyNames}
            />
            <DatasetRight>
              <DatasetSearch>
                <Search newSearch={handleDatasetsChange} />
              </DatasetSearch>
              <DatasetSort>
                <Total text="datasets found" total={count} />
                <Sort className="fill" newSort={handleDatasetsChange} />
              </DatasetSort>
              <MobileAlter
                data={facets}
                newData={handleDatasetsChange}
                fq={datsetsFilters}
                sortShow={true}
              />
              <DatasetListComp className="list">
                {results.map((pkg: any, index: number) => {
                  const parsedData = explorerPopulation(pkg);
                  return (
                    <li key={`list-${index}`} className="list__item">
                      <Link
                        href={`/orgs/${router.query.datasets}/${parsedData.id}`}
                        passHref
                      >
                        <DatasetCardComp>
                          <section>
                            <h3 className="card__heading">
                              {parsedData.title}
                            </h3>
                            <Tags data={parsedData.tags} />
                            <div className="card__content">
                              <p>{truncate(parsedData.notes, 300)}</p>
                            </div>
                          </section>
                        </DatasetCardComp>
                      </Link>
                    </li>
                  );
                })}
              </DatasetListComp>
              <Pagination total={count} newPage={handleDatasetsChange} />
            </DatasetRight>
          </DatasetsComp>
        )}
      </Wrapper>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query || {};
  const variables = convertToCkanSearchQuery(query);

  variables.fq = variables.fq
    ? variables.fq.concat(` AND (organization:${query.datasets})`)
    : (variables.fq = `(organization:${query.datasets})`);

  const facets = await fetchFilters(list, variables);
  const data = await fetchOrgDatasets(query.datasets, variables);
  return {
    props: {
      data,
      facets,
      variables,
      query,
    },
  };
};

export default Datasets;

const Wrapper = styled.main``;

const DatasetRight = styled.div`
  width: 100%;
`;

const DatasetsComp = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2.5rem;

  .filters {
    width: 312px;
    min-width: 312px;
  }

  @media (max-width: 1000px) {
    display: block;

    .filters,
    .sort {
      display: none;
    }
  }
`;

const DatasetSearch = styled.div`
  background-color: var(--color-background-lighter);
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--color-grey-600);
  box-shadow: var(--box-shadow-1);
`;

const DatasetSort = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  margin-top: 20px;
  border-bottom: var(--separator-5);

  ${MenuComp} {
    max-width: 250px;
  }
`;
