import { ArrowTail, Chevron } from 'components/icons';
import { Tabbed } from 'components/layouts';
import { tabbedInterface } from 'components/layouts/Tabbed/tabbed.helper';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

let data = {
  tabs: [
    {
      name: 'Sectors',
      id: 'NTG1',
      ico: '/assets/images/placeholder.jpg',
    },
    {
      name: 'Contributors',
      id: 'NTG2',
      ico: '/assets/images/placeholder.jpg',
    },
    {
      name: 'Geography',
      id: 'NTG3',
      ico: '/assets/images/placeholder.jpg',
    },
  ],
  items: [
    {
      content: [
        {
          name: 'Dataset Category',
          img: '/assets/images/placeholder.jpg',
        },
        {
          name: 'Dataset Category',
          img: '/assets/images/placeholder.jpg',
        },
        {
          name: 'Dataset Category',
          img: '/assets/images/placeholder.jpg',
        },
        {
          name: 'Dataset Category',
          img: '/assets/images/placeholder.jpg',
        },
        {
          name: 'Dataset Category',
          img: '/assets/images/placeholder.jpg',
        },
        {
          name: 'Dataset Category',
          img: '/assets/images/placeholder.jpg',
        },
        {
          name: 'Dataset Category',
          img: '/assets/images/placeholder.jpg',
        },
        {
          name: 'Dataset Category',
          img: '/assets/images/placeholder.jpg',
        },
      ],
      id: 'NTG1',
      ico: '/assets/images/placeholder.jpg',
    },
    {
      content: [
        {
          name: 'Dataset Category',
          img: '/assets/images/placeholder.jpg',
        },
        {
          name: 'Dataset Category',
          img: '/assets/images/placeholder.jpg',
        },
        {
          name: 'Dataset Category',
          img: '/assets/images/placeholder.jpg',
        },
        {
          name: 'Dataset Category',
          img: '/assets/images/placeholder.jpg',
        },
        {
          name: 'Dataset Category',
          img: '/assets/images/placeholder.jpg',
        },
      ],
      id: 'NTG2',
      ico: '/assets/images/placeholder.jpg',
    },
    {
      content: [
        {
          name: 'Dataset Category',
          img: '/assets/images/placeholder.jpg',
        },
        {
          name: 'Dataset Category',
          img: '/assets/images/placeholder.jpg',
        },
        {
          name: 'Dataset Category',
          img: '/assets/images/placeholder.jpg',
        },
        {
          name: 'Dataset Category',
          img: '/assets/images/placeholder.jpg',
        },
        {
          name: 'Dataset Category',
          img: '/assets/images/placeholder.jpg',
        },
      ],
      id: 'NTG3',
      ico: '/assets/images/placeholder.jpg',
    },
  ],
};

const HomeExplore = (sectorData) => {
  const TabbedRef = useRef(null);

  return (
    <Wrapper>
      <div className="container">
        <h1>Explore by Sector</h1>
        <p>Sector wise categorization of Datasets and APIs</p>
        <TabbedWrapper ref={TabbedRef}>
          <div>
            <section>
              <div className="categoryGrid">
                {sectorData.sectorData.map((sectorItem, index) => (
                  <a key={`CategoryItem-${index}`}>
                    <div className="categoryCard">
                      <div>
                        <Image
                          className="leftIcon"
                          src={
                            sectorItem.img
                              ? sectorItem.img
                              : '/assets/images/placeholder.jpg'
                          }
                          alt={sectorItem.name}
                          width="100%"
                          height="100%"
                        />
                      </div>
                      <h3>{sectorItem.name}</h3>
                      <ArrowTail className="leadingArrow" />
                    </div>
                  </a>
                ))}
                <div className="categoryCard">
                  <div>
                  </div>
                  <h3>Explore all Sectors</h3>
                  <ArrowTail className="leadingArrow" />
                </div>
              </div>
            </section>
          </div>
        </TabbedWrapper>
      </div>
    </Wrapper>
  );
};

export default HomeExplore;

export const TabbedWrapper = styled.div`
  * {
    color: inherit;
    margin: 0;
  }

  [role='tablist'] {
    a,
    li {
      display: inline-block;
      background: #c3cfd9;
      color: #293845;
      border-radius: 10%;
      position: relative;
      margin: 1%;
    }

    a {
      text-decoration: none;
      padding: 0.5rem;
    }

    [aria-selected] {
      background: #092cb3;
      color: white;
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

const Wrapper = styled.section`
  background-color: #f7f9fa;

  .container {
    padding-top: 5%;
    padding-bottom: 15%;

    h1 {
      margin-bottom: 2%;
    }
  }
`;

const StateList = styled.ul`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(min(360px, 100%), 1fr));

  margin-top: 32px;

  a {
    display: flex;
    flex-direction: column;
    text-decoration-color: transparent;
  }

  h3 {
    padding: 8px;
    text-align: center;
    font-size: 14px;
    background-color: white;
    line-height: 1.5;
  }
`;
