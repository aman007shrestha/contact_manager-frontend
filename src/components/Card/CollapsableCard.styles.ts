import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-start;
  background-color: #f9f9f9;
  background-image: linear-gradient(to right, #fdfbfb, #ebedee, #fdfcfb, #e2d1c3);
  box-shadow: rgba(149, 157, 165, 0.2) 0px 4px 6px;
  margin-top: 8px;
`;
export const Content = styled.div`
  max-width: 1200px;
  width: 100%;
  color: #333;
  .card__closed {
    margin: 0 30px;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    transition: height ease 2s;
    @media screen and (max-width: 500px) {
      flex-direction: column;
      height: auto;
    }
  }
  .heart {
    color: #c51104;
  }
  .card__open {
    display: flex;
    padding: 15px 30px;
    justify-content: space-between;
    @media screen and (max-width: 780px) {
      flex-direction: column;
    }
  }
  .card__left {
    display: flex;
    gap: 15px;
    flex-direction: column;
  }
  .card__info {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 200px;
    flex-wrap: wrap;
    justify-content: center;
  }
  .card__contacts {
    display: flex;
    flex-direction: column;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
    width: 400px;
  }
  .card__right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .icon__up {
    display: flex;
    gap: 30px;
  }
  .icon__down {
    display: flex;
    gap: 30px;
  }
  .img--container {
    height: 80px;
    width: 80px;
    border-radius: 50%;
    background-color: #333;
    background-image: linear-gradient(to right, #dae2f8, #d6a4a4);
  }
  .card__image {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
  .contacts__choice {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }

  .item {
    min-width: 150px;
  }
  .icon {
    display: flex;
    align-items: center;
    height: 100%;
    font-size: 28px;
    cursor: pointer;
    color: #333;
  }
  .capitalize {
    text-transform: capitalize;
  }
`;
