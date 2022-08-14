import styled from 'styled-components';
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 500px;
  height: calc(100vh-80px);
  background-image: linear-gradient(#fdfcfb, #e2d1c3);
`;

export const Content = styled.div`
  width: 80%;
  margin: auto;
  text-align: center;
  color: #333;
  h2 {
    font-weight: 550;
    color: #4a4946;
  }
  p {
    text-align: center;
  }
  .primary__button {
    background-color: #f5f3eb;
    font-weight: 600;
  }
  .secondary__button {
    margin: auto;
    background-color: #333;
    color: #f5f3eb;
    margin-left: 20px;
    font-weight: 600;
  }
`;
export const FormGroup = styled.div`
  margin-bottom: 10px;
  input,
  textarea,
  select {
    width: 100%;
    padding: 10px;
    border: 1px solid #e6e6e6;
    border-radius: 5px;
    margin-bottom: 10px;
    font-family: inherit;
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
