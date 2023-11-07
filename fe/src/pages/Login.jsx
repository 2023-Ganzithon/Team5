import React from 'react';
import styled from 'styled-components';
import FONT from '@styles/fonts';
import LogoHeader from '@common/LogoHeader';

const Container = styled.div`
p{
  ${FONT.title1}
}
  
`

const Login = () => {
  
  return <><Container>
    <LogoHeader/>
    <p>Login</p></Container></>;
};

export default Login;
