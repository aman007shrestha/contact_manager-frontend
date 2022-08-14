import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 80px);
`;
export const Content = styled.div`
  height: 500px;
  .intro {
    font-size: 36px;
    font-weight: 500;
    text-align: center;
    @media screen and (max-width: 500px) {
      font-size: 30px;
    }
  }
  .sub-intro {
    margin: 20px 0;
    font-size: 22px;
    color: #918e84;
    text-align: center;
    @media screen and (max-width: 500px) {
      font-size: 20px;
      margin: 15px 0;
    }
  }
`;
