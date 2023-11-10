import { Route, Routes } from 'react-router-dom';
import { PATH } from '@constants/path';
import Home from '@pages/Home';
import Donation from '@pages/Donation';
import ReviewHome from '@pages/ReviewHome';
import ReviewWrite from '@pages/ReviewWrite';
import GainPoint from '@pages/GainPoint';
import ReviewDetail from '@pages/ReviewDetail';
import MallList from '@pages/MallList';
import MyPage from '@pages/MyPage';
import PointHistory from '@pages/PointHistory';
import DonationHistory from '@pages/DonationHistory';
import DonationRegistration from '@pages/DonationRegistration';
import PseedMap from '@pages/PseedMap';
import Login from '@pages/Login';
import SignUp from '@pages/SignUp';
import GlobalStyle from '@styles/GlobalStyle';
import AuthContextProvider from '@store/AuthContextProvider';

function App() {
  return (
    <>
    <AuthContextProvider.Provider>
      <GlobalStyle />
        <Routes>
          <Route index path={PATH.HOME} element={<Home />} />
          <Route path={PATH.DONATION} element={<Donation />} />
          <Route path={PATH.REVIEW_HOME} element={<ReviewHome />} />
          <Route path={PATH.REVIEW_WRITE} element={<ReviewWrite />} />
          <Route path={PATH.GAIN_POINT} element={<GainPoint />} />
          <Route path={PATH.REVIEW_DETAIL} element={<ReviewDetail />} />
          <Route path={PATH.MALL_LIST} element={<MallList />} />
          <Route path={PATH.MY_PAGE} element={<MyPage />} />
          <Route path={PATH.POINT_HISTORY} element={<PointHistory />} />
          <Route path={PATH.DONATION_HISTORY} element={<DonationHistory />} />
          <Route path={PATH.DONATION_REGISTRATION} element={<DonationRegistration />} />
          <Route path={PATH.MAP} element={<PseedMap />} />
          <Route path={PATH.LOGIN} element={<Login />} />
          <Route path={PATH.SIGNUP} element={<SignUp />} />
        </Routes>
    </AuthContextProvider.Provider>
    </>
    
  );
}

export default App;
