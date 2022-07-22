import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Indicator, IndicatorMobile } from 'components/data';
import Source from '../ExplorerViz/Source';
import Toggler from './Toggler';
import { Info } from 'components/icons';
import { GroupBarChart } from 'components/viz';
import ConstituencySelect from './ConstituencySelect';

const ExplorerDetailsViz = ({ meta, dispatch }) => {
  const [compareItem, setCompareItem] = useState<any>({});
  const [filteredData, setFilteredData] = useState([]);
  const [allStates, setAllStates] = useState({});
  const [barData, setBarData] = useState([]);
  const [stackedBar, setBarStacked] = useState([]);

  const { indicator, schemeData } = meta;

  useEffect(() => {
    handleNewVizData(indicator);
    setAllStates(schemeData.metadata.consList);
  }, [schemeData]);

  useEffect(() => {
    // creating available years array
    const fObj = Object.values(schemeData.data).find(
      (o: any) => o.slug.toLowerCase() === indicator.toLowerCase()
    );

    if (fObj) {
      const stateData = fObj['state_Obj'][meta.state];
      setFilteredData(stateData);
    }
  }, [indicator]);

  useEffect(() => {
    if (Object.keys(filteredData).length) {
      // for compare section
      if (compareItem.state) {
        const barValues1 = [meta.constituency];
        const barValues2 = [compareItem.cons];

        const headerArr = ['Constituency'];
        Object.keys(filteredData).map((year) => {
          headerArr.push(year);
          barValues1.push(filteredData[year][meta.consCode]);
          barValues2.push(filteredData[year][compareItem.consCode]);
        });

        const barValues = [headerArr, barValues1, barValues2];

        setBarStacked(barValues);
      } else {
        const barValues1 = [meta.constituency];

        const headerArr = ['Constituency'];
        Object.keys(filteredData).map((year) => {
          headerArr.push(year);
          barValues1.push(filteredData[year][meta.consCode]);
        });
        const barValues = [headerArr, barValues1];
        setBarData(barValues);
      }
    }
  }, [filteredData, compareItem]);

  function newCompare(cons, state, code) {
    if (cons) {
      setCompareItem({
        state,
        consCode: code,
        cons,
      });
    } else {
      setCompareItem({});
    }
  }

  function handleNewVizData(val: any) {
    if (val) {
      dispatch({
        indicator: val,
      });
    }
  }

  // different heading based on report or compare mode
  const vizHeading =
    meta.vizType == 'report'
      ? 'Select indicator and do comparative analysis!'
      : 'Select a Vidhan Sabha Constituency to Compare:';

  return (
    <>
      <Toggler meta={meta} dispatch={dispatch} />
      <IndicatorMobile
        indicators={schemeData.data}
        newIndicator={handleNewVizData}
        selectedIndicator={indicator}
      />
      <Wrapper>
        <Indicator
          newIndicator={handleNewVizData}
          selectedIndicator={indicator}
          schemeData={schemeData}
        />

        <VizWrapper id="reportViz">
          <VizHeader data-html2canvas-ignore>
            <HeaderTitle>
              {meta.vizType == 'report' && <Info fill="#1D7548" />}
              <p>{vizHeading}</p>
            </HeaderTitle>
            {meta.vizType == 'compare' && (
              <ConstituencySelect
                fallBack={`Select a constituency`}
                currentItem={compareItem}
                allStates={allStates}
                newCompare={newCompare}
              />
            )}
          </VizHeader>

          <VizGraph className="viz__graph">
            {meta.vizType == 'report' ? (
              barData.length && (
                <>
                  <Title>
                    {`${
                      schemeData.metadata?.name
                    } \u00A0.\u00A0 ${meta.indicator.replaceAll(
                      '-',
                      ' '
                    )} \u00A0.\u00A0 ${meta.constituency.toLowerCase()} (${
                      meta.state
                    })`}
                  </Title>
                  <GroupBarChart
                    yAxisLabel={`Value (in ${meta.unit})`}
                    xAxisLabel="Constituency"
                    theme={['#4965B2', '#ED8686', '#69BC99']}
                    dataset={barData}
                    stack={false}
                    Title=""
                    subTitle=""
                    left="60vw"
                    type="bar"
                    smooth={true}
                  />
                </>
              )
            ) : !compareItem.state ? (
              <NoCompareItem>
                <Info id="infoSvg" fill="#317EB9" height="112" width="112" />
                <div>
                  <p>Choose any constituency to compare with</p>
                  <span>
                    {meta.constituency} - {meta.state} ({meta.sabha} Sabha
                    Constituency)
                  </span>
                </div>
              </NoCompareItem>
            ) : (
              stackedBar.length && (
                <>
                  <Title>
                    {`${
                      schemeData.metadata?.name
                    } \u00A0.\u00A0 ${meta.indicator.replaceAll(
                      '-',
                      ' '
                    )} \u00A0.\u00A0 ${meta.constituency.toLowerCase()} (${
                      meta.state
                    })\u00A0 V/S \u00A0${compareItem.cons.toLowerCase()} (${
                      compareItem.state
                    })`}
                  </Title>{' '}
                  <GroupBarChart
                    yAxisLabel={`Value (in ${meta.unit})`}
                    xAxisLabel="Constituencies"
                    theme={['#4965B2', '#ED8686', '#69BC99']}
                    dataset={stackedBar}
                    stack={false}
                    Title=""
                    subTitle=""
                    left="60vw"
                    type="bar"
                    smooth={true}
                  />
                </>
              )
            )}
          </VizGraph>

          <Source
            meta={{
              scheme: meta.scheme,
              state: meta.state,
              constituency: meta.constituency,
              indicator: indicator ? indicator : 'Opening Balance',
            }}
            currentViz={'#reportViz'}
            source={schemeData.metadata?.source}
          />
        </VizWrapper>
      </Wrapper>
    </>
  );
};

export default ExplorerDetailsViz;

export const Wrapper = styled.section`
  display: grid;
  gap: 2rem;
  grid-template-columns: 312px minmax(0, 1fr);
  margin-top: 2.5rem;

  @media (max-width: 980px) {
    display: block;
    margin-top: 1.5rem;
  }

  &.inactive-sidebar {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const VizWrapper = styled.div`
  background-color: #fff;
  border: 1px solid #f7fdf9;
  border-radius: 6px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.14);

  .inactive-viz {
    display: none;
  }
`;

export const VizHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-top: 24px;
  padding-bottom: 16px;
  margin-inline: 24px;
  gap: 10px;
  margin-bottom: 16px;
  border-bottom: var(--border-2);
`;

const HeaderTitle = styled.div`
  display: flex;
  gap: 8px;
  p {
    letter-spacing: 0.01em;
  }

  svg {
    min-width: 24px;
  }
`;

export const VizGraph = styled.div`
  margin: 0 2rem 2rem;
  height: 550px;
  overflow-y: auto;
  overflow-x: auto;
  position: relative;

  @media (max-width: 620px) {
    height: 580px;
  }

  #infoSvg path {
    transform: scale(5);
  }
`;

const NoCompareItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  text-align: center;
  padding: 0 8px;
  height: 100%;
  background-color: var(--color-background-light);

  p,
  span {
    font-weight: 700;
    color: var(--text-light-medium);
  }

  span {
    text-transform: capitalize;
  }
`;

const Title = styled.div`
  border-radius: 2px;
  background-color: var(--color-background-light);
  margin-bottom: 8px;

  font-weight: 600;
  font-size: 0.75rem;
  line-height: 1.7;
  padding: 8px 16px;
  text-transform: capitalize;

  @media (max-width: 480px) {
    padding: 6px 12px;
  }
`;