import React, {useState} from 'react';
import styled from 'styled-components';
import FONT from '@styles/fonts';
import COLOR from '@styles/color';
import LOGO from '@assets/LogoPseed2.svg'
import Button from '@common/Button';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    // 요청 - 유저이름, 비밀번호, 비밀번호 확인, 이메일
    // 응답 -> 유저이름, 이메일
    const navigate = useNavigate();
    
    const signUpClick = () => {
    const enteredName = document.getElementById('name').value;
    const enteredPassword = document.getElementById('password').value;
    const enteredPasswordConfirm = document.getElementById('passwordConfirm').value;
    const enteredEmail = document.getElementById('email').value;

    let apiUrl = "http://127.0.0.1:8000/users/register/";
    
    let dataToSend = null;

    dataToSend = {
      username: enteredName,
      password: enteredPassword,
      password2: enteredPasswordConfirm,
      email: enteredEmail,
    };
    console.log(dataToSend)
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.username !== enteredName){
        alert('다시 확인해주세요')
      }else{
        console.log(data.username,"님 회원가입 성공");
        navigate('/login');
      }
      
    })
    .catch((error) => {
      console.error("회원가입 에러 :", error);
      alert("회원가입 Error : ", error);
    });
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
    <Button text='회원가입' path='/signUp' eventName={signUpClick}/>

    </SignUPContainer>;
};

export default SignUp;

const SignUPContainer = styled.div`
  min-height: calc(100vh - 84px);
  background: ${COLOR.white};
  display: flex;
  flex-direction: column;
  align-items : center;
  gap: 20px;
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