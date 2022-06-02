import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Menu } from 'components/actions';
import { MenuContent } from 'components/actions/Menu/MenuComp';
import { LokSabha, VidhanSabha } from 'components/icons';
import { Search } from 'components/data';
import { useRouter } from 'next/router';

const states = [
  {
    name: 'All',
    id: 'all',
  },
  {
    name: 'Uttar Pradesh',
    id: 'uttar_pradesh',
  },
  {
    name: 'Odisha',
    id: 'odisha',
  },
  {
    name: 'Gujrat',
    id: 'gujrat',
  },
  {
    name: 'Kerela',
    id: 'kerela',
  },
  {
    name: 'Tamil Nadu',
    id: 'tamil_nadu',
  },
];

const schemes = [
  {
    name: 'Beti Bachao Beti Padhao (BBBP)',
    id: 'bbbp',
  },
  {
    name: 'Integrated Child Development Services (ICDS)',
    id: 'icds',
  },
  {
    name: 'Integrated Child Protection Scheme (ICPS)',
    id: 'icps',
  },
  {
    name: 'Mahatma Gandhi National Rural Employment Guarantee Scheme (MGNREGS)',
    id: 'mgnregs',
  },
  {
    name: 'National Health Mission (NHM)',
    id: 'nhm',
  },
  {
    name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    id: 'pmkisan',
  },
];

const HomeHeader = () => {
  const [selectedState, setSelectedState] = useState(states[0]);
  const [selectedScheme, setSelectedScheme] = useState(schemes[0]);
  const [search, setSearch] = useState('');
  const [selectedSabha, setSelectedSabha] = useState('Lok Sabha');

  const router = useRouter();

  const sabhaRef = useRef(null);

  function handleMenuChange(val, array) {
    const setState = array === states ? setSelectedState : setSelectedScheme;

    for (let i = 0; i < array.length; i++) {
      if (val === array[i].value) {
        setState(array[i]);
        return;
      }
    }
    setState(array[0]);
  }

  function handleSabhaClick(e) {
    const btn = e.target;
    const value = btn.dataset.value;
    setSelectedSabha(value);

    const selectedBtn = sabhaRef.current.querySelector(
      '[aria-pressed="true"]'
    ) as HTMLElement;

    if (btn !== selectedBtn) {
      selectedBtn.setAttribute('aria-pressed', 'false');
      btn.setAttribute('aria-pressed', 'true');
    }
  }

  function handleSubmitClick() {
    const obj = {
      state: selectedState.id,
      scheme: selectedScheme.id,
      sabha: selectedSabha,
    };
  }

  useEffect(() => {
    if (search.length > 0) {
      router.push({
        pathname: `/datasets`,
        query: {
          q: search,
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
        <p>A platform that serves for data seekers, publishers and change makers.</p>
        <HeaderControls>
          <SchemeSelector>
            <StateMenu className="fill">
              <Menu
                options={states}
                handleChange={(e) => handleMenuChange(e, states)}
                heading="All"
                value={selectedState.name}
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
  // background-image: url('/assets/images/background.svg');
  z-index: -1;

  display: flex;
  flex-direction: column;
  justify-content: center;

  > .container {
    max-width: 1020px;
    margin: 0 auto;
  }

  h1, p {
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
  /* flex-basis: 20%;
  flex-grow: 1; */
`;
