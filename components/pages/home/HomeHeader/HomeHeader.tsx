import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Button, Menu } from 'components/actions';
import { MenuContent } from 'components/actions/Menu/MenuComp';
import { LokSabha, VidhanSabha } from 'components/icons';

const states = [
  {
    id: 'Rajasthan',
    name: 'rajasthan',
  },
  {
    id: 'Uttar Pradesh',
    name: 'uttar_pradesh',
  },
  {
    id: 'Odisha',
    name: 'odisha',
  },
  {
    id: 'Gujrat',
    name: 'gujrat',
  },
  {
    id: 'Kerela',
    name: 'kerela',
  },
  {
    id: 'Tamil Nadu',
    name: 'tamil_nadu',
  },
];

const schemes = [
  {
    id: 'Beti Bachao Beti Padhao (BBBP)',
    name: 'bbbp',
  },
  {
    id: 'Integrated Child Development Services (ICDS)',
    name: 'icds',
  },
  {
    id: 'Integrated Child Protection Scheme (ICPS)',
    name: 'icps',
  },
  {
    id:
      'Mahatma Gandhi National Rural Employment Guarantee Scheme (MGNREGS)',
    name: 'mgnregs',
  },
  {
    id: 'National Health Mission (NHM)',
    name: 'nhm',
  },
  {
    id: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    name: 'pmkisan',
  },
];

const HomeHeader = () => {
  const [selectedState, setSelectedState] = useState(states[0]);
  const [selectedScheme, setSelectedScheme] = useState(schemes[0]);
  const [selectedSabha, setSelectedSabha] = useState('Lok Sabha');

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
      state: selectedState.name,
      scheme: selectedScheme.name,
      sabha: selectedSabha,
    };
    console.log(obj);
  }

  return (
    <Header>
      <div className="container">
        <h1>Explore Constituency-wise Fiscal Information for schemes</h1>
        <HeaderControls>
          <HeaderToggle ref={sabhaRef}>
            <Button
              aria-pressed="true"
              data-value="lok-sabha"
              onClick={handleSabhaClick}
              icon={<LokSabha />}
              iconSide="left"
              kind="custom"
            >
              Lok Sabha
            </Button>
            <Button
              aria-pressed="false"
              data-value="vidhan-sabha"
              onClick={handleSabhaClick}
              icon={<VidhanSabha />}
              iconSide="left"
              kind="custom"
            >
              Vidhan Sabha
            </Button>
          </HeaderToggle>
          <SchemeSelector>
            <StateMenu className="fill">
              <Menu
                options={states}
                handleChange={(e) => handleMenuChange(e, states)}
                heading="Select State"
                value={selectedState.id}
                showLabel={false}
              />
            </StateMenu>
            <div className="fill">
              <Menu
                options={schemes}
                handleChange={(e) => handleMenuChange(e, schemes)}
                heading="Select any Scheme"
                value={selectedScheme.id}
                showLabel={false}
              />
            </div>
            <Button kind="primary" onClick={handleSubmitClick}>
              Explore
            </Button>
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
  background-image: url('/assets/images/background.svg');
  z-index: -1;

  display: flex;
  flex-direction: column;
  justify-content: center;

  > .container {
    max-width: 1020px;
    margin: 0 auto;
  }

  h1 {
    text-align: center;
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
  flex-basis: 20%;
  flex-grow: 1;
`;
