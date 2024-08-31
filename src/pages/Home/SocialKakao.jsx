
const SocialKakao = ()=>
	{
		const REST_API_KEY = process.env.REACT_APP_REST_API_KEY //REST API KEY
		const REDIRECT_URI = 'http://localhost:3000/kakao/callback' //Redirect URI
		// oauth 요청 URL
		const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

		window.location.href = kakaoURL;
	}


export default SocialKakao;
