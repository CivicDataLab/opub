import * as echarts from 'echarts/core';
import { Button } from 'components/actions';
import { Cross } from 'components/icons';
import { MapViz } from 'components/viz';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { debounce, swrFetch } from 'utils/helper';
import { consDescFetch } from 'utils/fetch';

const ExplorerMap = ({ meta, schemeData, dispatch }) => {
  const [mapValues, setMapvalues] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedCode, setSelectedCode] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [consDesc, setConsDesc] = useState({});
  const [mapIndicator, setMapIndicator] = useState(undefined);

  const { data, isLoading } = swrFetch(
    `assets/maps/${meta.sabha}/${meta.state}.json`
  );

  React.useEffect(() => {
    consDescFetch().then((res) => setConsDesc(res));
  }, []);

  // on state change, close the consitituency details popup
  useEffect(() => {
    setSelectedItem(undefined);
  }, [meta.sabha, meta.state, meta.selectedIndicator]);

  // preparing data for echarts component
  useEffect(() => {
    if (schemeData) {
      const stateData = Object.values(schemeData).map(Number);
      stateData.sort(function (a, b) {
        return a - b;
      });
      const uniq = [...new Set(stateData)];
      const binLength = Math.floor(uniq.length / 6);
      const vizIndicators = binLength
        ? [
            {
              min: uniq[0],
              max: uniq[0 + binLength],
              label: `${uniq[0]} to ${uniq[0 + binLength]}`,
              color: '#173B3B',
            },
            {
              min: uniq[binLength + 1],
              max: uniq[binLength * 2],
              label: `${uniq[binLength + 1]} to ${uniq[binLength * 2]}`,
              color: '#1F5151',
            },
            {
              min: uniq[2 * binLength + 1],
              max: uniq[binLength * 3],
              label: `${uniq[2 * binLength + 1]} to ${uniq[binLength * 3]}`,
              color: '#286767',
            },
            {
              min: uniq[3 * binLength + 1],
              max: uniq[binLength * 4],
              label: `${uniq[3 * binLength + 1]} to ${uniq[binLength * 4]}`,
              color: '#368B8B',
            },
            {
              min: uniq[4 * binLength + 1],
              max: uniq[binLength * 5],
              label: `${uniq[4 * binLength + 1]} to ${uniq[binLength * 5]}`,
              color: '#41A8A8',
            },
            {
              min: uniq[5 * binLength + 1],
              max: uniq[uniq.length - 1],
              label: `${uniq[5 * binLength + 1]} to ${uniq[binLength * 6]}`,
              color: '#4ABEBE',
            },
          ]
        : [
            {
              min: 0,
              max: 0,
              label: `data not found`,
              color: '#494D44',
            },
          ];
      setMapIndicator(vizIndicators);
    }
  }, [schemeData, data]);

  // changing map chart values on sabha change
  useEffect(() => {
    if (data && schemeData) {
      const tempData = Object.keys(schemeData).map((item: any) => ({
        name: item,
        value: schemeData[item] || 0,
        mapName: data.features.filter((obj) => {
          return obj?.properties['GEO_NO'] === item;
        })[0]?.properties['GEO_NAME'],
      }));

      setMapvalues(tempData);
    }
  }, [data, schemeData, meta.sabha]);

  function handleSearch(query, obj) {
    let newObj = [];
    setSearchQuery(query);
    if (query.length > 0) {
      Object.keys(obj).forEach(() => {
        newObj = obj.filter((item) =>
          JSON.stringify(item, ['mapName'])
            .toLowerCase()
            .includes(query.toLowerCase())
        );
      });
    }
    setSearchItems(newObj);
  }

  const newMapItem = useCallback((e) => {
    if (e) {
      setSelectedItem(e.mapName);
      setSelectedCode(e.name);
      setSearchItems([]);
      setSearchQuery('');
      (document.getElementById('searchInput') as HTMLInputElement).value = '';

      // overriding map highlight on constituency selection
      const myChart = echarts.getInstanceByDom(
        document.querySelector('#mapView .echarts-for-react')
      );
      if (myChart) {
        myChart.dispatchAction({
          type: 'select',
          name: e.name,
        });
      }
    }
  }, []);

  function handlePanelClose() {
    setSelectedItem(undefined);
    const myChart = echarts.getInstanceByDom(
      document.querySelector('#mapView .echarts-for-react')
    );
    myChart.dispatchAction({
      type: 'select',
      name: '',
    });
  }

  return (
    <Wrapper>
      <SearchWrapper>
        <input
          id="searchInput"
          type="text"
          placeholder="Search here for constituency"
          onChange={(e) => debounce(handleSearch(e.target.value, mapValues))}
        />
        {searchItems.length > 0 && (
          <SearchResult>
            {searchItems.map((items, index) => (
              <li key={`searchItems-${index}`}>
                <button
                  id={items.name}
                  data-name={items.mapName}
                  onClick={(e: any) =>
                    newMapItem({
                      name: e.target.id,
                      mapName: e.target.dataset.name,
                    })
                  }
                >
                  {items.mapName}
                </button>
              </li>
            ))}
          </SearchResult>
        )}
        {selectedItem && searchQuery.length == 0 && (
          <>
            <SelectedCons>
              <div>
                <h3>{selectedItem}</h3>
                <Button
                  icon={<Cross fill="#888F8B" />}
                  iconOnly={true}
                  kind="custom"
                  onClick={handlePanelClose}
                >
                  close
                </Button>
              </div>

              <p>{consDesc[meta.sabha][meta.state][selectedCode]}</p>

              <SearchButtons>
                <Button
                  kind="secondary-outline"
                  size="sm"
                  onClick={() =>
                    dispatch({
                      consCode: selectedCode,
                      constituency: selectedItem,
                      vizType: 'report',
                    })
                  }
                >
                  Generate Report Card
                </Button>
                <Button
                  kind="secondary"
                  size="sm"
                  onClick={() =>
                    dispatch({
                      consCode: selectedCode,
                      constituency: selectedItem,
                      vizType: 'compare',
                    })
                  }
                >
                  Compare Constituency
                </Button>
              </SearchButtons>
            </SelectedCons>
          </>
        )}
      </SearchWrapper>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        mapIndicator && (
          <MapViz
            mapFile={data}
            meta={meta}
            data={mapValues}
            vizIndicators={mapIndicator}
            newMapItem={newMapItem}
          />
        )
      )}
    </Wrapper>
  );
};

export default ExplorerMap;

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const SearchWrapper = styled.div`
  position: absolute;
  right: 16px;

  top: 16px;
  isolation: isolate;
  z-index: 10;
  width: 100%;
  max-width: 276px;

  @media (max-width: 480px) {
    left: 0;
    right: 0;
    margin: 0 auto;
  }

  > input {
    padding: 8px 8px 8px 36px;
    font-size: 0.875rem;
    color: var(--text-light-medium);
    border: var(--border-1);
    width: 100%;

    background-image: url("data:image/svg+xml,%0A%3Csvg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10.9162 9.6667H10.2579L10.0245 9.4417C11.0245 8.27503 11.5412 6.68337 11.2579 4.9917C10.8662 2.67503 8.93288 0.825033 6.59954 0.5417C3.07454 0.108366 0.107878 3.07503 0.541211 6.60003C0.824545 8.93337 2.67454 10.8667 4.99121 11.2584C6.68288 11.5417 8.27454 11.025 9.44121 10.025L9.66621 10.2584V10.9167L13.2079 14.4584C13.5495 14.8 14.1079 14.8 14.4495 14.4584C14.7912 14.1167 14.7912 13.5584 14.4495 13.2167L10.9162 9.6667ZM5.91621 9.6667C3.84121 9.6667 2.16621 7.9917 2.16621 5.9167C2.16621 3.8417 3.84121 2.1667 5.91621 2.1667C7.99121 2.1667 9.66621 3.8417 9.66621 5.9167C9.66621 7.9917 7.99121 9.6667 5.91621 9.6667Z' fill='%23666E6A'/%3E%3C/svg%3E");
    background-position: left 8px top 50%, 0px 0px;
    background-repeat: no-repeat, repeat;
  }
`;

const SearchResult = styled.ul`
  display: flex;
  flex-direction: column;
  background-color: var(--color-background-lighter);
  border: var(--border-1);
  box-shadow: var(--box-shadow-1);
  border-radius: 0px 0px 4px 4px;
  padding: 8px;
  max-height: 300px;
  overflow-y: auto;
  width: 100%;

  li {
    line-height: 22px;
    border-radius: 4px;

    button {
      padding: 8px;
      width: 100%;
      text-align: start;
      height: 100%;
      transition: background-color 150ms ease;

      &:hover {
        background-color: var(--color-grey-600);
      }
    }
  }
`;

const SelectedCons = styled.section`
  background-color: var(--color-background-lighter);
  padding: 16px;
  margin-top: 12px;
  filter: drop-shadow(var(--box-shadow-1));
  backdrop-filter: blur(4px);
  border-radius: 2px;
  border: var(--border-1);
  opacity: 0.92;
  /* position: absolute;
  top: 32px;
  z-index: -1; */

  div:first-of-type {
    border-bottom: var(--border-2);
    padding-bottom: 8px;

    button {
      position: absolute;
      right: 0;
      top: 4px;
    }
  }

  h3 {
    font-weight: 600;
    font-size: 1rem;
    max-width: 90%;
  }

  p {
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1.7;
    margin-top: 8px;
  }
`;

const SearchButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;

  button {
    width: 100%;
    justify-content: center;
    opacity: 1;
  }
`;
