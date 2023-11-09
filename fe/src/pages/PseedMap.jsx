import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '@components/Modal';
import LogoHeader from '@common/LogoHeader';
import COLOR from '@styles/color';
import { Map, MapMarker } from 'react-kakao-maps-sdk';


const PseedMap = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();
  const [location, setLoacation] = useState(null); // 현재 위치를 저장할 상태

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(successHandler, errorHandler); // 성공시 successHandler, 실패시 errorHandler 함수가 실행된다.
	}, []);

  const successHandler = (response) => {
		console.log(response); // coords: GeolocationCoordinates {latitude: 위도, longitude: 경도, …} timestamp: 1673446873903
		const { latitude, longitude } = response.coords;
		setLoacation({ latitude, longitude });
	};

	const errorHandler = (error) => {
		console.log(error);
	};

  const locations = [
		{ title: '구름스퀘어', latlng: { lat: 37.4024064, lng: 127.101385 } },
		{ title: '생태연못', latlng: { lat: 33.450936, lng: 126.569477 } },
		{ title: '텃밭', latlng: { lat: 33.450879, lng: 126.56994 } },
		{ title: '근린공원', latlng: { lat: 33.451393, lng: 126.570738 } },
	];
  
  return (<MapContainer>
  <LogoHeader/>
  <KakaoMap
  center={{ lat: 37.4024064, lng: 127.101385 }}   // 지도의 중심 좌표
  level={3} >
    {locations.map((loc, idx) => (
				<MapMarker
					key={`${loc.title}-${loc.latlng}`}
					position={loc.latlng}
					image={{
						src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
						size: { width: 24, height: 35 },
					}}
					title={loc.title}
				/>
			))}
  </KakaoMap>
  {/* <Modal place={"오미자"} point={10} totalPoint={100} />
  <div onClick={()=> setModalOpen(true)}>Map</div> */}
  </MapContainer>);
};

export default PseedMap;

const MapContainer = styled.div`
width:100%;
height:100%;
`

const KakaoMap = styled(Map)`
width:100%;
min-height: calc(100vh - 55px);
background-color:${COLOR.green500}
`