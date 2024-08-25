import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SocialKakao from './router/SocialKakao';
import Home from './router/Home';

const App = () => {
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/login" element={<SocialKakao />}></Route> 
  		</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;