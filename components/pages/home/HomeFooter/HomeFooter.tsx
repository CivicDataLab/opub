import React from 'react';
import styled from 'styled-components';

const HomeFooter = () => {
  return (
    <Footer>

    </Footer>
  );
};

export default HomeFooter;

const Footer = styled.section`
  background-color: #c3cfd9;

  height: 35vh;

  > .container {
    display: flex;
    flex-wrap: wrap;
    gap: 42px;
    padding-block: 48px;
  }

  button {
    margin-top: 16px;
  }

`;
