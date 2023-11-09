import React, { useState } from 'react';
import Rate from '@components/Rate';

const ReviewWrite = () => {
  // 설정된 rate 점수
  const [score, setScore] = useState(0);
  const updateScore = (newScore) => {
    setScore(newScore); // updateScore 함수를 사용하여 score 업데이트
  };

  return (
    <div>
      <Rate size={8} updateScore={updateScore} />
    </div>
  );
};

export default ReviewWrite;
