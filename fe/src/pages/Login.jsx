import React, {useState, useContext} from 'react';
import styled from 'styled-components';
import FONT from '@styles/fonts';
import LOGO from '@assets/LogoPseed2.svg'
import COLOR from '@styles/color';
import Button from '@common/Button';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@store/AuthContextProvider';

const Login = () => {
// 요청 - 유저이름, 비밀번호
// 응답 -> 토큰
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const { setToken, setUserId } = useContext(AuthContext);

  const loginClick = () => {
    const enteredName = document.getElementById('name').value;
    const enteredPassword = document.getElementById('password').value;
    
    setName(enteredName);
    setPassword(enteredPassword);

    let apiUrl = "http://127.0.0.1:8000/users/login/";
    
    let dataToSend = null;

    dataToSend = {
      username: name,
      password: password,
    };

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("토큰 : ",data.token);
      setToken(data.token);//Token.concat 해야하는건지?
      setUserId(data.user_id);
      navigate('/');
    })
    .catch((error) => {
      console.error("로그인 Error:", error);
      alert("로그인 Error:", error);
    });
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
    <Button text='회원가입' path='/signUp' eventName={null} />

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