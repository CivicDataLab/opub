import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Menu } from 'components/actions';
import { MenuContent } from 'components/actions/Menu/MenuComp';
import { LokSabha, VidhanSabha } from 'components/icons';
import { Search } from 'components/data';
import { useRouter } from 'next/router';

const HomeHeader = ({ orgs }) => {
  const [selectedOrg, setSelectedOrg] = useState(orgs[0]);
  const [search, setSearch] = useState('');

  const router = useRouter();

  orgs.map((org) => {
    org.name = org.title;
    org.requestId = org.name
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  });

  function handleMenuChange(val, array) {
    const selectedOpt = array.findIndex((orgOpt) => {
      return orgOpt.id === val;
    });

    setSelectedOrg(array[selectedOpt]);
  }

  useEffect(() => {
    if (search.length > 0) {
      router.push({
        pathname: `/datasets`,
        query: {
          q: search,
          fq:
            selectedOrg.id === 'all'
              ? ''
              : `organization:(${selectedOrg.requestId})`,
        },
      });
    }
  }, [search]);

  function handleDatasetsChange(val) {
    setSearch(val.value);
  }

  return (
    <Header>
      <div className="container">
        <h1>One Stop Solution for Nationwide Data Needs</h1>
        <p>
          A platform that serves for data seekers, publishers and change
          makers.
        </p>
        <HeaderControls>
          <SchemeSelector>
            <StateMenu className="fill">
              <Menu
                options={orgs}
                handleChange={(e) => handleMenuChange(e, orgs)}
                heading="All"
                value={selectedOrg.name}
                showLabel={false}
              />
            </StateMenu>
            <Search newSearch={handleDatasetsChange} />
          </SchemeSelector>
        </HeaderControls>
      </div>
    </Header>
  );
};

export default HomeHeader;

const Header = styled.header`
  padding: 64px 0;
  min-height: calc(100vh - 182px);
  background-color: var(--color-background-light);
  z-index: -1;

  display: flex;
  flex-direction: column;
  justify-content: center;

  > .container {
    max-width: 1020px;
    margin: 0 auto;
  }

  h1,
  p {
    text-align: center;
  }
  h1 {
    font-size: 2vw;
  }
  p {
    font-size: 1.5vw;
  }
`;

const HeaderControls = styled.div`
  background-color: var(--color-white);
  padding: 20px;
  margin-top: 24px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SchemeSelector = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

const HeaderToggle = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  button {
    font-weight: 600;
    padding-bottom: 10px;
    border-bottom: 2px solid transparent;
    padding-inline: 8px;
    border-radius: 0;
    color: var(--color-grey-300);

    svg {
      fill: var(--color-grey-300);
    }

    &[aria-pressed='true'] {
      color: var(--color-amazon-100);
      border-bottom-color: var(--color-amazon-100);

      svg {
        fill: var(--color-amazon-300);
      }
    }
  }
`;

const StateMenu = styled.div`
  flex: 1 0 0;
`;
