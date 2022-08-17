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
  margin-top: 40px;
  border-radius: 10px;
`;
export const Content = styled.div`
  display: flex;
  padding: 10px 20px;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  height: 100%;
  align-items: center;
  color: #333;
  .contact__form {
    display: flex;
    justify-content: space-between;
  }
  .form__left {
    display: flex;
    width: 60%;
    flex-direction: column;
  }
  .img-container {
    height: 100px;
    width: 100px;
    border-radius: 50%;
    margin-bottom: 20px;
    background-color: #dae2f8;
    background-image: linear-gradient(to right, #dae2f8, #d6a4a4);
  }
  .img__preview {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
  .form__right {
    display: flex;
    flex-direction: column;
    jutify-content: space-between;

    align-items: flex-start;
  }
  .btn--dark {
    background-color: #333;
    color: #f3f4f4;
    width: 40%;
    align-self: flex-end;
  }
  .input__checkbox {
    width: 80%;
  }
  .check-box {
    width: auto;
  }
`;
export const FormGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  input,
  textarea,
  select {
    width: 80%;
    padding: 10px;
    border: 1px solid #e6e6e6;
    border-radius: 5px;
    margin-bottom: 10px;
    font-family: inherit;
  }
  .group__input {
    width: 80%;
    display: flex;
  }
  label {
    text-align: left;
    display: block;
    margin: 0 0 5px 3px;
  }
  .form__divider {
    color: #eee;
  }
`;
