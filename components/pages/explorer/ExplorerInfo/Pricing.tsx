import { Button } from 'components/actions';
import React from 'react';
import styled from 'styled-components';

const PricingData = {
  name: 'Pricing',
  id: 'Prcing',
  ico: '/assets/images/placeholder.jpg',
  content: [
    {
      feature: 'Sample Data',
      free: true,
      upgraded: true,
      premium: true,
    },
    {
      feature: 'APIs',
      free: true,
      upgraded: true,
      premium: true,
    },
    {
      feature: 'PDF Files',
      free: true,
      upgraded: true,
      premium: true,
    },
    {
      feature: 'CSV Files',
      free: true,
      upgraded: true,
      premium: true,
    },
    {
      feature: 'XLSM File',
      free: true,
      upgraded: true,
      premium: true,
    },
    {
      feature: '01 Month',
      free: true,
      upgraded: true,
      premium: true,
    },
    {
      feature: '03 Month',
      free: true,
      upgraded: true,
      premium: true,
    },
    {
      feature: '06 Month',
      free: true,
      upgraded: true,
      premium: true,
    },
    {
      feature: '12 Month',
      free: true,
      upgraded: true,
      premium: true,
    },
  ],
};

const Pricing = () => {
  return (
    <div>
      <PricingContainer>
        <h2>Pricing Modal - This is subjected to change in the future</h2>
        <table className="pricingTable">
            <tr>
            <th>Features</th>
            <th>Free</th>
            <th>Upgraded</th>
            <th>Premium</th>
            </tr>

            {PricingData.content.map((priceItem, index) => (
            <tr key={`priceItem-${index}`}>
                <td>{priceItem.feature}</td>
                <td>{priceItem.free ? 'Yes' : 'No'}</td>
                <td>{priceItem.upgraded ? 'Yes' : 'No'}</td>
                <td>{priceItem.premium ? 'Yes' : 'No'}</td>
            </tr>
            ))}

            <tr>
            <td></td>
            <td>
                <Button size="sm">Get This Plan</Button>
            </td>
            <td>
                <Button size="sm">Get This Plan</Button>
            </td>
            <td>
                <Button size="sm">Get This Plan</Button>
            </td>
            </tr>
        </table>

        <NewPriceCard>
            <h3>Still need more clarity on the pricing model ?</h3>
            <p>Let us help you and make your life easier.</p>
            <Button kind="primary">Contact Us</Button>
        </NewPriceCard>
      </PricingContainer>  
    </div>
  );
};

export default Pricing;

const PricingContainer = styled.div`
  .pricingTable {
    background: white;
    border: 2px solid #c3cfd9;
    width: 100%;
    margin-top: 2%;
    margin-bottom: 2%;

    tr:first-child {
      border-bottom: 2px solid #dfe6ed;
      padding-top: 10px;
      padding-bottom: 10px;
    }

    tr:last-child {
      border-top: 2px solid #dfe6ed;
    }

    td,
    th {
      text-align: center;
      padding: 10px;
      border-right: 2px solid #dfe6ed;

      Button {
        margin: 0 auto;
      }
    }

    td:first-child,
    th:first-child {
      text-align: left;
    }

    tr {
      padding: 10px;
    }
  }
`;

const NewPriceCard = styled.div`
  border: 2px solid #9eadba;
  padding: 40px;
  background: white;

  p,
  Button {
    margin-top: 1vh;
  }
`;
