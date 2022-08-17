import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: #f9f9f9;
  background-image: linear-gradient(to right, #fdfbfb, #ebedee, #fdfcfb, #e2d1c3);
  box-shadow: rgba(149, 157, 165, 0.2) 0px 4px 6px;
  max-width: 1200px;
  width: 90%;
  margin: auto;
  margin-top: 20px;
  border-radius: 10px;
`;
export const Content = styled.div`
  display: flex;
  padding: 20px 40px;
  flex-direction: column;
  width: 80%;
  margin: auto;
  justify-content: space-around;
  height: 100%;
  color: #333;
  .title {
    font-weight: 600;
    font-size: 22px;
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
  }
  h2 {
    text-align: center;
  }
  .profile {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .img--container {
    height: 200px;
    width: 200px;
    background-color: #333;
    border-radius: 50%;
  }
  .profile__image {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;
