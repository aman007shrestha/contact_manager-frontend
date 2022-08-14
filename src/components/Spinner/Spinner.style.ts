import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  top: 80px;
  right: 0px;
  left: 0px;
  bottom: 0px;
  height: calc(100vh - 80px);
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5000;
  display: flex;
  justify-content: center;
  align-items: center;
  .loadingSpinner {
    width: 64px;
    height: 64px;
    border: 8px solid;
    border-color: #000 transparent #555 transparent;
    border-radius: 50%;
    animation: spin 1.2s linear infinite;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
export const Spinner = styled.div``;
