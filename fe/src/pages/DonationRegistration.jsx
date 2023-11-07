import React, { useState } from 'react';
import styled from 'styled-components';
import Icon from '@common/Icon';
import Header from '@common/Header';
import TabBar from '@common/TabBar';
import Button from '@common/Button';
import { ICON_NAME } from '@constants/iconName';
import { TAB_NAME } from '@constants/tabName';
import COLOR from '@styles/color';
import FONT from '@styles/fonts';

const DonationRegistration = () => {
  const [imgSrc, setImgSrc] = useState(null);

  return (
    <>
      <Layout>
        <Header title={'기부처 등록하기'} backUrl={-1} />
        <Form>
          <ImgLayout>
            <ImgLabel htmlFor="img-uploader">
              {!imgSrc && <Icon name={ICON_NAME.CAMERA} iconColor={COLOR.white} width={96} height={96} />}
              {imgSrc && <ImgPreview src={imgSrc} alt="preview" />}
            </ImgLabel>
            <ImgInput type="file" id="img-uploader" accept="image/*" />
          </ImgLayout>
          <InputLayout>
            <Label htmlFor="name">개인 / 자선단체 *</Label>
            <Input type="text" id="name" />
          </InputLayout>
          <InputLayout>
            <Label htmlFor="title">제목 *</Label>
            <Input type="text" id="title" />
          </InputLayout>
          <InputLayout>
            <Label htmlFor="description">한 줄 소개 *</Label>
            <Input type="text" id="description" />
          </InputLayout>
          <InputLayout>
            <Label htmlFor="money">목표 금액 *</Label>
            <Input type="number" id="money" min={0} step={10} />
          </InputLayout>
          <Button text="등록 하기" />
        </Form>
      </Layout>
      <TabBar currentTab={TAB_NAME.MY_PAGE} />
    </>
  );
};

export default DonationRegistration;

const Layout = styled.div`
  min-height: calc(100vh - 84px);
  background: ${COLOR.white};
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  padding: 30px 0px;
`;

const ImgLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const ImgPreview = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 16px;
  object-fit: cover;
`;

const ImgLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 160px;
  height: 160px;
  background-color: ${COLOR.green200};
  border-radius: 16px;
`;

const ImgInput = styled.input`
  display: none;
`;

const InputLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 354px;
  gap: 8px;
`;

const Label = styled.label`
  color: ${COLOR.black};
  ${FONT.body}
`;

const Input = styled.input`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 60px;
  padding: 8px 16px;
  border: 1px solid ${COLOR.gray400};
  border-radius: 7px;
  background-color: ${COLOR.white};
  color: ${COLOR.gray500};

  &:active {
    border: 1px solid ${COLOR.black};
  }
`;
