import React from 'react';
import styled from 'styled-components';
import FONT from '@styles/fonts';
import LOGO from '@assets/LogoPseed2.svg'
import COLOR from '@styles/color';
import Button from '@common/Button';

const Login = () => {
// 요청 - 유저이름, 비밀번호
// 응답 -> 토큰
const loginClick = () => {

}

return <LoginContainer>
<Logo src={LOGO} />
    <InputLayout>
        <Label htmlFor="name">이름 *</Label>
        <Input type="text" id="name" />
    </InputLayout>
    <InputLayout>
        <Label htmlFor="name">비밀번호 *</Label>
        <Input type="password" id="password" />
    </InputLayout>
    <Button text='로그인' path='/login' eventName={loginClick} />

    </LoginContainer>;
};

export default Login;

const LoginContainer = styled.div`
min-height: calc(100vh - 84px);
background: ${COLOR.white};
display: flex;
flex-direction: column;
align-items : center;
justify-content:center;
gap: 20px;
`
const Logo = styled.img`
width:200px;
height:250px;
margin-top:100px;
`
const InputLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 354px;
  gap: 10px;
  margin-bottom : 10px;
`;

const Label = styled.label`
  color: ${COLOR.black};
  ${FONT.body}
`;

const Input = styled.input`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 60px;
  padding: 8px 16px;
  border: 1px solid ${COLOR.gray400};
  border-radius: 7px;
  background-color: ${COLOR.white};
  color: ${COLOR.gray500};

  &:active {
    border: 1px solid ${COLOR.black};
  }
`;