import React from 'react';
import styled from 'styled-components';
import FONT from '@styles/fonts';

const Container = styled.div`
p{
  ${FONT.title1}
}
  
`

const Login = () => {
  
  return <><Container><p>Login</p></Container></>;
};

export default Login;
