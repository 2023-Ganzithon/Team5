import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import LogoHeader from '@common/LogoHeader';
import TabBar from '@common/TabBar';
import AdSlider from '@components/AdSlider';
import Rate from '@components/Rate';
import PreviewReview_IMG from '@assets/PreviewReview.png';
import User_IMG from '@assets/userImg.png';

import FONT from '@styles/fonts';
import COLOR from '@styles/color';
import Icon from '@common/Icon';
import Button from '@common/Button';
import { ICON_NAME } from '@constants/iconName';
import { PATH } from '@constants/path';
import { TAB_NAME } from '@constants/tabName';
import { BUTTON_NAME } from '@constants/buttonName';

const reviewList = [
  {
    id: 1,
    img: PreviewReview_IMG,
    title: '땡땡의 아름다운 반지',
    desc: '누구한테 선물 받았는데 너무 좋았고 어쩌고 저쩌고 행복합니다람쥐람쥐',
    userImg: User_IMG,
    userName: '김예은',
    date: '2023-11-03',
    star: 5,
  },
  {
    id: 2,
    img: PreviewReview_IMG,
    title: '세이브더칠드런 아동 식사지원캠페인',
    desc: '누구한테 선물 받았는데 너무 좋았고 어쩌고 저쩌고 행복합니다람쥐람쥐 누구한테 선물 받았는데 너무 좋았고 어쩌고 저쩌고 행복합니다람쥐람쥐',
    userImg: User_IMG,
    userName: '김예은',
    date: '2023-11-03',
    star: 4,
  },
  {
    id: 3,
    img: PreviewReview_IMG,
    title: '세이브더칠드런 아동 식사지원캠페인',
    desc: '누구한테 선물 받았는데 너무 좋았고 어쩌고 저쩌고 행복합니다람쥐람쥐',
    userImg: User_IMG,
    userName: '김예은',
    date: '2023-11-03',
    star: 4,
  },
];

const ReviewHome = () => {
  const navigate = useNavigate();

  // const [reviewList, setReviewList] = useState([]);

  const handleReviewClick = (id) => {
    navigate(PATH.REVIEW_DETAIL, { state: id });
  };

  const handleMallClick = () => {
    navigate(PATH.MALL_LIST);
  };

  // //리스트 받아오기
  // const getReview = async () => {
  //   const url = 'http://127.0.0.1:8000/review/';
  //   try {
  //     const res = await axios.get(url);
  //     console.log(res.results);
  //     setReviewList(res.results);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   getReview();
  // }, []);

  // // 날짜 yyyy-mm-dd 변환
  // const ChangeDate = (fullDate) => {
  //   const regex = /(\d{4}-\d{2}-\d{2})/;
  //   const match = fullDate.match(regex);
  //   return match;
  // };

  //   {
  //     "pk": 4,
  //     "profile": {
  //         "nickname": "gksekdms",
  //         "image": "http://127.0.0.1:8000/media/default.png"
  //     },
  //     "shoppingmall": "ddddd",
  //     "title": "titi",
  //     "body": "ddd",
  //     "image": "http://127.0.0.1:8000/media/post/Frame_320pseed_JEu0VGe.png",
  //     "published_date": "2023-11-08T11:27:25.170577+09:00",
  //     "star": 1
  // }

  return (
    <>
      <Container>
        <LogoHeader />
        <AdSlider />
        <ListAll onClick={handleMallClick}>
          <P>기부 쇼핑몰 전체 보러 가기</P>
          <Icon name={ICON_NAME.RIGHT_ARROW} iconColor={COLOR.black} width={12} height={12}></Icon>
        </ListAll>
        <Wrapper style={{ height: '170px' }}>
          <Subtitle style={{ borderBottom: 'none' }}>
            리뷰 작성하고 <span>포인트</span> 받자
          </Subtitle>
          <Button text={BUTTON_NAME.REVIEW_WRITE} path={PATH.REVIEW_WRITE} />
        </Wrapper>
        <Wrapper height={'auto'}>
          <Subtitle style={{ marginTop: '35px' }}>리뷰 모아보기</Subtitle>
          <ReviewListBox>
            {reviewList.map((index) => {
              return (
                <ReviewContainer onClick={() => handleReviewClick(index.id)}>
                  <img src={index.img} alt={index.id} />
                  <div className="reviewInfoBox">
                    <ReviewTitle>{index.title}</ReviewTitle>
                    <ReviewDesc>{index.desc}</ReviewDesc>
                    <div className="reviewBottom">
                      <div className="userInfo">
                        <img src={index.userImg} alt={index.pk} className="userimg" />
                        <div>
                          <p className="userName">{index.userName}</p>
                          <p className="uploadDay">{index.date}</p>
                        </div>
                      </div>
                      <Rate size={8} rate={index.star - 1} />
                    </div>
                  </div>
                </ReviewContainer>
              );
            })}
          </ReviewListBox>
        </Wrapper>
      </Container>
      <TabBar currentTab={TAB_NAME.REVIEW} />
    </>
  );
};

export default ReviewHome;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${COLOR.white};
  overflow: auto;
`;

const ListAll = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 35px;
  background-color: ${COLOR.gray100};
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.16);
`;

const P = styled.p`
  ${FONT.footnote}
  margin-right: 16px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.16);
`;

const Subtitle = styled.p`
  ${FONT.title2}
  margin-bottom: 16px;
  padding: 2px;
  border-bottom: 3px solid ${COLOR.green500};

  span {
    color: ${COLOR.green500};
  }
`;

const ReviewListBox = styled.div`
  margin-top: 6px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 92.8%;
  height: 50px;
`;

const ReviewContainer = styled.button`
  width: 174px;
  margin-bottom: 20px;
  background-color: transparent;
  text-align: left;

  img {
    width: 174px;
    height: 120px;
    overflow: hidden;
  }

  .reviewInfoBox {
    display: flex;
    flex-direction: column;
    padding: 0 8px 0 8px;
    height: 84px;
  }

  .reviewBottom {
    display: flex;
    justify-content: space-between;
  }

  .userimg {
    width: 15px;
    height: 15px;
    margin-right: 5px;
  }

  .userInfo {
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: flex-start;
  }

  .userName {
    font-size: 7px;
    color: ${COLOR.gray500};
  }

  .uploadDay {
    font-size: 7px;
    color: ${COLOR.gray500};
  }
`;

const ReviewTitle = styled.p`
  ${FONT.caption1}
  font-weight: bold;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ReviewDesc = styled.p`
  ${FONT.caption2}
  margin-bottom: 7px;
  max-height: 3.5em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 세 줄 이상은 '...'으로 표시 */
  -webkit-box-orient: vertical;
`;
