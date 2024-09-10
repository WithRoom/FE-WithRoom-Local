import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SocialKakao from './pages/Home/SocialKakao';
import Home from './pages/Home/Home';
import Redirection from './pages/Home/Redirection';
import StudyGroupList from './pages/Study/StudyGroupList';
import Register from './pages/Register/Register';
import NotFound from './pages/common/NotFound';
import PrivateRoute from './pages/common/PrivateRoute';
import Me from './pages/Home/Me';

const App = () => {
  return (
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

          <Route path="*" element={<NotFound to="/404" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;