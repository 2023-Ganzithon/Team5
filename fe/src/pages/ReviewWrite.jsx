import React, { useState } from 'react';
import Rate from '@components/Rate';
import Dropdown from '@components/Dropdown';

const ReviewWrite = () => {
  // 설정된 rate 점수
  const [score, setScore] = useState(0);
  const updateScore = (newScore) => {
    setScore(newScore);
  };

  // dropdown 선택된 값
  const [select, setSelect] = useState('');
  const handleSelect = (newSelect) => {
    setSelect(newSelect);
  };

  return (
    <div>
      <Dropdown updateSelect={handleSelect} />
      <Rate size={8} updateScore={updateScore} />
    </div>
  );
};

export default ReviewWrite;
