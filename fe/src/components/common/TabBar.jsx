import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Icon from './Icon';
import COLOR from '@styles/color';
import FONT from '@styles/fonts';
import { ICON_NAME } from '@constants/iconName';
import { TAB_NAME } from '@constants/tabName';
import { PATH } from '@constants/path';

const TAB_LIST = {
  [TAB_NAME.HOME]: { iconName: ICON_NAME.HOME, text: '홈', path: PATH.HOME },
  [TAB_NAME.MAP]: { iconName: ICON_NAME.MAP, text: '지도', path: PATH.MAP },
  [TAB_NAME.REVIEW]: { iconName: ICON_NAME.REVIEW, text: '리뷰', path: PATH.REVIEW_HOME },
  [TAB_NAME.MY_PAGE]: { iconName: ICON_NAME.PERSON, text: '마이페이지', path: PATH.MY_PAGE },
};

const TabBar = ({ currentTab }) => {
  const navigate = useNavigate();

  const tabNameList = Object.values(TAB_NAME);

  return (
    <TabBarLayout>
      {tabNameList.map((tab) => {
        const { path, iconName, text } = TAB_LIST[tab];

        return (
          <Tab
            onClick={() => {
              navigate(path);
            }}
          >
            <Icon name={iconName} iconColor={tab === currentTab ? COLOR.black : COLOR.gray400} />
            <TabText tab={tab} currenttab={currentTab}>
              {text}
            </TabText>
          </Tab>
        );
      })}
    </TabBarLayout>
  );
};

export default TabBar;

TabBar.propTypes = {
  currentTab: PropTypes.oneOf(['home', 'map', 'review', 'myPage']).isRequired,
};

const TabBarLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 84px;
  padding: 0 40px;
  background-color: ${COLOR.gray50};
  border-top: 1px solid ${COLOR.gray300};
`;

const Tab = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const TabText = styled.span`
  ${FONT.subhead}
  color: ${({ tab, currenttab }) => (tab === currenttab ? COLOR.black : COLOR.gray400)};
`;
