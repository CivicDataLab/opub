import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Menu } from 'components/actions';
import { MenuButton, MenuContent } from 'components/actions/Menu/MenuComp';
import { LokSabha, VidhanSabha } from 'components/icons';
import { useRouter } from 'next/router';

const schemes = [
  {
    title: 'Beti Bachao Beti Padhao (BBBP)',
    value: 'bbbp',
  },
  {
    title: 'Integrated Child Development Services (ICDS)',
    value: 'icds',
  },
  {
    title: 'Integrated Child Protection Scheme (ICPS)',
    value: 'icps',
  },
  {
    title:
      'Mahatma Gandhi National Rural Employment Guarantee Scheme (MGNREGS)',
    value: 'mgnregs',
  },
  {
    title: 'National Health Mission (NHM)',
    value: 'nhm',
  },
  {
    title: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    value: 'pmkisan',
  },
];

const trending = [
  {
    text: 'Uttar Pradesh x Manrega',
    link: '#',
  },
  {
    text: 'Rajasthan x Beti Bachao Beti Padhao',
    link: '#',
  },
];

const noState = {
  title: 'Select a state...',
  value: null,
};
const noScheme = {
  title: 'Select a scheme...',
  value: null,
};

function defaultState(item) {
  return {
    value: item,
    title: item,
  };
}

const SchemeSelector: React.FC<{
  sabha?: boolean;
  suggestion?: boolean;
  state?: string;
  scheme?: any;
  statesData: any;
}> = ({ sabha = true, suggestion = true, state, scheme, statesData }) => {
  const router = useRouter();

  const [selectedState, setSelectedState] = useState<any>(
    state ? defaultState(state) : noState
  );
  const [selectedScheme, setSelectedScheme] = useState(
    scheme ? defaultState(scheme) : noScheme
  );
  const [selectedSabha, setSelectedSabha] = useState(
    router.query.sabha ? router.query.sabha : 'lok'
  );
  const [stateSchemeData, setStateSchemeData] = useState({});
  const [availableStates, setAvailableStates] = useState<any>({});
  const [availableSchemes, setAvailableSchemes] = useState<any>({});

  const sabhaRef = useRef(null);

  useEffect(() => {
    const tempSchemeData = {};
    statesData.map((state) => {
      state.state.split(',').map((each_state) => {
        if (each_state in tempSchemeData) {
          tempSchemeData[each_state].push({
            scheme_name: state.scheme_name,
            scheme_slug: state.slug,
          });
        } else {
          tempSchemeData[each_state] = [
            { scheme_name: state.scheme_name, scheme_slug: state.slug },
          ];
        }
        return null;
      });
      return null;
    });
    setStateSchemeData(tempSchemeData);

    const availableStates = Object.keys(tempSchemeData).map((item) => ({
      value: item,
      title: item,
    }));
    if (!state) {
      setSelectedState(availableStates[0]);
    }
    setAvailableStates(availableStates);
  }, []);

  useEffect(() => {
    if (stateSchemeData[selectedState.value]) {
      const tempSchemes = stateSchemeData[selectedState.value].map((item) => ({
        value: item.scheme_slug,
        title: item.scheme_name,
      }));
      // if()
      // setSelectedScheme(tempSchemes[0]);
      setAvailableSchemes(tempSchemes);
    }
  }, [selectedState, stateSchemeData]);

  function handleMenuChange(val, array) {
    const setState =
      array === availableStates ? setSelectedState : setSelectedScheme;

    for (let i = 0; i < array.length; i++) {
      if (val === array[i].value) {
        setState(array[i]);
        return;
      }
    }
    setState(array[0]);
  }

  function selectState(val) {
    for (let i = 0; i < availableStates.length; i++) {
      if (val.toLowerCase() === availableStates[i].value) {
        return availableStates[i];
      }
    }
    return noState;
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
    if (selectedState.value == null || selectedScheme.value == null) {
      alert('Select state and scheme');
    } else {
      router.push({
        pathname: '/explorer',
        query: { scheme: selectedScheme.value, state: selectedState.value },
      });
    }
  }

  return (
    <HeaderControls>
      {sabha && (
        <HeaderToggle ref={sabhaRef}>
          <Button
            aria-pressed="true"
            data-value="lok"
            onClick={handleSabhaClick}
            icon={<LokSabha />}
            iconSide="left"
            kind="custom"
          >
            Lok Sabha
          </Button>
          <Button
            aria-pressed="false"
            data-value="vidhan"
            onClick={handleSabhaClick}
            icon={<VidhanSabha />}
            iconSide="left"
            kind="custom"
          >
            Vidhan Sabha
          </Button>
        </HeaderToggle>
      )}
      <SchemesMenu>
        <StateMenu
          className={`fill ${selectedState.value == null && 'not-selected'}`}
        >
          <Menu
            options={availableStates}
            handleChange={(e) => handleMenuChange(e, availableStates)}
            heading="Select State"
            value={selectedState.title}
            showLabel={false}
          />
        </StateMenu>
        <SchemeMenu
          className={`fill ${selectedScheme.value == null && 'not-selected'}`}
        >
          <Menu
            options={availableSchemes}
            handleChange={(e) => handleMenuChange(e, availableSchemes)}
            heading="Select any Scheme"
            value={selectedScheme.title}
            showLabel={false}
          />
        </SchemeMenu>
        <Button
          kind="primary"
          href={`/explorer?scheme=${selectedScheme.value || 'mgnrega'}&state=${
            selectedState.value || 'Bihar'
          }&sabha=${router.query.sabha ? router.query.sabha : selectedSabha}`}
        >
          Explore
        </Button>
      </SchemesMenu>
      {suggestion && (
        <Trending>
          <span>Trending Search:</span>
          <div>
            {trending.map((item, index) => (
              <a key={`trending-${index}`} href={item.link}>
                {item.text}
              </a>
            ))}
          </div>
        </Trending>
      )}
    </HeaderControls>
  );
};

export default SchemeSelector;

export const HeaderControls = styled.div`
  background-color: var(--color-white);
  padding: 16px 16px 12px;
  border-radius: 4px;
  margin: 0 auto;
`;

export const SchemesMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 16px;

  .not-selected {
    ${MenuButton} {
      color: var(--text-light-light);
    }
  }

  ${MenuButton} {
    border-radius: 2px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    font-weight: 600;
    color: var(--text-light-medium);
  }

  @media screen and (max-width: 720px) {
    flex-wrap: wrap;
  }
`;

const HeaderToggle = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  border-bottom: var(--border-2);

  button {
    font-weight: 600;
    padding-bottom: 10px;
    border-bottom: 2px solid transparent;
    padding-inline: 8px;
    border-radius: 0;
    color: var(--text-light-light);

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
  flex-basis: 208px;
`;

const SchemeMenu = styled.div`
  flex-basis: 637px;
`;

const Trending = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 12px;
  flex-wrap: wrap;

  font-weight: 600;
  font-size: 0.75rem;
  line-height: 1.7;

  > div {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  a {
    color: var(--color-amazon-100);
  }
`;