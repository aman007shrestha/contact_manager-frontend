import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
  // position: fixed;
  background-color: #f9f9f9;
  background-image: linear-gradient(to right, #fdfbfb, #ebedee, #fdfcfb, #e2d1c3);
`;
export const Content = styled.div`
  max-width: 1200px;
  width: 90%;
  margin: auto;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  .title {
    display: flex;
    align-items: center;
    gap: 30px;
    cursor: pointer;
    @media screen and (max-width: 500px) {
      gap: 20px;
    }
  }
  .icon {
    display: flex;
    align-items: center;
    height: 100%;
    font-size: 28px;
  }
  .nav__right {
    display: flex;
    gap: 100px;
    @media screen and (max-width: 500px) {
      gap: 20px;
    }
  }
  .btn__logout {
    display: flex;
    align-items: center;
    gap: 8px;
    background: none;
    border: none;
    color: rgba(0, 0, 0, 0.85);
    font-size: 16px;
    cursor: pointer;
  }
`;
