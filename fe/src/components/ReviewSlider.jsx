import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import COLOR from '@styles/color';
import { styled } from 'styled-components';
import { Component } from 'react';

export default class ReviewSlider extends Component {
  render() {
    const { data } = this.props;

    const settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '0px',
      pauseOnHover: true,
      draggable: true,
      centerPadding: '0px',

      appendDots: (dots) => (
        <div
          style={{
            width: '100%',
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

    return (
      <Container>
        <StyledSlider {...settings}>
          {data.map((item) => {
            return (
              <div key={item.id}>
                <Image src={item.url} />
              </div>
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
  height: 400px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 20px;
`;

const StyledSlider = styled(Slider)`
  width: 100%;
  height: 100%;

  .dotsCustom {
    list-style: none;
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
    /* display: block; */
    text-indent: -9999px;
    border: none;
    background: ${COLOR.gray300};
    height: 8px;
    width: 8px;
    border-radius: 100%;
    padding: 0;
  }

  .dotsCustom li.slick-active button {
    background-color: ${COLOR.black};
  }
`;
