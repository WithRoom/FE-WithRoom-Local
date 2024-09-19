import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StudyProvider } from './pages/Study/StudyContext';
import SocialKakao from './pages/Home/SocialKakao';
import Home from './pages/Home/Home';
import Redirection from './pages/Home/Redirection';
import StudyGroupList from './pages/Study/StudyGroupList';
import Register from './pages/Register/Register';
import NotFound from './pages/common/NotFound';
import PrivateRoute from './pages/common/PrivateRoute';
import Me from './pages/Home/Me';
import StudyDetail from './pages/Study/StudyDetail';
import StudyList from './pages/Study/StudyList';

const App = () => {
  useEffect(() => {
    if(localStorage.getItem('accessToken')) {
      localStorage.clear();
    }

    const clearLocalStorageOnClose = (event) => {
      // 새로고침인지 확인 (sessionStorage에 값을 넣고 확인)
      sessionStorage.setItem('isReload', 'true');
    };

    const onBeforeUnload = (event) => {
      const isReload = sessionStorage.getItem('isReload');
      if (!isReload) {
        // 새로고침이 아닌 경우 (즉, 브라우저를 완전히 닫는 경우) localStorage를 초기화
        localStorage.clear();
      }
    };

    // 새로고침을 감지하기 위해 sessionStorage를 사용
    window.addEventListener('beforeunload', onBeforeUnload);
    window.addEventListener('unload', clearLocalStorageOnClose);

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
      window.removeEventListener('unload', clearLocalStorageOnClose);
    };
  }, []);

  return (
    <StudyProvider>
      <div className='App' style={{ backgroundColor: 'white' }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<SocialKakao />} />
            <Route path="/study" element={<PrivateRoute element={StudyGroupList} />} />
            <Route exact path='/kakao/callback' element={<Redirection />} />
            <Route path="/register" element={<Register />} />
            <Route path="/me" element={<PrivateRoute element={Me}/>} />
            <Route path="/study/info/detail" element={<StudyDetail />} />
            <Route path="*" element={<NotFound to="/404" />} />
            <Route path="/study/list" element={<StudyList />} />
          </Routes>
        </BrowserRouter>
      </div>
    </StudyProvider>
  );
};

export default App;
