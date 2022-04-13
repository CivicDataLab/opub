import styled from 'styled-components';

const WikiMainPage = styled.main`
    width: 1100px;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;

    .WikiCard {
        background-color: #fff;
        padding: 1.5rem !important;
        border-radius: 12px;
        filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.08));
        border: 1px solid #f1eef1;
        margin-top: 10px;
    }
    .WikiCard h4 {
        font-size: 1.3rem;
        font-weight: 500;
        line-height: 133%;
        display: flex;
    }
`;

export default WikiMainPage;