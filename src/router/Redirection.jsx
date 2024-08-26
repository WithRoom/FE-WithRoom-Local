import React, {navigate} from "react";

const Redirection = () => {
    const code = window.location.search;
    const navigate = useNavigate();
  
    useEffect(() => {
      console.log(process.env.REACT_APP_URL);
      axios.post(`${process.env.REACT_APP_URL}kakaoLogin${code}`).then((result) => {
        console.log(result.data);
  
        localStorage.setItem('name', result.data.user_name); // 세션 or 토큰 처리 필요
        localStorage.setItem('email',result.data.user_email)

        navigate('/loginSuccess');
      });
    }, []);
  
    return <div>로그인 중입니다.</div>;
  };
  
  export default Redirection;