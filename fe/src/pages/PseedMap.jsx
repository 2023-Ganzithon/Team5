import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '@components/Modal';
import LogoHeader from '@common/LogoHeader';
import COLOR from '@styles/color';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import MarkerImage from '@assets/Pin.png'
import TabBar from '@common/TabBar';


const PseedMap = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();
  const [location, setLoacation] = useState({ lat: 37.4024064, lng: 127.101385 });
  const [mapMarkers, setMapMarkers] = useState([]);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(successHandler, errorHandler); 
	}, []);

	useEffect(() => {
		const newMarker = (
			<MapMarker
			  key={`current-location`}
			  position={location}
			  image={{
				src: MarkerImage,
				size: { width: 30, height: 35 },
			  }}
			  title={'현재 위치'}
			/>
		  );
		  // 이전 마커 목록과 새로운 마커를 합쳐서 업데이트
		  setMapMarkers((prevMarkers) => [...prevMarkers, newMarker]);
	}, [location]);
	

  const successHandler = (response) => {
		console.log(response); 
		const { latitude, longitude } = response.coords;
		setLoacation({ latitude, longitude });
	};

	const errorHandler = (error) => {
		console.log(error);
	};
  
  return (<>
  <MapContainer>
  <LogoHeader/>
  <KakaoMap
  center={{ lat: location.lat, lng: location.lng }}   // 지도의 중심 좌표
  level={3} >
	<MapMarker
	key={`current-location`}
    position={location}
    image={{
        src: MarkerImage,
        size: { width: 30, height: 35 },
    }}
	title={'현재 위치'}/>
	{mapMarkers}
	{modalOpen && (
        <Modal
          place="장소명" // 모달에 표시할 정보 설정
          point={10}
          totalPoint={100}
          onClose={() => setModalOpen(false)} // 모달 닫기
        />
      )}
  </KakaoMap>
  </MapContainer>
  <TabBar currentTab='map'/></>);
};

export default PseedMap;

const MapContainer = styled.div`
width:100%;
height:100%;
`

const KakaoMap = styled(Map)`
width:100%;
min-height: calc(100vh - 50px);
background-color:${COLOR.green500}
`