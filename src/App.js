import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './router/Login';
import MainPage from './router/mainPage';

const App = () => {
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<MainPage />}></Route>
					<Route path="/login" element={<Login />}></Route> 
  		</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;