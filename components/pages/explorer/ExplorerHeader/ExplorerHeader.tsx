import React from 'react';
import styled from 'styled-components';
import { Share } from 'components/actions';
import { Tags } from 'components/data';
import { categoryIcon, categoryTag } from 'utils/explorer';
import Image from 'next/image';
import { Button } from 'components/actions';
import { Arrow, Facebook, Linkedin, Twitter } from 'components/icons';

const ExplorerHeader:React.FC<{data: any; meta?: any}> = ({ data, meta }) => {
  // console.log(data, meta);
  return (
    <Wrapper>

      <div className="container">
        <div className='leftPanel'>
          <HeaderContent>
            {/* <figure>{categoryIcon(data.tags)}</figure> */}
            <div>
              <p className='orgName'>{data.organization}</p>
              <h2>{data.title}</h2>
              {/* <Tags data={data.tags} /> */}
            </div>
          </HeaderContent>
          <Seperator />
          <HeaderText>{data.notes}</HeaderText>
          {/* {meta && (
            <HeaderMeta>
              {meta['Type of Scheme'] && <span>{meta['Type of Scheme']}</span>}
              {<span>{categoryTag(data.tags)}</span>}
            </HeaderMeta>
          )} */}
          <div className='sm_meta__footer'>
            <div className='meta_footer'>
              <IconWrapper>
              </IconWrapper>
              <p>Updated Weekly</p>
              <IconWrapper>
              </IconWrapper>
              <p>CC-BY-NC</p>
              <IconWrapper>
              </IconWrapper>
              <p>Closed Access</p>
            </div>
            <div>
              <SMWrapper>
                <Twitter width='20px' />
              </SMWrapper>
              <SMWrapper>
                <Facebook width='20px' />
              </SMWrapper>
              <SMWrapper>
                <Linkedin width='20px' />
              </SMWrapper>
            </div>
          </div>
        </div>
        <div className='Infobox'>
          <Image
              src="/assets/images/placeholder.jpg"
              width={500}
              height={350}
              alt=""
            />
          <div className='dataBox'>
            <p className='headTag'>Total Downloads:</p>
            <p>53977</p>
          </div>
          <Seperator />
          <div className='dataBox'>
            <p className='headTag'>Duration:</p>
            <p>Year 2010-15</p>
          </div>
          <div className='dataBox'>
            <p className='headTag'>Published On:</p>
            <p>19 Oct 2017</p>
          </div>
          <div className='dataBox'>
            <p className='headTag'>Last Updated:</p>
            <p>21 Apr 2022</p>
          </div>
          <Seperator />
          <div className='dataBox'>
            <Button
            className='dataBox__button'
            >
              20
              <Arrow className='rotateArrow' />
            </Button>
            <Button
              className='dataBox__button'>
              Get Access
            </Button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ExplorerHeader;

const Wrapper = styled.div`
  background-color: #fff;
  padding-bottom: 2.5rem;
  padding-top: 2.5rem;

  section {
    margin-top: 2.5rem;
  }

  .container {
    display: flex;
    justify-content: flex-start;

    .Infobox{
      background: #f7f9fa;
      border: 2px solid #c3cfd9;
      padding: 10px;
      font-size: 0.85em;
      width: 30%;

      .dataBox{
        display: flex;
        justify-content: space-between;

        .headTag {
          font-weight: bold;
        }

        .dataBox__button {
          font-size: 0.85em;

          .rotateArrow {
            // transform: rotateY(-90deg);
          }
        }
      }
    }

    .leftPanel {
      margin-right: 20px;

      .sm_meta__footer {
        display: flex;
        justify-content: space-between;

        div {
          display: flex;          
        }

        .meta_footer{
          p {
            margin-right: 6px;
          }
        }

      }
    }
  }

`;

const IconWrapper = styled.div`
  width: 25px;
  border-radius: 20px;
  background: #c4a4d2;
`;

const SMWrapper = styled.div`
  width: 25px;
  border: 2px solid #c3cfd9;
  border-radius: 20px;
  color: #c3cfd9;
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
