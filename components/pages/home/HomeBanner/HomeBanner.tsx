import React, { useRef, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { Button } from 'components/actions';

const bannerData = {
    heading: 'A banner section for any kind of exclusive CTA or Announcements',
    img: '/assets/images/placeholder.jpg',
    bgColor: '#8496d9',
    placeholderText: 'Lorem Ipsum is a placeholder text',
    placeholderColor: '#092cb3'
}

const HomeBanner = () => {

  return (
    <div className="container">
      {/* <h2 className="sr-only">Quiz</h2> */}
      <Card style={{backgroundColor: bannerData.bgColor}} >
        <div>
          <h1>{bannerData.heading}</h1>
          <p style={{color: bannerData.placeholderColor}}>{bannerData.placeholderText}</p>
          <div className='actionButtons'>
            <Button
                kind="primary"
            >
                Primary Button
            </Button>
            <Button
                bg='white'
                kind="primary-outline"
            >
                Secondary Button
            </Button>
          </div>
        </div>
        <figure>
          <Image
            src={bannerData.img}
            width={350}
            height={184}
            alt=""
            className="img-cover"
          />
        </figure>
      </Card>
    </div>
  );
};

export default HomeBanner;

const Card = styled.div`
  display: flex;
  gap: 48px;
  justify-content: space-between;
  align-items: stretch;

  padding: 48px;
  border: 1px solid #c3cfd9;
  border-radius: 4px;
  margin-top: -86px;
  background-color: white;
  margin-bottom: 86px;

  button {
    margin-top: 1%;
    position: relative;
    float: left;
    margin-left: 1%;
    font-size: 120%;
    padding: 1%;
  }
  button:first-child {
      margin-left: 0;
  }

  .actionButtons {
    margin-top: 3%;
  }

  figure {
    line-height: 0;
    display: flex;
  }

  @media (max-width: 768px) {
    padding: 24px;

    figure {
      display: none;
    }
  }
`;

const Options = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
  gap: 16px;

  > label {
    min-width: 45%;
  }
`;

const Item = styled.label`
  display: grid;
  grid-template-columns: 1em auto;
  gap: 0.5em;

  input {
    /* Remove native radio style */
    appearance: none;
    background-color: #fff;
    margin: 0;

    font: inherit;
    color: currentColor;
    width: 1.15em;
    height: 1.15em;
    border: 0.15em solid currentColor;
    border-radius: 50%;
    transform: translateY(0.2em);

    display: grid;
    place-content: center;

    &::before {
      content: '';
      width: 0.65em;
      height: 0.65em;
      border-radius: 50%;
      transform: scale(0);
      transition: 120ms transform ease-in-out;
      box-shadow: inset 1em 1em var(--color-grey-200);

      /* Windows High Contrast Mode */
      background-color: CanvasText;
    }

    &:checked::before {
      transform: scale(1);
    }

    &:focus-visible {
      outline: max(2px, 0.15em) solid currentColor;
      outline-offset: max(2px, 0.15em);
    }
  }

  &.quiz-wrong {
    color: var(--color-error);

    input::before {
      box-shadow: inset 1em 1em var(--color-error);
      transform: scale(1);
    }
  }

  &.quiz-correct {
    color: var(--color-success);
    font-weight: bold;

    input::before {
      box-shadow: inset 1em 1em var(--color-success);
      transform: scale(1);
    }
  }
`;

const AnsweredButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: baseline;
`;