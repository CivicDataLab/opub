import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import {
  tabbedInterface,
  filter_data_indicator,
  filter_data_budgettype,
} from 'utils/explorer';

import { barLineTransformer } from 'components/viz';

import { Download, ExternalLink } from 'components/icons';
import { Button, Menu } from 'components/actions';
import { MenuComp } from 'components/actions/Menu/MenuComp';
import { downloadPackage } from 'utils/downloadPackage';
import TableViewIcon from 'components/icons/TableViewIcon';
import BarGraphIcon from 'components/icons/BarGraphIcon';
import LineChartIcon from 'components/icons/LineChartIcon';

const SimpleBarLineChartViz = dynamic(
  () => import('components/viz/SimpleBarLineChart'),
  { ssr: false, loading: () => <p>...</p> }
);
const ExplorerTable = dynamic(() => import('../ExplorerTable'), {
  ssr: false,
  loading: () => <p>Table is loading...</p>,
});

const ExplorerViz = ({ data, vizData, resUrl }) => {
  const [selectedIndicator, setSelectedIndicator] =
    useState('Budget Estimates');
  const [indicatorFiltered, setIndicatorFiltered] = useState([]);
  const [finalFiltered, setFinalFiltered] = useState([]);
  const [budgetTypes, setBudgetTypes] = useState([]);
  const [selectedBudgetType, setSelectedBudgetType] = useState('');
  const [isTable, setIsTable] = useState(true);
  const [currentViz, setCurrentViz] = useState('#barGraph');
  const [numPages, setNumPages] = useState(null);

  const barRef = useRef(null);
  const lineRef = useRef(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const crData = [
    'Budget Estimates',
    'Revised Estimates',
    'Actual Expenditure',
  ];

  const vizToggle = [
    {
      name: 'Table View',
      id: '#tableView',
      icon: <TableViewIcon />,
    },
    {
      name: 'Bar Graph',
      id: '#barGraph',
      icon: <BarGraphIcon />,
    },
    {
      name: 'Line Chart',
      id: '#lineChart',
      icon: <LineChartIcon />,
    },
  ];

  const vizItems = [
    {
      id: 'tableView',
      graph:
        resUrl.length !== 0 ? (
          <ExplorerTable resUrl={resUrl} />
        ) : data.resUrls['PDF'] ? (
          <Document
            file={data.resUrls['PDF']}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={(error) => console.log('Inside Error', error)}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        ) : (
          <p>Vizualisation load failed</p>
        ),
    },
    {
      id: 'barGraph',
      graph: (
        <SimpleBarLineChartViz
          color={'#00ABB7'}
          dataset={barLineTransformer(vizData, selectedIndicator)}
          type="bar"
          smooth={true}
          showSymbol={true}
          Title={
            selectedIndicator +
            (budgetTypes.length > 1 ? ' - ' + selectedBudgetType : '')
          }
          subTitle={data.title}
          unit={crData.includes(selectedIndicator) ? 'Cr' : '%'}
        />
      ),
      ref: barRef,
    },
    {
      id: 'lineChart',
      graph: (
        <SimpleBarLineChartViz
          color={'#00ABB7'}
          dataset={barLineTransformer(vizData, selectedIndicator)}
          type="line"
          smooth={true}
          showSymbol={true}
          Title={
            selectedIndicator +
            (budgetTypes.length > 1 ? ' - ' + selectedBudgetType : '')
          }
          subTitle={data.title}
          unit={crData.includes(selectedIndicator) ? 'Cr' : '%'}
        />
      ),
      ref: lineRef,
    },
  ];

  useEffect(() => {
    // ceating tabbed interface for viz selector
    const tabVizList = document.querySelector('.viz__tabs');
    const panels = document.querySelectorAll('.viz__graph');
    tabbedInterface(tabVizList, panels);

    // handleNewVizData('Budget Estimates');
  }, [resUrl]);

  // Run whenever a new indicator is selected
  useEffect(() => {
    const budgetType = [
      ...Array.from(new Set(indicatorFiltered.map((item) => item.budgetType))),
    ];

    if (budgetType.includes(selectedBudgetType))
      handleDropdownChange(selectedBudgetType);
    else if (selectedBudgetType == '') handleDropdownChange('Total');
    else if (selectedBudgetType == 'NA' && budgetType.length > 1)
      handleDropdownChange('Total');
    else handleDropdownChange(budgetType[0]);
  }, [indicatorFiltered]);

  function hideMenu(e) {
    setCurrentViz(e.target.getAttribute('href'));
    if (e.target.getAttribute('href') == '#tableView') setIsTable(true);
    else setIsTable(false);
  }

  function handleDropdownChange(val: any) {
    const finalFiltered = filter_data_budgettype(indicatorFiltered, val);
    setSelectedBudgetType(val);
    setFinalFiltered(finalFiltered);
  }

  return (
    <>
      <Wrapper>
        <VizWrapper>
          <VizHeader>
            <VizTabs className="viz__tabs">
              {vizToggle.map((item, index) => (
                <li key={`toggleVizItem-${index}`}>
                  <a href={item.id} onClick={(e) => hideMenu(e)}>
                    {item.icon}
                    {item.name}
                  </a>
                </li>
              ))}
            </VizTabs>
            {budgetTypes.length > 1 && !isTable && (
              <Menu
                value={selectedBudgetType}
                options={budgetTypes}
                heading="Select Budget Type"
                handleChange={handleDropdownChange}
              />
            )}
          </VizHeader>

          {vizItems.map((item, index) => (
            <VizGraph
              className="viz__graph"
              key={`vizItem-${index}`}
              id={item.id}
            >
              {item.graph}
            </VizGraph>
          ))}

          <ExplorerSource>
            <SourceText>
              <strong>Data Source: </strong>
              <p>{data.organization}</p>
            </SourceText>

            <SourceButtons>
              {/* <Button
                href="https://docs.google.com/document/d/1PlnurMmjyzKdIZ5ktHbQZxYmI0XWKdd0NAW1OHtvhe8/preview"
                rel="noreferrer"
                target="_blank"
                size="sm"
                kind="primary-outline"
                icon={<ExternalLink fill="#076775" />}
              >
                Data Guidebook
                <span className="sr-only"> :opens in new window</span>
              </Button> */}
              {/* <DownloadViz
                viz={currentViz}
                type={selectedBudgetType}
                indicator={
                  indicatorFiltered[0]
                    ? indicatorFiltered[0]['indicators']
                    : 'Budget Estimates'
                }
                name={data.title}
              /> */}
              <Button
                kind="primary"
                size="sm"
                icon={<Download />}
                onClick={() => downloadPackage(data.allRes, 'Dataset')}
              >
                Download Data Package
              </Button>
            </SourceButtons>
          </ExplorerSource>
        </VizWrapper>
      </Wrapper>
    </>
  );
};

export default ExplorerViz;

export const Wrapper = styled.section`
  /* display: grid;
  gap: 2rem;
  grid-template-columns: 312px minmax(0, 1fr); */
  margin-top: 2.5rem;

  h3 {
    font-weight: 800;
    font-size: 18px;
    line-height: 156%;
    border-bottom: 1px solid #eff2f2;
    padding-bottom: 1rem;
  }

  @media (max-width: 980px) {
    /* display: block; */
    margin-top: 1.5rem;
  }
`;

export const VizWrapper = styled.div`
  background-color: #fff;
  border: 1px solid #f7fdf9;
  border-radius: 6px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.14);
`;

export const VizHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem;
  gap: 1.5rem;

  ${MenuComp} {
    flex-basis: 270px;
  }
`;

export const VizTabs = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem;

  li {
    min-width: 0;
  }

  a {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-decoration: none;
    padding-bottom: 12px;
    min-width: 200%;
    display: block;
    text-align: center;
    border-bottom: 2px solid transparent;
    font-weight: bold;
    color: hsla(0, 0%, 0%, 0.32);

    svg {
      margin-bottom: -3px;
      margin-right: 5px;
      fill: hsla(0, 0%, 0%, 0.32);

      &.svg-stroke {
        stroke: hsla(0, 0%, 0%, 0.32);
      }
    }

    &[aria-selected='true'] {
      color: #de4b33;
      border-bottom: 2px solid #de4b33;

      svg {
        fill: #de4b33;

        &.svg-stroke {
          stroke: #de4b33;
        }
      }
    }
  }
`;

export const VizGraph = styled.div`
  margin: 0 2rem 2rem;
  height: 500px;
  overflow-y: auto;
  overflow-x: auto;
`;

export const ExplorerSource = styled.div`
  border-top: 1px solid #cdd1d1;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 1rem 0;
  margin: 0 1.5rem;

  button,
  a {
    svg {
      width: 10px;
      margin-left: 8px;
    }
  }
`;

export const SourceText = styled.div`
  flex-basis: 35%;
  flex-grow: 1;
  font-size: 14px;

  p {
    color: var(--text-light-medium);
    font-weight: var(--font-weight-medium);
    display: inline;
  }
`;

export const SourceButtons = styled.div`
  /* display: flex;
  flex-wrap: wrap;
  gap: 1rem; */
`;
