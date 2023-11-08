import React, { useRef, useState, useMemo } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import USER_IMG from '@assets/userImg.png';
import REVIEW_IMG from '@assets/reviewImg.png';

import Header from '@common/Header';
import ReviewSlider from '@components/ReviewSlider';
import Button from '@common/Button';

import COLOR from '@styles/color';
import FONT from '@styles/fonts';
import { PATH } from '@constants/path';
import { BUTTON_NAME } from '@constants/buttonName';

const ReviewDetail = () => {
  const { state } = useLocation();

  const review = {
    id: state,
    userImg: USER_IMG,
    username: '김예은',
    year: 2023,
    month: 11,
    day: 12,
    rate: 4,
    img: [REVIEW_IMG, REVIEW_IMG, REVIEW_IMG],
    title: '땡땡의 아름다운 반지',
    desc: '누구한테 선물 주려고 샀는데 너무 좋아하고 어쩌고 저쩌고 행복합니다람롱롱랑랑 누구한테 선물 주려고 샀는데 너무 좋아하고 어쩌고 저쩌고 행복합니다람롱롱랑랑누구한테 선물 주려고 샀는데 너무 좋아하고 어쩌고 저쩌고 행복합니다람롱롱랑랑누구한테 선물 주려고 좋아하고 어쩌고 저쩌고 행복합니다람롱롱랑랑누구한테 선물 주려고 좋아하고 어쩌고 저쩌고 행복합니다람롱롱랑랑누구한테 선물 주려고 ',
    url: 'https://m.marcoroho.com/',
  };

  const [isShowMore, setIsShowMore] = useState(false);

  const reviewText = review.desc;
  const textLimit = 145;
  const shortReview = reviewText.slice(0, textLimit);

  return (
    <Container>
      <Header title={'리뷰 상세'} backUrl={PATH.REVIEW_HOME} />
      <Wrapper>
        <InfoWrapper>
          <div style={{ display: 'flex' }}>
            <img src={review.userImg} />
            <div className="namerateinfo">
              <p className="name">{review.username}</p>
              <div className="rate">{review.rate}</div>
            </div>
          </div>
          <p className="day">
            {review.year}-{review.month}-{review.day}
          </p>
        </InfoWrapper>
        <SliderWrapper>
          <ReviewSlider data={review.img} />
        </SliderWrapper>
        <TextWrapper>
          <p className="title">{review.title}</p>
          <p className="desc">{isShowMore ? reviewText : shortReview}</p>
          <MoreBtn onClick={() => setIsShowMore(!isShowMore)}>
            {reviewText.length > textLimit && // 버튼명은 조건에 따라 달라진다
              (isShowMore ? '[닫기]' : '...[더보기]')}
          </MoreBtn>
        </TextWrapper>
      </Wrapper>
      <ButtonWrapper>
        <Button text={BUTTON_NAME.MALL} path={review.url} />
      </ButtonWrapper>
    </Container>
  );
};

export default ReviewDetail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${COLOR.white};
  overflow: auto;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  flex-direction: column;
  width: 100%;
`;

const InfoWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 18px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 98%;
  img {
    width: 53px;
    height: 53px;
    overflow: hidden;
    margin-right: 14px;
  }

  .namerateinfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .name {
    ${FONT.subhead}
    font-weight: bold;
    margin-bottom: 5px;
  }

  .rate {
  }

  .day {
    ${FONT.caption1}
    color: ${COLOR.gray400};
    line-height: 210%;
  }
`;

const SliderWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
`;
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .title {
    ${FONT.headline}
    margin-bottom: 10px;
  }

  .desc {
    ${FONT.subhead}
    margin-bottom: 10px;
  }
`;

const MoreBtn = styled.button`
  ${FONT.footnote}
  text-align: left;
  background-color: transparent;
  color: ${COLOR.gray400};
`;

const ButtonWrapper = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100%;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.16);
`;
