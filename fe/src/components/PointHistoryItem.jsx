import React from 'react';
import styled from 'styled-components';
import Icon from '@common/Icon';
import { ICON_NAME } from '@constants/iconName';
import COLOR from '@styles/color';
import FONT from '@styles/fonts';
import { formatTommdd } from '@utils/index';

const PointHistoryItem = ({ park, mall, point, createdAt }) => {
  let type = '';
  let text = '';
  if (park) {
    type = 'map';
    text = park;
  }
  if (mall) {
    type = 'review';
    text = mall;
  }

  if (!type || !text) return null;

  return (
    <Item>
      <IconBackGround type={type}>
        {type === 'map' && <Icon name={ICON_NAME.MAP} iconColor={COLOR.white} />}
        {type === 'review' && <Icon name={ICON_NAME.REVIEW} iconColor={COLOR.white} />}
      </IconBackGround>
      <InfoLayout>
        <Point>{point}p</Point>
        <span>{text}</span>
      </InfoLayout>
      <span>{formatTommdd(createdAt)}</span>
    </Item>
  );
};

export default PointHistoryItem;

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

const IconBackGround = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: ${({ type }) => (type === 'map' ? COLOR.green400 : COLOR.green600)};
`;

const Point = styled.span`
  color: ${COLOR.green700};
  ${FONT.title3}
`;

const InfoLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1 0 0;
`;
