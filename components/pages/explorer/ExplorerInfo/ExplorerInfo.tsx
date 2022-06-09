import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Share } from 'components/actions';
import { Tags } from 'components/data';
import { categoryIcon, categoryTag, tabbedInterface } from 'utils/explorer';
import Image from 'next/image';
import { Button } from 'components/actions';
import { Arrow, Facebook, Linkedin, Twitter } from 'components/icons';
import Link from 'next/link';
import ExplorerViz from '../ExplorerViz';
import { MenuComp } from 'components/actions/Menu/MenuComp';

import AboutData from './AboutData';
import DataStories from './DataStories';
import Pricing from './Pricing';
import Visualizations from './Visualizations';
import RatingsReviews from './RatingsReviews';
import SchemeInfo from './SchemeInfo';
import RelatedDatasets from './RelatedDatasets';
import DataAndApis from './DataAndApis';

let ExplorerData = {
  tabs: [
    {
      name: 'About Data',
      id: 'AboutData',
      ico: '/assets/images/placeholder.jpg',
    },
    {
      name: 'Scheme Info.',
      id: 'SchemeInfo',
      ico: '/assets/images/placeholder.jpg',
    },
    {
      name: 'Data & APIs',
      id: 'DataAPIs',
      ico: '/assets/images/placeholder.jpg',
    },
    {
      name: 'Visualizations',
      id: 'Visualizations',
      ico: '/assets/images/placeholder.jpg',
    },
    {
      name: 'Data Stories',
      id: 'DataStories',
      ico: '/assets/images/placeholder.jpg',
    },
    {
      name: 'Rating & Reviews',
      id: 'RatingsReviews',
      ico: '/assets/images/placeholder.jpg',
    },
    {
      name: 'Pricing',
      id: 'Pricing',
      ico: '/assets/images/placeholder.jpg',
    },
  ],
};

let metadataArray = [...Array(20)].fill('');

const ExplorerInfo: React.FC<{
  data: any;
  meta?: any;
  vizData?: any;
  resUrl?: any;
  vizCompData?: any;
}> = ({ data, meta, vizData, resUrl, vizCompData }) => {
  const TabbedRef = useRef(null);

  useEffect(() => {
    // ceating tabbed interface for viz selector
    const tablist = TabbedRef.current.querySelector('ul');
    const panels = TabbedRef.current.querySelectorAll('.infoSections');
    tabbedInterface(tablist, panels);

    console.log(tablist, panels);
  }, []);

  return (
    <Wrapper>
      <div className="container">
        <TabbedWrapper ref={TabbedRef}>
          <ul>
            {ExplorerData.tabs.map((item, index) => (
              <li key={`toggleItem-${index}`}>
                <a href={`#${item.id}`}>{item.name}</a>
              </li>
            ))}
          </ul>

          <div className="tabdetailsContainer">
            <div className="tabDetails">
              {ExplorerData.tabs.map((item, index) => (
                <section key={`CategoryMenu-${index}`} id={item.id} className='infoSections'>
                  {(() => {
                    switch (item.name) {
                      case 'About Data':
                        return <AboutData data={data} />;
                      case 'Scheme Info.':
                        // return <SchemeInfo />;
                        return 'Work in Progress';
                      case 'Data & APIs':
                        return <DataAndApis data={vizCompData} fileData={vizData} resUrl={resUrl}/>
                      case 'Visualizations':
                        // return <Visualizations />;
                        return 'Work in Progress';
                      case 'Data Stories':
                        // return <DataStories />;
                        return 'Work in Progress';
                      case 'Rating & Reviews':
                        // return <RatingsReviews />;
                        return 'Work in Progress';
                      case 'Pricing':
                        // return <Pricing />;
                        return 'Work in Progress';
                    }
                  })()}
                </section>
              ))}
            </div>

            <div className="metadataContainer">
              <h2>Meta data</h2>
              <table className="metadataTable">
                <tbody>
                  {/* {console.log(metadataArray)} */}
                  {metadataArray.map((metaItem, index) => (
                    <tr key={`MetadataItem-${index}`}>
                      <td>{metaItem}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabbedWrapper>
      </div>

      <RelatedDatasets />

      <Footer>Footer</Footer>
    </Wrapper>
  );
};

export default ExplorerInfo;

const Footer = styled.div`
  background-color: #c3cfd9;
  text-align: center;
  height: 10vh;
`;

const Wrapper = styled.div`
  background-color: #f7f9fa;
  // padding-bottom: 2.5rem;
  padding-top: 2.5rem;

  section {
    margin-top: 2.5rem;
  }
`;

export const TabbedWrapper = styled.div`
  // * {
  //   color: inherit;
  //   margin: 0;
  // }
  [role='tablist'] {
    display: flex;
    a {
      display: inline-block;
      background: #c3cfd9;
      color: #293845;
      border-radius: 5px;
      // position: relative;
      margin: 1%;
      padding: 0.5rem;
      width: fit-content;
      text-decoration: none;
      width: 100%;
    }
    li {
      width: 13%;
      margin-right: 10px;
      text-align: center;
    }

    [aria-selected] {
      background: #092cb3;
      color: white;
      padding: 0.5rem;
    }
  }
  [role='tabpanel'] {
    // border: 2px solid;
    // padding: 1.5rem;
    // * + * {
    //   margin-top: 0.75rem;
    // }
  }

  .tabdetailsContainer {
    display: flex;
    padding-top: 2.5rem;

    .tabDetails {
      width: 80%;
      padding-right: 20px;
    }

    .metadataContainer {
      width: 20%;
      margin-top: 2rem;

      h2 {
        margin-top: 1%;
        margin-bottom: 1%;
      }

      .metadataTable {
        border: 2px solid #c3cfd9;
        background: white;
        width: 100%;

        td {
          padding: 15px;
        }

        tr {
          border-bottom: 2px solid #c3cfd9;
        }
      }
    }
  }

  @media (max-width: 550px) {
    [role='tablist'] {
      li,
      a {
        display: block;
        position: static;
      }
      a {
        border: 2px solid #222 !important;
      }
      li + li a {
        border-top: 0 !important;
      }
      [aria-selected] {
        position: static;
      }
    }
    [role='tabpanel'] {
      border-top: 0;
    }
  }
`;
