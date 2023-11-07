import React from 'react';
import styled from 'styled-components';
import Icon from '@common/Icon';
import { ICON_NAME } from '@constants/iconName';
import COLOR from '@styles/color';
import FONT from '@styles/fonts';
import { formatToMMdd } from '@utils/index';

const DonationHistoryItem = ({ imgSrc, name, title, point, createdAt }) => {
  return (
    <Item>
      <Img src={imgSrc} alt={`${name}-img`} />
      <InfoLayout>
        <Name>{name}</Name>
        <Title>{title}</Title>
        <PointLayout>
          <Icon name={ICON_NAME.POINT2} iconColor={COLOR.green700} />
          <Point>{point}</Point>
        </PointLayout>
      </InfoLayout>
      <span>{formatToMMdd(createdAt)}</span>
    </Item>
  );
};

export default DonationHistoryItem;

const Item = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 0px;
  border-bottom: 1px solid ${COLOR.gray300};
  color: ${COLOR.gray500};
  ${FONT.body};
`;

const Img = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 12px;
  object-fit: cover;
`;

const InfoLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1 0 0;
`;

const Name = styled.span`
  color: ${COLOR.gray500};
  ${FONT.caption2}
`;

const Title = styled.span`
  color: ${COLOR.black};
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
`;

const PointLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Point = styled.span`
  color: ${COLOR.green700};
  ${FONT.body}
`;
