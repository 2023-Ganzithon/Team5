import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import Icon from '@common/Icon';
import Header from '@common/Header';
import TabBar from '@common/TabBar';
import Button from '@common/Button';
import { ICON_NAME } from '@constants/iconName';
import { TAB_NAME } from '@constants/tabName';
import { PATH } from '@constants/path';
import COLOR from '@styles/color';
import FONT from '@styles/fonts';
import { AuthContext } from '@store/AuthContextProvider';

const DonationRegistration = () => {
  const [imgSrc, setImgSrc] = useState(null);
  const imgInputRef = useRef(null);
  const uploadButtonRef = useRef(null);

  const { user } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    image: '',
    name: '',
    title: '',
    comment: '',
    goal: '',
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleImgUpload = ({ target }) => {
    const selectedImage = target.files[0];

    if (!selectedImage) return;

    const reader = new FileReader();

    reader.onload = () => {
      setImgSrc(reader.result);
    };

    reader.readAsDataURL(selectedImage);

    setInputs({ ...inputs, image: selectedImage });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const { title, comment, name, goal, image } = inputs;

    if (!image || !title || !comment || !name || !goal) {
      return;
    }
    const formData = new FormData();

    formData.append('image', image);
    formData.append('name', name);
    formData.append('title', title);
    formData.append('comment', comment);
    formData.append('goal', goal);

    fetch('http://127.0.0.1:8000/myPage/donationRegister/', {
      method: 'POST',
      cache: 'no-cache',
      body: formData,
      headers: {
        Authorization: `Token ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <>
      <Layout>
        <Header title={'기부처 등록하기'} backUrl={PATH.MY_PAGE} />
        <Form onSubmit={handleFormSubmit} encType="multipart/form-data">
          <ImgLayout>
            <ImgLabel htmlFor="img-uploader">
              {!imgSrc && <Icon name={ICON_NAME.CAMERA} iconColor={COLOR.white} width={96} height={96} />}
              {imgSrc && <ImgPreview src={imgSrc} alt="preview" />}
            </ImgLabel>
            <ImgInput type="file" id="img-uploader" accept="image/*" onChange={handleImgUpload} />
            <ImgButton
              type="button"
              ref={uploadButtonRef}
              onClick={() => {
                imgInputRef?.current?.click();
              }}
            >
              이미지 업로드
            </ImgButton>
            <ImgButton type="button" onClick={() => setImgSrc(null)}>
              이미지 제거
            </ImgButton>
          </ImgLayout>
          <InputLayout>
            <Label htmlFor="name">개인 or 단체 이름 *</Label>
            <Input type="text" id="name" name="name" onChange={onChange} value={inputs.name} />
          </InputLayout>
          <InputLayout>
            <Label htmlFor="title">제목 *</Label>
            <Input type="text" id="title" name="title" onChange={onChange} value={inputs.title} />
          </InputLayout>
          <InputLayout>
            <Label htmlFor="comment">한 줄 소개 *</Label>
            <Input type="text" id="comment" name="comment" onChange={onChange} value={inputs.comment} />
          </InputLayout>
          <InputLayout>
            <Label htmlFor="goal">목표 금액 *</Label>
            <Input
              type="number"
              id="goal"
              name="goal"
              min={0}
              step={10}
              onChange={onChange}
              value={inputs.goal}
            />
          </InputLayout>
          <Button text="등록하기" />
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
  gap: 8px;
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

const ImgButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  width: 100%;
  padding: 10px 0px;
  background: ${COLOR.green500};
  color: ${COLOR.white};
  ${FONT.body}
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  &:focus {
    outline: 2px solid ${COLOR.green700};
  }
`;
