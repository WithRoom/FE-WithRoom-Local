import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SocialKakao from './pages/Home/SocialKakao';
import Home from './pages/Home/Home';
import Redirection from './pages/Home/Redirection';
import StudyGroupCard from './pages/Study/StudyGroupList';
import Register from './pages/Register/Register';

const App = () => {
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Navigate to="/home" />} />
					<Route path="/home" element={<Home />}></Route>
					<Route path="/login" element={<SocialKakao />}></Route> 
					<Route path="/study" element={<StudyGroupCard />}></Route>
					<Route exact path='/kakao/callback' element={<Redirection />} />
					<Route path="/register" element={<Register />}></Route>
  				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;