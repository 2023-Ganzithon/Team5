import React from 'react';
import { useLocation } from 'react-router-dom';

const ReviewDetail = () => {
  const { state } = useLocation();
  console.log(state);

  return <div>ReviewDetail</div>;
};

export default ReviewDetail;
