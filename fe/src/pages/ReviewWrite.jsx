import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '@store/AuthContextProvider';

import Rate from '@components/Rate';
import Dropdown from '@components/Dropdown';
import Header from '@common/Header';

import COLOR from '@styles/color';
import FONT from '@styles/fonts';
import Icon from '@common/Icon';
import { PATH } from '@constants/path';
import { ICON_NAME } from '@constants/iconName';

const reviewPH =
  '솔직하고 유용한 상품리뷰를 작성해주세요. 이 상품을 사용한 후\n어떤 점이 좋았나요? 이 상품을 다른 분에게 추천하시겠습니까?\n \n* 타인의 저작권을 침해하거나 근거 없는 악성비방글, 서비스의\n성격에 맞지 않는 글은 삭제 될 수 있으니 양해 부탁드립니다.';

const ReviewWrite = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [previewImg, setPreviewImg] = useState('');

  // 입력 값
  const [inputs, setInputs] = useState({
    mall: '',
    score: 0,
    title: '',
    desc: '',
    img: '',
  });

  // mall 선택된 값
  const [select, setSelect] = useState('');
  const handleSelect = (newSelect) => {
    setSelect(newSelect);
    setInputs({
      ...inputs,
      mall: newSelect,
    });
  };

  // 설정된 rate 점수
  const [score, setScore] = useState(0);
  const updateScore = (newScore) => {
    setScore(newScore);
    setInputs({
      ...inputs,
      score: newScore,
    });
  };

  // title, desc, img 추가
  const { title, desc, img } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // 이미지 추가 url
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (!selectedImage) return;

    const reader = new FileReader();

    reader.onload = () => {
      setPreviewImg(reader.result);
    };

    reader.readAsDataURL(selectedImage);

    setInputs({
      ...inputs,
      img: selectedImage,
    });
  };

  // 작성하기 버튼
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // 입력값 확인
    if (!inputs.mall || !inputs.title || !inputs.score || !inputs.desc) {
      if (!inputs.mall) {
        alert('쇼핑몰을 검색해주세요.');
      } else if (!inputs.title) {
        alert('제목을 입력해주세요.');
      } else if (!inputs.score) {
        alert('평점을 선택해주세요.');
      } else if (!inputs.desc) {
        alert('리뷰 내용을 입력해주세요.');
      }
      return;
    } else {
      const formData = new FormData();

      const title = inputs.title;
      const body = inputs.desc;
      const shoppingmall = inputs.mall;
      const star = inputs.score;
      const image = inputs.img;

      formData.append('title', title);
      formData.append('body', body);
      formData.append('shoppingmall', shoppingmall);
      formData.append('star', star);
      if (image) {
        formData.append('image', image);
      }

      fetch('http://127.0.0.1:8000/review/', {
        method: 'POST',
        cache: 'no-cache',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          // Authorization: `Token ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setData(data);
        });

      if (data) {
        navigate('/gainpoint');
      }
    }
  };

  return (
    <Container>
      <Header title={'상품리뷰 작성'} backUrl={PATH.REVIEW_HOME} />
      <form onSubmit={handleFormSubmit}>
        <div className="dropdownBody">
          <Dropdown updateSelect={handleSelect} name="mall" />
        </div>
        <TitleBox>
          <input name="title" placeholder="제목" onChange={onChange} value={title} />
        </TitleBox>
        <div className="rateBody">
          <Rate size={20} updateScore={updateScore} />
        </div>
        <ReviewBox>
          <textarea name="desc" placeholder={reviewPH} onChange={onChange} value={desc}></textarea>
        </ReviewBox>
        <AddPhotoBox>
          <Label>
            <HiddenFileInput
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            <Icon name={ICON_NAME.CAMERA} iconColor={COLOR.green500} width={20} height={20}></Icon>
            <p>사진 추가하기</p>
          </Label>
        </AddPhotoBox>
        {img && (
          <PreviewBox>
            <Preview src={previewImg} alt={`Preview`} />
            <button onClick={() => setInputs({ ...inputs, img: '' })}>X Remove</button>
          </PreviewBox>
        )}
        <Submit type="submit">작성하기</Submit>
      </form>
    </Container>
  );
};

export default ReviewWrite;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${COLOR.white};
  overflow: auto;

  .dropdownBody {
    padding: 20px 0 20px 0;
  }

  .rateBody {
    padding: 20px;
    border-bottom: 0.5px solid ${COLOR.gray300};
  }
`;

const Submit = styled.button`
  background-color: transparent;
  width: 70px;
  position: absolute;
  top: 14px;
  right: 17px;
  z-index: 15;
  ${FONT.headline}
  color: ${COLOR.green500};
`;

const TitleBox = styled.div`
  padding: 15px 20px 15px 20px;
  border-top: 0.5px solid ${COLOR.gray300};
  border-bottom: 0.5px solid ${COLOR.gray300};

  input {
    ${FONT.body}
    outline: none;
    width: 100%;
    &::placeholder {
      color: ${COLOR.gray300};
    }
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const Label = styled.label`
  display: flex;
  cursor: pointer;
`;

const ReviewBox = styled.div`
  padding: 20px;
  border-bottom: 0.5px solid ${COLOR.gray300};
  textarea {
    ${FONT.footnote}
    outline: none;
    width: 100%;
    height: 335px;
    &::placeholder {
      color: #a7a7a7;
      width: 100%;
    }
  }
`;

const AddPhotoBox = styled.div`
  display: flex;
  padding-left: 20px;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: ${COLOR.gray100};
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.16);

  p {
    ${FONT.subhead}
    color: ${COLOR.green500};
    margin-left: 13px;
    margin-bottom: 2px;
    display: flex;
  }
`;

const PreviewBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  button {
    width: 200px;
    background-color: transparent;
  }
`;

const Preview = styled.img`
  width: 200px;
  height: 200px;
  overflow: hidden;
  object-fit: cover;
  border-radius: 7px;
  margin-top: 30px;
  margin-bottom: 10px;
`;
