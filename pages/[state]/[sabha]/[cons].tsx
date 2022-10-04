import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

import {
  stateDataFetch,
  stateMetadataFetch,
  stateSchemeFetch,
} from 'utils/fetch';

import {
  Overview as OverViewIcon,
  Explorer as ExplorerIcon,
} from 'components/icons';
import { Header } from 'components/pages/cons/Header';
import { Toolbar } from 'components/layouts/Toolbar';
import { capitalize } from 'utils/helper';
import { Overview } from 'components/pages/cons';
import { useRouter } from 'next/router';

const Explorer = dynamic(
  () => import('components/pages/cons/Explorer/Explorer'),
  {
    ssr: false,
  }
);

const Seo = dynamic(() => import('components/common/Seo/Seo'), {
  ssr: false,
});

type Props = {
  stateScheme: any;
  stateMetadata: any;
  schemeData: any;
  data: any;
};
export const ConstituencyPage = React.createContext(null);

const reducer = (state: any, action: any) => {
  return { ...state, ...action };
};

const ConsPage: React.FC<Props> = ({ stateMetadata, stateScheme, data }) => {
  const router = useRouter();
  const { state, sabha, scheme, cons, indicator } = router.query;
  const initialProps = React.useMemo(
    () => ({
      indicator: indicator || '',
      scheme: scheme || '',
      year: '',
    }),
    [indicator, scheme]
  );
  const [view, setView] = useState('overview');
  const [metaReducer, dispatch] = React.useReducer(reducer, initialProps);
  const { constituency_name: cons_name } = data.consData;

  function handleToolbarSwitch(e: string, cardIndicator = null) {
    if (cardIndicator) {
      router.replace({
        pathname: `/${state}/${sabha}/${cons}`,
        query: {
          scheme: showScheme(e),
          indicator: cardIndicator,
        },
      });
      setView('explorer');
      return;
    }

    function isTabbed(val: string) {
      if (['explorer', 'overview'].includes(val)) return true;
      return false;
    }

    function showScheme(val) {
      if (isTabbed(val)) {
        if (scheme) return scheme;
        return '';
      }
      if (val == 'list') return '';
      return val;
    }

    const tabState = isTabbed(e) ? e : 'explorer';
    setView(tabState);

    router.replace({
      pathname: `/${state}/${sabha}/${cons}`,
      query: {
        scheme: showScheme(e),
        indicator,
      },
    });

    window.scrollTo(0, 0);
  }

  const tabData = React.useMemo(
    () => [
      {
        value: 'overview',
        name: 'Overview',
        altName: 'Key Highights of Constituency',
        icon: <OverViewIcon size={40} />,
        content: (
          <ConstituencyPage.Provider
            value={{
              toolbar: handleToolbarSwitch,
              meta: { metaReducer, dispatch },
            }}
          >
            <Overview
              stateMetadata={stateMetadata}
              queryData={{ ...router.query, cons_name }}
              schemeList={stateScheme}
              data={data}
            />
          </ConstituencyPage.Provider>
        ),
      },
      {
        value: 'explorer',
        name: 'Explorer',
        altName: 'Scheme Data of Constituency',
        icon: <ExplorerIcon size={40} />,
        content: (
          <ConstituencyPage.Provider
            value={{
              metaReducer: { obj: metaReducer, dispatch },
            }}
          >
            <Explorer
              queryData={{ ...router.query, cons_name }}
              schemeList={stateScheme}
            />
          </ConstituencyPage.Provider>
        ),
      },
    ],
    [stateMetadata, metaReducer]
  );

  const seo = {
    title: `${capitalize(cons_name)} . ${capitalize(
      state
    )} - Constituency Dashboard`,
    description: `Explore scheme-wise fiscal information at the level of Lok Sabha and Vidhan Sabha constituencies in the state of ${state}`,
  };

  return (
    <>
      <Seo seo={seo} />
      {
        <>
          <main className="container">
            <Header queryData={{ state, sabha, cons, cons_name }} />
            <Wrapper id="consPageWrapper">
              <Toolbar
                value={view}
                onValueChange={(e) => handleToolbarSwitch(e)}
                fullScreenId="consPageWrapper"
                data={tabData}
              />
            </Wrapper>
          </main>
        </>
      }
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  res,
  query,
}) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  const queryValue: any = query || {};
  if (!['vidhan', 'lok'].includes(queryValue.sabha)) return { notFound: true };

  const [stateScheme, stateMetadata, stateData] = await Promise.all([
    stateSchemeFetch(queryValue.state.replaceAll('-', ' ')),
    stateMetadataFetch(queryValue.state.replaceAll('-', ' ')),
    stateDataFetch(queryValue.state, queryValue.sabha),
  ]);

  if (!(stateMetadata && stateScheme && queryValue.cons))
    return { notFound: true };

  return {
    props: {
      stateMetadata: stateMetadata,
      stateScheme,
      data: {
        consData: stateData['constituency_data'][queryValue.cons],
        stateAvg: stateData['state_avg'],
      },
    },
  };
};

export default ConsPage;

const Wrapper = styled.div`
  margin-top: 32px;
  background-color: var(--color-background-light);
`;
