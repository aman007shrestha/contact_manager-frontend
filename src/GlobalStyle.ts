import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --maxWidth: 1280px;
    --white: #fff;
    --lightGrey: #eee;
    --medGrey: #353535;
    --darkGrey: #1c1c1c;
    --fontSuperBig: 2.5rem;
    --fontBig: 1.5rem;
    --fontMed: 1.2rem;
    --fontSmall: 1rem;
  }

  * {
    box-sizing: border-box;
    font-family: 'Abel', sans-serif;
  }

  body {
    margin: 0;
    padding: 0;
    
    h1 {
      font-size: 2rem;
      font-weight: 600;
      color: var(--black);
    }

    h3 {
      font-size: 1.1rem;
      font-weight: 600;
    }

    p {
      font-size: 1rem;
      color: var(--black);
    }
    .nav__link{
      text-decoration: none;
      color: rgba(0, 0, 0, 0.85)
    }
    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    .btn {
      padding: 8px 20px;
      font-size: 14px;
      color: #333;
      outline: none;
      cursor:pointer;
      border:none;
      border-radius: 5px;
    }
  }
`;
