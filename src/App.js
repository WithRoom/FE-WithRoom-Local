import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SocialKakao from './pages/SocialKakao';
import Home from './pages/Home';
import Redirection from './pages/Redirection'
import Study from './pages/Redirection'

const App = () => {
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/login" element={<SocialKakao />}></Route> 
					<Route path="/study" element={<Study />}></Route>
					<Route exact path='/kakao/callback' element={<Redirection />} />
  				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;