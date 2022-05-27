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

const relatedDatasets = [
  {
    text: 'National Highways Data - A Placeholder text for Headings',
    content:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
    link: '',
    image: '/assets/images/placeholder.jpg',
    pubDate: '12 Apr, 2022',
    org: 'PhonePe',
    tag: 'Category Tag',
  },
  {
    text: 'Beti Bachao ',
    content:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
    link: '',
    image: '/assets/images/placeholder.jpg',
    pubDate: '13 Jun, 2022',
    org: 'NIC',
    tag: 'Category Tag',
  },
  {
    text: 'Beti Bachao ',
    content:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
    link: '',
    image: '/assets/images/placeholder.jpg',
    pubDate: '13 Jun, 2022',
    org: 'NPCI',
    tag: 'Category Tag',
  },
];

let ExplorerData = {
  tabs: [
    {
      name: 'About Data',
      id: 'AboutData',
      ico: '/assets/images/placeholder.jpg',
    },
    {
      name: 'Scheme Info.',
      id: 'EDM2',
      ico: '/assets/images/placeholder.jpg',
      content: {
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta recusandae, doloribus maiores sit laudantium temporibus totam reiciendis consectetur cum vero officia. Quas molestias qui recusandae in provident excepturi vero possimus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta recusandae, doloribus maiores sit laudantium temporibus totam reiciendis consectetur cum vero officia. Quas molestias qui recusandae in provident excepturi vero possimus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta recusandae, doloribus maiores sit laudantium temporibus totam reiciendis consectetur cum vero officia. Quas molestias qui recusandae in provident excepturi vero possimus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta recusandae, doloribus maiores sit laudantium temporibus totam reiciendis consectetur cum vero officia. Quas molestias qui recusandae in provident excepturi vero possimus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta recusandae, doloribus maiores sit laudantium temporibus totam reiciendis consectetur cum vero officia. Quas molestias qui recusandae in provident excepturi vero possimus.',
        schemeInfo: '',
      },
    },
    {
      name: 'Visualizations',
      id: 'EDM3',
      ico: '/assets/images/placeholder.jpg',
      content: 'Visualizations',
    },
    {
      name: 'Data Stories',
      id: 'DataStories',
      ico: '/assets/images/placeholder.jpg',
    },
    {
      name: 'Rating & Reviews',
      id: 'EDM5',
      ico: '/assets/images/placeholder.jpg',
      content: 'Rating & Reviews',
    },
    {
      name: 'Pricing',
      id: 'Pricing',
      ico: '/assets/images/placeholder.jpg',
    },
  ],
};

let metadataArray = [...Array(20)].fill('');
let schemeInfoArray = [...Array(15)].fill('');

const ExplorerInfo: React.FC<{
  data: any;
  meta?: any;
  vizData?: any;
  resUrl?: any;
}> = ({ data, meta, vizData, resUrl }) => {
  const TabbedRef = useRef(null);

  useEffect(() => {
    // ceating tabbed interface for viz selector
    const tablist = TabbedRef.current.querySelector('ul');
    const panels = TabbedRef.current.querySelectorAll('section');
    tabbedInterface(tablist, panels);
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
                <section key={`CategoryMenu-${index}`} id={item.id}>
                  {(() => {
                    switch (item.name) {
                      case 'About Data':
                        return <AboutData />;
                      case 'Scheme Info.':
                        return (
                          <div>
                            <h2>Small Description</h2>
                            <p>{item.content['description']}</p>

                            <h2>Scheme Info.</h2>
                            <table className="schemeInfoTable">
                              {schemeInfoArray.map((schemeItem, index) => (
                                <tr key={`schemeItem-${index}`}>
                                  <td>{schemeItem}</td>
                                  <td>{schemeItem}</td>
                                </tr>
                              ))}
                            </table>
                          </div>
                        );
                      case 'Visualizations':
                        return (
                          <Visualizations />
                        );
                      case 'Data Stories':
                        return <DataStories />;
                      case 'Rating & Reviews':
                        return (
                          <div>
                            <h2>Add your Ratings and Reviews</h2>
                            <div className="newReviewContainer">
                              <p>Add your Ratings and Reviews</p>
                            </div>
                            <h2>Ratings</h2>
                            <div className="ratingsContainer">
                              <p>Placeholder for Rating Details</p>
                            </div>
                            <h2>Reviews</h2>
                            <div className="ratingsContainer">
                              <p>All Reviews listed here</p>
                            </div>
                          </div>
                        );
                      case 'Pricing':
                        return <Pricing />;
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
      <RelatedDatasets>
        <div className="container">
          <h2>Related Datasets</h2>
          <div className="relatedDataContainer">
            {relatedDatasets.map((dataset, index) => (
              <a key={`FeaturedItem-${index}`}>
                <div className="itemCard">
                  <p>Category Dataset</p>
                  <h4>{dataset.text}</h4>
                  <div className="datePublisher">
                    <h4>{dataset.pubDate}</h4>
                    <h4>.</h4>
                    <h4>{dataset.org}</h4>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </RelatedDatasets>

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

const RelatedDatasets = styled.div`
  background-color: #dfe6ed;
  margin-top: 20px;
  padding-top: 10px;
  padding-bottom: 10px;

  .relatedDataContainer {
    display: flex;
    justify-content: space-between;

    a {
      width: 33%;
    }

    .itemCard {
      padding: 2%;
      margin: 2% 2% 2% 0;
      border: 2px solid #c3cfd9;
      background: white;
      height: 90%;
    }

    .datePublisher {
      display: flex;
      margin-right: 2px;
      color: #788896;
    }
  }
`;

const Wrapper = styled.div`
  background-color: #f7f9fa;
  // padding-bottom: 2.5rem;
  padding-top: 2.5rem;

  section {
    margin-top: 2.5rem;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  gap: 1.5rem;

  figure {
    background-color: #fff;
    max-width: 72px;
    max-height: 72px;
    display: grid;
    place-content: center;
    padding: 22px;
    border-radius: 16px;
    border: 1px solid #cdd1d1;
  }

  svg {
    width: 29px;
    height: 29px;
  }

  h2 {
    font-size: 1.75rem;
    font-weight: 800;
    line-height: 130%;
    margin-bottom: 20px;
  }

  .orgName {
    color: #788896;
  }
`;

const HeaderText = styled.p`
  font-weight: 500;
  line-height: 175%;
`;

const HeaderMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;

  span {
    text-transform: uppercase;
    font-weight: 600;
    font-size: 12px;
    line-height: 130%;
    color: hsla(0, 0%, 0%, 0.6);
    background-color: hsla(0, 0%, 0%, 0.08);
    padding: 4px 6px;
  }

  strong {
    color: #02838b;
    font-weight: bold;
  }
`;

const Seperator = styled.div`
  border-bottom: 2px solid #dfe6ed;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
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
  .categoryGrid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(360px, 100%), 1fr));
    padding-top: 2%;
  }
  .categoryCard {
    padding-top: 1%;
    padding-bottom: 1%;
    margin: 2%;
    border: 2px solid #dfe6ed;
    background: white;
    display: flex;
    align-items: center;
    div {
      width: 10%;
      height: 10%;
      margin: 3%;
    }
    h3 {
      margin-right: 5%;
    }
    .leadingArrow {
      fill: #788896;
      margin-left: auto;
    }
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

    .schemeInfoTable {
      border: 2px solid #c3cfd9;
      background: white;
      width: 100%;

      td {
        padding: 15px;
        border-right: 2px solid #c3cfd9;
      }

      tr {
        border-bottom: 2px solid #c3cfd9;
      }
    }
  }

  .newReviewContainer {
    border: 2px dashed #9eadba;
    background: #dfe6ed;
    padding: 50px;
    text-align: center;
    margin-top: 1%;
    margin-bottom: 1%;
  }

  .ratingsContainer {
    border: 2px solid #9eadba;
    background: white;
    padding: 50px;
    text-align: center;
    margin-top: 1%;
    margin-bottom: 1%;
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
