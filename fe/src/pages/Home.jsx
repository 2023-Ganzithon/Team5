import Button from '@common/Button';
import React from 'react';

import { PATH } from '@constants/path';
import { MALLNAME } from '@constants/mallName';

const Home = () => {
  const handleSubmit = () => {
  }

  return (
      <>
      <div>
        <Button
          text = "리뷰 작성하기"
          path = {PATH.REVIEW_WRITE}
        ></Button>
      </div>

      <div>
        <Button
          text = "홈 화면으로"
          path = {PATH.HOME}
        ></Button>
      </div>

      <div>
        <Button
          text = "쇼핑몰로 이동하기"
          path = {MALLNAME.MARCO}
        ></Button>
      </div>

      <div>
        <Button
          text = "기부처 등록하기"
          path = {PATH.DONATION_REGISTRATION}
        ></Button>
      </div>


      <div>
        <Button
          text = "등록하기"
          path = {PATH.MY_PAGE}
          eventName = {handleSubmit}
        ></Button>
      </div>
      </>
    )
};

export default Home;
