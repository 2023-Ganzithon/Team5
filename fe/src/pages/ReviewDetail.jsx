import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import USER_IMG from '@assets/userImg.png';
import REVIEW_IMG from '@assets/reviewImg.png';

import Header from '@common/Header';
import ReviewSlider from '@components/ReviewSlider';
import Button from '@common/Button';
import Rate from '@components/Rate';

import COLOR from '@styles/color';
import FONT from '@styles/fonts';
import { PATH } from '@constants/path';
import { BUTTON_NAME } from '@constants/buttonName';
import { MALLNAME, MALLPATH } from '@constants/mall';

const ReviewDetail = () => {
  const { state } = useLocation();

  // const review = {
  //   id: state,
  //   userImg: USER_IMG,
  //   nickname: '김예은',
  //   published_date: '2023-11-02',
  //   star: 2,
  //   image: REVIEW_IMG,
  //   //  [
  //   //   { id: 1, url: REVIEW_IMG },
  //   //   { id: 2, url: REVIEW_IMG },
  //   //   { id: 3, url: REVIEW_IMG },
  //   // ],
  //   title: '땡땡의 아름다운 반지',
  //   body: '누구한테 선물 주려고 샀는데 너무 좋아하고 어쩌고 저쩌고 행복합니다람롱롱랑랑 누구한테 선물 주려고 샀는데 너무 좋아하고 어쩌고 저쩌고 행복합니다람롱롱랑랑누구한테 선물 주려고 샀는데 너무 좋아하고 어쩌고 저쩌고 행복합니다람롱롱랑랑누구한테 선물 주려고 좋아하고 어쩌고 저쩌고 행복합니다람롱롱랑랑누구한테 선물 주려고 좋아하고 어쩌고 저쩌고 행복합니다람롱롱랑랑누구한테 선물 주려고 ',
  //   shoppingmall: '마로코로호',
  // };

  const [review, setReview] = useState({
    pk: null,
    profile: {
      nickname: '',
      image: '',
    },
    shoppingmall: '',
    title: '',
    body: '',
    image: '',
    published_date: '',
    star: 0,
  });

  // 리스트 받아오기
  useEffect(() => {
    fetch(`/review/1/`)
      .then((res) => res.json())
      .then((data) => {
        setReview(data);
      });
  }, []);

  // 날짜 yyyy-mm-dd 변환
  const ChangeDate = (fullDate) => {
    const regex = /^(\d{4}-\d{2}-\d{2})/;
    const match = fullDate.match(regex);

    if (match && match[1]) {
      return match[1];
    } else {
      // 잘못된 또는 다른 날짜 형식 처리
      console.error('잘못된 날짜 형식:', fullDate);
      return null; // 또는 사용 사례에 따라 원래 fullDate를 반환합니다.
    }
  };

  // 쇼핑몰 링크 제공하기
  const getLink = (mallName) => {
    console.log('클릭됨');
    switch (mallName) {
      case MALLNAME.MARCOROHO:
        return MALLPATH.MARCOROHO;
      case MALLNAME.DAY30:
        return MALLPATH.DAY30;
      case MALLNAME.PLM:
        return MALLPATH.PLM;
      case MALLNAME.SAVE_CH:
        return MALLPATH.SAVE_CH;
      case MALLNAME.GFSTORE:
        return MALLPATH.GFSTORE;
      default:
        console.error('Unknown shopping mall:', mallName);
        return null;
    }
  };

  const [isShowMore, setIsShowMore] = useState(false);

  const reviewText = review.body;
  const textLimit = 145;
  const shortReview = reviewText.slice(0, textLimit);

  return (
    <Container>
      <Header title={'리뷰 상세'} backUrl={PATH.REVIEW_HOME} />
      <Wrapper>
        <InfoWrapper>
          <div style={{ display: 'flex' }}>
            {/* front - userImg / nickname */}
            {/* back - profile.image / profile.nickname */}
            <img src={review.profile.image} />
            <div className="namerateinfo">
              <p className="name">{review.profile.nickname}</p>
              <Rate size={'13'} rate={review.star} />
            </div>
          </div>
          <p className="day">{ChangeDate(review.published_date)}</p>
        </InfoWrapper>
        <SliderWrapper>
          <ReviewSlider data={review.image} />
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
        <Button text={BUTTON_NAME.MALL} path={getLink(review.shoppingmall)} />
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
  margin-top: 10px;
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
