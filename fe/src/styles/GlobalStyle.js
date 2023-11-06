import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
  }

  ol, ul {
    list-style: none;
  }

  html {
    background-color: #D9D9D9; /* 전체 페이지 배경을 회색으로 설정 */
  }

  body {
    width: 390px;
    margin: 0 auto;
    height : 100vh;
    background-color: white; /* body 내용의 배경을 흰색으로 설정 */
  }

  .content {
    width: 100%; /* 필요하다면 이 div에 추가적인 스타일을 적용 */
  }
`;

export default GlobalStyle;
