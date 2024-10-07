
const SocialKakao = ()=>
	{
		const REST_API_KEY = process.env.REACT_APP_REST_API_KEY //REST API KEY
		const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI //Redirect URI
		
		const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`	
		window.location.href = kakaoURL;
	}


export default SocialKakao;
