import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '@components/Modal';
import LogoHeader from '@common/LogoHeader';
import COLOR from '@styles/color';
import FONT from '@styles/fonts';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import MarkerImage from '@assets/Pin.png'
import UserIcon from '@assets/UserIcon.png'
import TabBar from '@common/TabBar';
import axios from "axios";

const PseedMap = () => {
  const [modalOpen, setModalOpen] = useState(true);
  const [location, setLoacation] = useState({ lat: 37.4024064, lng: 127.101385 });
  const [mapMarkers, setMapMarkers] = useState([]);
  const [modalPlace, setModalPlace] = useState("Test");
  const [modalPoints, setModalPoints] = useState(100000);

	useEffect(() => {
		fetchData();
		navigator.geolocation.getCurrentPosition(successHandler, errorHandler); 
	}, []);

	const successHandler = (response) => {
		console.log(response); 
		const { latitude, longitude } = response.coords;
		setLoacation({ lat: latitude, lng:longitude });
	};

	const errorHandler = (error) => {
		console.log(error);
	};
	
	const fetchData = async () => {
		//마커들 위치 정보 저장
		// name, add, latitude, longitude
		try {
		  const response = await axios.get("http://127.0.0.1:8000/map/");
		  const jsonData = response.data;
		  setMapMarkers(jsonData || []);
		  console.log(jsonData);
		} catch (error) {
		  console.error("Axios를 통한 요청 중 오류 발생:", error.message);
		}
	  };

	const sendPositionHandler = ()=>{
		//백엔드에 현재 좌표 보낼 것
		let apiUrl = `http://127.0.0.1:8000/map/points/?latitude=${location.lat}&longitude=${location.lng}`;
		//성공시
		fetch(apiUrl, {
			method: "POST",
		  })
		  .then((response) => response.json())
		  .then((data) => {
			console.log("장소도달 성공 : ",data);
			if(data.parks.length>0){
				setModalPlace(data.parks[0].name);
				setModalPoints(data.user_profile.points)
				setModalOpen(true);
			}
		  })
		  .catch((error) => {
			console.error("위치달성 에러 :", error);
			alert("위치달성 Error : ", error);
		  });
		
	}
  
  return (<>
  <MapContainer>
  <LogoHeader/>
  <KakaoMap
  center={{ lat: location.lat, lng: location.lng }}   // 지도의 중심 좌표
  level={2} >
	<UserMarker
	key={`current-location`}
    position={location}
    image={{
        src: UserIcon,
        size: { width: 25, height: 25 },
    }}
	title={'현재 위치'}/>
	{mapMarkers.length>0?(mapMarkers.map((item,index)=><MapMarker
	key={index}
    position={{ lat: item.latitude, lng: item.longitude }}
    image={{
        src: MarkerImage,
        size: { width: 35, height: 40 },
    }}
	title={item.name}/>)):(null)}
	
	<ButtonWrapper onClick={sendPositionHandler}>
    <ButtonText>장소 도착 포인트 받기</ButtonText>
  </ButtonWrapper>
	{/* 모달창 제대로 뜨나 확인 필요함!! */}
	{modalOpen && (
        <PseedModal
          place={modalPlace}
          point={10}
          totalPoint={modalPoints}
          onClose={() => setModalOpen(false)}
        />
      )}
  </KakaoMap>
  </MapContainer>
  <TabBar currentTab='map'/>
  </>);
};

export default PseedMap;

const MapContainer = styled.div`
width:100%;
height:100%;
`

const PseedModal = styled(Modal)`
position: sticky;
bottom: 0;
z-index: 20;
`

const UserMarker = styled(MapMarker)`
`

const KakaoMap = styled(Map)`
width:100%;
min-height: calc(100vh - 50px);
background-color:${COLOR.green500}
`

const ButtonWrapper = styled.button`
position: relative;
bottom: 150px;
left:95px;
z-index: 10;
width: 200px;
height: 45px;
border-radius: 50px;
background-color: ${COLOR.green500};
border: none;
box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.24);
cursor:pointer;
`; 

const ButtonText = styled.span`
${FONT.headline}
  color: ${COLOR.white};
`;