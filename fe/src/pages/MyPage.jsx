import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import COLOR from '@styles/color';
import FONT from '@styles/fonts';
import { ICON_NAME } from '@constants/iconName';
import { TAB_NAME } from '@constants/tabName';
import Icon from '@common/Icon';
import Button from '@common/Button';
import TabBar from '@common/TabBar';
import DonationHistoryItem from '@components/DonationHistoryItem';
import PointHistoryItem from '@components/PointHistoryItem';
import { PATH } from '@constants/path';
import { AuthContext } from '@store/AuthContextProvider';

const MyPage = () => {
  const { user, logout, setUser } = useContext(AuthContext);
  const [isEdited, setIsEdited] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const [currentPoint, setCurrentPoint] = useState(null);
  const [pointHistory, setPointHistory] = useState([]);
  const [donationHistory, setDonationHistory] = useState([]);
  const imgInputRef = useRef(null);
  const nicknameInputRef = useRef(null);

  const [inputs, setInputs] = useState({
    nickname: '',
    image: '',
  });

  const navigate = useNavigate();

  const onChnage = (e) => {
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

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    const { image, nickname } = inputs;

    if (!image && !nickname) return;

    const formData = new FormData();

    if (nickname && !image) {
      formData.append('nickname', nickname);
      fetch(`http://127.0.0.1:8000/users/profile/${user.userId}/`, {
        method: 'PUT',
        cache: 'no-cache',
        body: formData,
        headers: {
          Authorization: `Token ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser((prev) => ({ ...prev, userInfo: { ...prev.userInfo, nickname: data.nickname } }));
          setImgSrc(null);
          setIsEdited(false);
          setInputs({ nickname: '', image: '' });
        });
    } else if (!nickname && image) {
      formData.append('nickname', user.userInfo.nickname);
      formData.append('image', image);

      formData.get('nickname');
      formData.get('image');

      fetch(`http://127.0.0.1:8000/users/profile/${user.userId}/`, {
        method: 'PUT',
        cache: 'no-cache',
        body: formData,
        headers: {
          Authorization: `Token ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser((prev) => ({ ...prev, userInfo: { ...prev.userInfo, image: data.image } }));
          setImgSrc(null);
          setIsEdited(false);
          setInputs({ nickname: '', image: '' });
        });
    } else {
      formData.append('nickname', nickname);
      formData.append('image', image);
      fetch(`http://127.0.0.1:8000/users/profile/${user.userId}/`, {
        method: 'PUT',
        cache: 'no-cache',
        body: formData,
        headers: {
          Authorization: `Token ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser((prev) => ({ ...prev, userInfo: { image: data.image, nickname: data.nickname } }));
          setImgSrc(null);
          setIsEdited(false);
          setInputs({ nickname: '', image: '' });
        });
    }
  };

  useEffect(() => {
    const pointHistoryPromise = fetch('http://127.0.0.1:8000/myPage/mypoint/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const { profile, park_points: parkPointHistory, mall_points: mallPointHistory } = data;
        const history = [...parkPointHistory, ...mallPointHistory];

        return { profile, history: history.slice(0, 3) };
      });

    const donationHistoryPromise = fetch('http://127.0.0.1:8000/myPage/mydonation/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const { donation_points: history } = data;
        return { history: history.slice(0, 3) };
      });

    Promise.all([pointHistoryPromise, donationHistoryPromise])
      .then(([pointHistory, donationData]) => {
        const { profile: profileData, history: pointHistoryData } = pointHistory;
        const { history: donationHistoryData } = donationData;

        setCurrentPoint(profileData.points);
        setPointHistory(pointHistoryData);
        setDonationHistory(donationHistoryData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      <Layout>
        <Main>
          <Header>
            <span>마이페이지</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <SettingButton type="button" onClick={() => setIsEdited((prev) => !prev)}>
                <Icon name={ICON_NAME.SETTING} iconColor={COLOR.gray500} />
              </SettingButton>
              <LogoutButton
                type="button"
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
              >
                로그아웃
              </LogoutButton>
            </div>
          </Header>
          {isEdited ? (
            <form onSubmit={handleProfileSubmit} encType="multipart/form-data">
              <UserInfoLayout>
                <ImgLabel htmlFor="img-uploader">
                  {!imgSrc && <Icon name={ICON_NAME.CAMERA} iconColor={COLOR.white} width={96} height={96} />}
                  {imgSrc && <ImgPreview src={imgSrc} alt="preview" />}
                </ImgLabel>
                <ImgInput
                  ref={imgInputRef}
                  type="file"
                  id="img-uploader"
                  accept="image/*"
                  onChange={handleImgUpload}
                />

                <Input
                  ref={nicknameInputRef}
                  placeholder="nickname"
                  name="nickname"
                  value={inputs.nickname}
                  onChange={onChnage}
                />
              </UserInfoLayout>
              <ButtonLayout>
                <Button text="프로필 수정하기" eventName={handleProfileSubmit} />
              </ButtonLayout>
            </form>
          ) : (
            <>
              <UserInfoLayout>
                {user.userInfo.image && user.userInfo.image !== 'http://127.0.0.1:8000/media/default.png' ? (
                  <UserImg src={user.userInfo.image} alt="user-image" />
                ) : (
                  <Icon name={ICON_NAME.PERSON} iconColor={COLOR.green100} width={128} height={128} />
                )}
                <UserInfo>
                  <UserName>{user.userInfo.nickname}</UserName>
                </UserInfo>
              </UserInfoLayout>
              <ButtonLayout>
                <Button text="기부처 등록하기" eventName={() => navigate(PATH.DONATION_REGISTRATION)} />
              </ButtonLayout>
            </>
          )}

          <MyPointLayout>
            <Title>내 포인트</Title>
            <MyPointInfo>
              <Icon name={ICON_NAME.POINT2} iconColor={COLOR.green800} width={36} height={36} />
              <span>{currentPoint ?? 0}p</span>
            </MyPointInfo>
          </MyPointLayout>
          <ListLayout>
            <ListTitle>
              <Title>포인트 적립 내역</Title>
              <IconButton type="button" onClick={() => navigate(PATH.POINT_HISTORY)}>
                <Icon name={ICON_NAME.RIGHT_ARROW} iconColor={COLOR.green800} width={32} height={32} />
              </IconButton>
            </ListTitle>
            {pointHistory.map(({ park, mall, pointActivityDate, earnedPoint }) => {
              return (
                <PointHistoryItem
                  key={pointActivityDate}
                  park={park}
                  mall={mall}
                  point={earnedPoint}
                  createdAt={new Date(pointActivityDate)}
                />
              );
            })}
          </ListLayout>
          <ListLayout>
            <ListTitle>
              <Title>기부 내역</Title>
              <IconButton type="button" onClick={() => navigate(PATH.DONATION_HISTORY)}>
                <Icon name={ICON_NAME.RIGHT_ARROW} iconColor={COLOR.green800} width={32} height={32} />
              </IconButton>
            </ListTitle>
            {donationHistory.map(({ id, date, price, name, image, title }) => {
              return (
                <DonationHistoryItem
                  key={id}
                  name={name}
                  title={title}
                  point={price}
                  imgSrc={image}
                  createdAt={new Date(date)}
                />
              );
            })}
          </ListLayout>
        </Main>
      </Layout>
      <TabBar currentTab={TAB_NAME.MY_PAGE} />
    </>
  );
};

export default MyPage;

const Layout = styled.div`
  min-height: calc(100vh - 84px);
  background: ${COLOR.white};
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 10px;
  padding-left: 16px;
  padding-right: 16px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${COLOR.black};
  ${FONT.title1}
`;

const LogoutButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 12px 20px;
  background: ${COLOR.green500};
  color: ${COLOR.white};
  ${FONT.headline}
`;

const UserInfoLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserImg = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
`;

const ImgLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 120px;
  height: 120px;
  background-color: ${COLOR.green200};
  border-radius: 50%;
`;

const ImgPreview = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
`;

const ImgInput = styled.input`
  display: none;
`;

const Input = styled.input`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 40px;
  padding: 8px 16px;
  border: 1px solid ${COLOR.gray400};
  border-radius: 7px;
  background-color: ${COLOR.white};
  color: ${COLOR.gray500};

  &:active {
    border: 1px solid ${COLOR.black};
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const UserName = styled.span`
  color: ${COLOR.black};
  ${FONT.title2}
`;

const SettingButton = styled.button`
  background-color: transparent;
`;

const ButtonLayout = styled.div`
  display: flex;
  justify-content: center;
  padding: 12px 0px;
`;

const Title = styled.span`
  color: ${COLOR.green800};
  ${FONT.title3}
`;

const IconButton = styled.button`
  background: transparent;
`;

const MyPointLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
`;

const MyPointInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px 12px;
  border-radius: 16px;
  background-color: ${COLOR.green50};
  color: ${COLOR.green800};
  ${FONT.title3};
`;

const ListLayout = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 12px 0px;
`;

const ListTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
