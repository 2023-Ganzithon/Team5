import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import COLOR from '@styles/color';
import { ImStarFull } from 'react-icons/im';

const Rate = ({ size, rate }) => {
  const [clicked, setClicked] = useState([false, false, false, false, false]);

  const array = [0, 1, 2, 3, 4];

  let score = clicked.filter(Boolean).length;

  useEffect(() => {
    if (rate !== undefined) {
      // rate 값이 변경되었을 때 별점 초기화
      let initialClickStates = Array(5).fill(false);
      for (let i = 0; i <= rate; i++) {
        initialClickStates[i] = true;
      }
      setClicked(initialClickStates);
    }
  }, [rate]);

  const handleStarClick = (index) => {
    if (rate === undefined) {
      // rate 값이 없을 때만 클릭 이벤트 작동
      let clickStates = Array(5).fill(false);
      for (let i = 0; i <= index; i++) {
        clickStates[i] = true;
      }
      setClicked(clickStates);
    }
  };

  return (
    <RatingBox>
      {array.map((el) => (
        <ImStarFull
          key={el}
          onClick={() => handleStarClick(el)}
          className={clicked[el] && 'red'}
          size={size}
          s
        />
      ))}
    </RatingBox>
  );
};

export default Rate;

const RatingBox = styled.div`
  margin: 0 auto;

  & svg {
    color: ${COLOR.gray400};
  }
  .red {
    color: ${COLOR.red};
  }
`;
