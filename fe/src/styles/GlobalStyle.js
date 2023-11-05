import { createGlobalStyle } from 'styled-components';

const GloabalStyle = createGlobalStyle`
*, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    width: 390px;
    height: auto;
    margin:0 auto;
  }
`;

export default GloabalStyle;
