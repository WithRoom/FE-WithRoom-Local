import React from 'react';

const SocialKakao = ()=>
	{
		const REST_API_KEY = 'c2ff0764f34c52b6ad196dfd990847f1' //REST API KEY
		const REDIRECT_URI = 'http://localhost:3000/auth' //Redirect URI
		// oauth 요청 URL
		const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
		const handleLogin = ()=>{
			window.location.href = kakaoURL
		}
		return(
		<>
		<button onClick={handleLogin}>카카오 로그인</button>
		</>
		)
	}


export default SocialKakao;
