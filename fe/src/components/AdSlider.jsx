import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { styled } from 'styled-components';
import { Component } from 'react';
import { MALL_BIGIMG, MALLPATH } from '@constants/mall';
import COLOR from '@styles/color';

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

      appendDots: (dots) => (
        <div
          style={{
            width: '100%',
            position: 'absolute',
            bottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ul> {dots} </ul>
        </div>
      ),
      dotsClass: 'dotsCustom',
    };

    const items = Object.values(MALL_BIGIMG);
    const path = Object.values(MALLPATH);

    const handleClick = (path) => {
      window.location.href = path;
    };
    return (
      <Container>
        <StyledSlider {...settings}>
          {items.map((item, index) => {
            return (
              <button key={index} onClick={() => handleClick(path[index])}>
                <Image src={item} />
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

  .dotsCustom {
    display: inline-block;
    vertical-align: middle;
    margin: auto 0;
    padding: 0;
  }

  .dotsCustom li {
    list-style: none;
    display: inline-block;
    margin: 0 6px;
    padding: 0;
  }

  .dotsCustom li button {
    border: none;
    background: transparent;
    border: 1px solid ${COLOR.white};
    color: transparent;
    display: block;
    height: 8px;
    width: 8px;
    border-radius: 100%;
    padding: 0;
  }

  .dotsCustom li.slick-active button {
    background-color: ${COLOR.white};
  }
`;
