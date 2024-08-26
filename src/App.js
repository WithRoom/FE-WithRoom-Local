import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SocialKakao from './router/SocialKakao';
import Home from './router/Home';
import Redirection from './router/Redirection'

const App = () => {
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/login" element={<SocialKakao />}></Route> 
					<Route exact path='/kakao/callback' element={<Redirection />} />
  				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;