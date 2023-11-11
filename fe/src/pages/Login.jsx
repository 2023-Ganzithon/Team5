import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import FONT from '@styles/fonts';
import LOGO from '@assets/LogoPseed2.svg';
import COLOR from '@styles/color';
import Button from '@common/Button';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@store/AuthContextProvider';

const Login = () => {
  // 요청 - 유저이름, 비밀번호
  // 응답 -> 토큰
  const nameRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const loginClick = () => {
    let apiUrl = 'http://127.0.0.1:8000/users/login/';

    const data = {
      username: nameRef.current.value,
      password: passwordRef.current.value,
    };

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if(data.error === undefined){
          login({ token: data.token, userId: data.user_pk });
          navigate('/');
        }else{
          alert("이름과 비밀번호를 다시 한 번 확인해주세요.")
        }
      })
      .catch((error) => {
        console.error('로그인 Error:', error);
        alert('로그인 Error:', error);
      });
  };

  return (
    <LoginContainer>
      <Logo src={LOGO} />
      <div>
        <InputLayout>
          <Label htmlFor="name">이름 *</Label>
          <Input type="text" id="name" ref={nameRef} />
        </InputLayout>
        <InputLayout>
          <Label htmlFor="name">비밀번호 *</Label>
          <Input type="password" id="password" ref={passwordRef} />
        </InputLayout>
      </div>
      <Button text="로그인" path="/login" eventName={loginClick} />
      <Button text="회원가입" path="/signUp" eventName={null} />
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  background: ${COLOR.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;
const Logo = styled.img`
  width: 200px;
  height: 250px;
  margin-top: 30px;
`;
const InputLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 354px;
  gap: 10px;
  margin-bottom: 10px;
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
