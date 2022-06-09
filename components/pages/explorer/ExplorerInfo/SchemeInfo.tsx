import React from 'react';
import styled from 'styled-components';

const schemeInfoData = {
  name: 'Scheme Info.',
  id: 'SchemeInfo',
  ico: '/assets/images/placeholder.jpg',
  content: {
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta recusandae, doloribus maiores sit laudantium temporibus totam reiciendis consectetur cum vero officia. Quas molestias qui recusandae in provident excepturi vero possimus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta recusandae, doloribus maiores sit laudantium temporibus totam reiciendis consectetur cum vero officia. Quas molestias qui recusandae in provident excepturi vero possimus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta recusandae, doloribus maiores sit laudantium temporibus totam reiciendis consectetur cum vero officia. Quas molestias qui recusandae in provident excepturi vero possimus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta recusandae, doloribus maiores sit laudantium temporibus totam reiciendis consectetur cum vero officia. Quas molestias qui recusandae in provident excepturi vero possimus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta recusandae, doloribus maiores sit laudantium temporibus totam reiciendis consectetur cum vero officia. Quas molestias qui recusandae in provident excepturi vero possimus.',
    schemeInfo: '',
  },
};

let schemeInfoArray = [...Array(15)].fill('');

const SchemeInfo = () => {
  return (
    <SchemeInfoContainer>
      <h2>Small Description</h2>
      <p>{schemeInfoData.content.description}</p>

      <h2>Scheme Info.</h2>
      <table className="schemeInfoTable">
        {schemeInfoArray.map((schemeItem, index) => (
          <tr key={`schemeItem-${index}`}>
            <td>{schemeItem}</td>
            <td>{schemeItem}</td>
          </tr>
        ))}
      </table>
    </SchemeInfoContainer>
  );
};

export default SchemeInfo;

const SchemeInfoContainer = styled.div`
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
`;
