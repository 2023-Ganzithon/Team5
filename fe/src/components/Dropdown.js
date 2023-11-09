import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Icon from '@common/Icon';

import COLOR from '@styles/color';
import { ImStarFull } from 'react-icons/im';
import { MALLNAME } from '@constants/mallName';
import { ICON_NAME } from '@constants/iconName';
import FONT from '@styles/fonts';

const dropdownItems = [
  { id: 1, name: '마르코로하' },
  { id: 2, name: '마르코로히' },
  { id: 3, name: '마르코로후' },
  { id: 4, name: '마르코로헤' },
  { id: 5, name: '마르코로호' },
];

const Dropdown = ({ updateSelect }) => {
  const [isActive, setIsActive] = useState(false);
  const [item, setItem] = useState(null);

  const onActiveToggle = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  const onSelectItem = useCallback((e) => {
    const targetId = e.target.id;
    let selectedItem = null;

    if (targetId === 'item_name') {
      selectedItem = e.target.parentElement.innerText;
    } else if (targetId === 'item') {
      selectedItem = e.target.innerText;
    }

    setIsActive((prev) => !prev);
    setItem(selectedItem);
    updateSelect(selectedItem); // 부모 컴포넌트에 값 전달
  }, []);

  return (
    <DropdownContainer>
      <DropdownBody onClick={onActiveToggle}>
        {item ? (
          <>
            <ItemName>{item}</ItemName>
            <Icon name={ICON_NAME.DROP_DOWN_ARROW} />
          </>
        ) : (
          <>
            <DropdownSelect>쇼핑몰 선택</DropdownSelect>
            <Icon name={ICON_NAME.DROP_DOWN_ARROW} />
          </>
        )}
      </DropdownBody>
      <DropdownMenu isActive={isActive}>
        {dropdownItems.map((item) => (
          <DropdownItemContainer id="item" key={item.id} onClick={onSelectItem}>
            <ItemName id="item_name">{item.name}</ItemName>
          </DropdownItemContainer>
        ))}
      </DropdownMenu>
    </DropdownContainer>
  );
};

export default Dropdown;

const DropdownContainer = styled.div`
  padding: 0 18px 0 18px;
  width: 100%;
`;

const DropdownBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px 14px;
  height: 60px;
  border: 1px solid ${COLOR.gray300};
  border-radius: 7px;
  margin-bottom: 3px;
`;

const DropdownSelect = styled.p`
  ${FONT.body}
  color: #6B7280;
`;

const DropdownMenu = styled.ul`
  display: ${(props) => (props.isActive ? `block` : `none`)};
  width: 354px;
  background-color: white;
  position: absolute;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.25);
  border-radius: 7px;
`;

const DropdownItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 17px;
  border-top: none;

  &:active {
    background-color: ${COLOR.green50};
  }

  &:first-child {
    margin-top: 13px;
  }

  &:last-child {
    margin-bottom: 13px;
  }
`;

const ItemName = styled.p`
  ${FONT.body}
`;
