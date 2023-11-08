import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { styled } from 'styled-components';
import { Component } from 'react';
import MARCOROHO from '@assets/marcoroho.png';
import COLOR from '@styles/color';

const items = [
  { id: 1, img: MARCOROHO, url: 'https://m.marcoroho.com/' },
  { id: 2, img: MARCOROHO, url: 'https://www.naver.com/' },
  { id: 3, img: MARCOROHO, url: 'https://m.marcoroho.com/' },
  { id: 4, img: MARCOROHO, url: 'https://m.marcoroho.com/' },
  { id: 5, img: MARCOROHO, url: 'https://m.marcoroho.com/' },
];

export default class AdSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000, // 넘어가는 속도
      centerMode: true,
      centerPadding: '0px', // 0px 하면 슬라이드 끝쪽 이미지가 안잘림
      pauseOnHover: true,
      draggable: true,
      centerPadding: '0px',
    };

    const handleClick = (path) => {
      window.location.href = path;
    };
    return (
      <Container>
        <StyledSlider {...settings}>
          {items.map((item) => {
            return (
              <button key={item.id} onClick={() => handleClick(item.url)}>
                <Image src={item.img} />
              </button>
            );
          })}
        </StyledSlider>
      </Container>
    );
  }
}

const Container = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 450px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const StyledSlider = styled(Slider)`
  width: 100%;
  height: 100%;

  .slick-dots {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    list-style: none;
    padding: 0;
    position: absolute;
    bottom: 10px; /* 원하는 위치에 조절 */
  }

  .slick-dots li {
    margin: 0;
  }

  .slick-dots li button {
    font-size: 0; /* 점 내용 숨기기 */
    width: 10px; /* 점 너비 조절 */
    height: 10px; /* 점 높이 조절 */
    margin: 1px; /* 점 간격 조절 */
    background-color: transparent; /* 점의 기본 색상 */
    border: 1px solid ${COLOR.white}; /* 점의 테두리 스타일 및 색상 조절 */
    border-radius: 50%; /* 점을 둥글게 표시 */
  }

  .slick-dots li.slick-active button {
    background-color: ${COLOR.white}; /* 활성화된 점의 배경색 조절 */
  }
`;
