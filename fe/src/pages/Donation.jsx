import React, { useEffect, useState, useContext} from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from '@common/Header';
import COLOR from '@styles/color';
import TabBar from '@common/TabBar';
import FONT from '@styles/fonts';
import Button from '@common/Button';
import axios from "axios";
import { AuthContext } from '@store/AuthContextProvider';

const Donation = () => {
  // 실행시 id 이용해서 백엔드로부터 정보 받아오기 + 사용자의 보유 포인트
  const location = useLocation();
  const id = location.state;
  
  const [imageSrc,setImageSrc] = useState(null);
  const [category,setCategory] = useState("개인");
  const [title,setTitle] = useState("테스트");
  const [perAccomp,setPerAccomp] = useState(70);
  const [moneyAccomp,setMoneyAccomp] = useState(7000);
  const [comment,setComment] = useState("안녕하세요. 사용해주셔서 감사합니다.");
  const [point,setPoint] = useState(0);

  const { user } = useContext(AuthContext)

  useEffect(()=>{
    fetchData();
  },[]);

  const fetchData = async () => {
		try {
		  const response = await axios.get("");
		  const jsonData = response.data;
      
      setImageSrc(jsonData.donation.image);
      setCategory(jsonData.donation.name);
      setTitle(jsonData.donation.title);
      setPerAccomp(jsonData.donation.achievement_rate * 100);
      setMoneyAccomp(jsonData.donation.goal);
      setComment(jsonData.donation.comment);
      setPoint(jsonData.profile.points);

		} catch (error) {
		  console.error("Axios를 통한 요청 중 오류 발생:", error.message);
		}
	  };

  
  const handleDonation = () => {
    const price = document.getElementById('donation').value;
    const postApiUrl = `http://127.0.0.1:8000/${id}/`;
    
    const formData = new FormData();
      formData.append('price', price);

      fetch(postApiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Token ${user.token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("기부 요청 성공: ", data.message);
        alert(data.message);
        fetchData();
      })
      .catch((error) => {
        console.error("기부 에러: ", error);
        alert("기부 Error: ", error);
      });
  };

  return (<>
  <Header title='기부하기' backUrl='/'/>
  <DonationContainer>
    <DonationImg src={imageSrc}/>
    <CategoryT>{category}</CategoryT>
    <DonationTitle>{title}</DonationTitle>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '350px',
      }}
    >
      <PerAccomp>{perAccomp}%</PerAccomp>
      <MoneyAccomp>{moneyAccomp}원 달성</MoneyAccomp>
    </div>
    <Bar>
      <ColorBar perAccomp={perAccomp}></ColorBar>
    </Bar>
    <DonationComment><p>{comment}</p></DonationComment>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        gap:'10px'
      }}
    >
    <InputLayout>
      <Input type="number" id="donation" placeholder={`현재 보유 포인트: ${point} P`}/>
    </InputLayout>
    <Button text='기부' path='#' eventName={handleDonation}/>
  </div>
  </DonationContainer>
  <TabBar currentTab='home'/>
  </>);
};

export default Donation;

const DonationContainer = styled.div`
min-height: calc(100vh - 84px);
background: ${COLOR.white};
display: flex;
flex-direction: column;
align-items : center;
gap: 10px;
padding-bottom:10px;
`
const DonationImg = styled.img`
width: 300px;
height: 300px;
flex-shrink: 0;
border-radius: 12px;
margin-top: 15px;
`
const CategoryT = styled.p`
  ${FONT.caption2}
  color: ${COLOR.green700};
  margin: 3px;
`;
const DonationTitle = styled.p`
${FONT.title1}
margin: 0;
`

const PerAccomp = styled.p`
  ${FONT.footnote}
  font-weight: bold;
  color: ${COLOR.green700};
`;

const MoneyAccomp = styled.p`
  ${FONT.caption2}
`;

const Bar = styled.div`
  width: 350px;
  height: 11px;
  border-radius: 50px;
  background-color: ${COLOR.gray200};
  box-shadow: inset 0px 1px 5px rgba(0, 0, 0, 0.25);
`;

const ColorBar = styled.div`
  width: ${({ perAccomp }) => 350 * (perAccomp / 100)}px;
  height: 11px;
  border-radius: 50px 0 0 50px;
  background-color: ${COLOR.green500};
  box-shadow: inset 0px 1px 5px rgba(0, 0, 0, 0.25);
`;

const DonationComment = styled.div`
border-radius: 7px;
border: 1px solid ${COLOR.green500};
background: ${COLOR.white};
display: flex;
width: 350px;
height: 150px;
flex-direction: column;
flex-shrink: 0;
margin:10px 0;
overflow: hidden;
text-overflow: ellipsis;
p{
  ${FONT.caption2}
  margin: 0;
  padding: 8px;
}
`
const InputLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 354px;
  gap: 8px;
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