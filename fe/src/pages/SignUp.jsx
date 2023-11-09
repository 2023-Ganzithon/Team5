import React from 'react';
import styled from 'styled-components';
import FONT from '@styles/fonts';
import COLOR from '@styles/color';
import LOGO from '@assets/LogoPseed2.svg'
import Button from '@common/Button';

const SignUp = () => {
    // 요청 - 유저이름, 비밀번호, 비밀번호 확인, 이메일
    // 응답 -> 유저이름, 이메일
    const signUpClick = () => {
        //백엔드에 보내고 응답결과에 따라 알림창 or 로그인페이지로 이동

      };

  return <SignUPContainer>
    <Logo src={LOGO} />
    <InputLayout>
        <Label htmlFor="name">이름 *</Label>
        <Input type="text" id="name" />
    </InputLayout>
    <InputLayout>
        <Label htmlFor="name">비밀번호 *</Label>
        <Input type="password" id="password" />
    </InputLayout>
    <InputLayout>
        <Label htmlFor="name">비밀번호 확인 *</Label>
        <Input type="password" id="passwordConfirm" />
    </InputLayout>
    <InputLayout>
        <Label htmlFor="name">이메일 *</Label>
        <Input type="email" id="email" />
    </InputLayout>
    <Button text='회원가입' path='/signup' eventName={signUpClick} />

    </SignUPContainer>;
};

export default SignUp;

const SignUPContainer = styled.div`
  min-height: calc(100vh - 84px);
  background: ${COLOR.white};
  display: flex;
  flex-direction: column;
  align-items : center;
  gap: 10px;
  padding-bottom:10px;
`

const Logo = styled.img`
width:200px;
height:250px;
margin-top:30px;
`
const InputLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 354px;
  gap: 10px;
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