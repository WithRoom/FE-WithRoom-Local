import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import SelectComponent from './SelectComponent';
import SelectInterestComponent from './SelectInterestComponent';

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { combinedString } = location.state || "";
  const { selectedInterest } = location.state || "";

  const [registerForm, setRegisterForm] = useState({
    nickName: '',
    preferredArea: combinedString || '',
    interest: selectedInterest || ''
  });

  const [areaSelections, setAreaSelections] = useState({
    category: '',
    city: '',
    district: '',
    town: ''
  });

  const [concatenatedString, setConcatenatedString] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (combinedString) {
      setRegisterForm(prevForm => ({
        ...prevForm,
        preferredArea: combinedString
      }));
    }
  }, [combinedString]);

  useEffect(() => {
    setConcatenatedString(`입력한 선호 지역: ${registerForm.preferredArea}`);
  }, [registerForm.preferredArea]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handlePreferredAreaChange = (type, value) => {
    setAreaSelections(prev => {
      const newSelections = { ...prev, [type]: value };
      const concatenatedValue = `${newSelections.category} ${newSelections.city} ${newSelections.district} ${newSelections.town}`.trim();

      console.log('concatenatedValue:', concatenatedValue); // Debugging

      setRegisterForm(prevForm => ({
        ...prevForm,
        preferredArea: concatenatedValue
      }));
      return newSelections;
    });
  };

  const handleInterestChange = (value) => {
    console.log('value:', value); // Debugging
    setRegisterForm(prevForm => ({
    
      ...prevForm,
      interest: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setError('로그인이 필요합니다.');
      setLoading(false);
      return;
    }

    try {
      await saveUser('/member/create/info', registerForm, token);
      setSuccess(true);
      setTimeout(() => navigate('/home'), 2000);
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 404:
            setError('경로를 찾을 수 없습니다. URL을 확인해주세요.');
            break;
          case 401:
            setError('인증에 실패했습니다. 다시 로그인해주세요.');
            break;
          default:
            setError('회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.');
        }
      } else {
        setError('네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <Container className="max-w-md">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-6 text-center">추가 정보 입력</h2>
          <p className="mb-4 text-gray-600 text-center">회원가입을 완료하기 위해 추가 정보를 입력해주세요.</p>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4" controlId="formNickName">
              <Form.Label className="block text-gray-700 text-sm font-bold mb-2">닉네임</Form.Label>
              <Form.Control
                type="text"
                name="nickName"
                value={registerForm.nickName}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formPreferredArea">
              <Form.Label className="block text-gray-700 text-sm font-bold mb-2">선호 지역</Form.Label>
              <SelectComponent 
                onCategoryChange={(value) => handlePreferredAreaChange('category', value)} 
                onCityChange={(value) => handlePreferredAreaChange('city', value)} 
                onDistrictChange={(value) => handlePreferredAreaChange('district', value)} 
                onTownChange={(value) => handlePreferredAreaChange('town', value)} 
              />
              <p className="text-sm text-gray-500 mt-1">{concatenatedString}</p>
            </Form.Group>

            <Form.Group className="mb-6" controlId="formInterest">
                <Form.Label className="block text-gray-700 text-sm font-bold mb-2">관심사</Form.Label>
                <SelectInterestComponent onChange={handleInterestChange} />  {/* 관심사 선택 컴포넌트 */}
            </Form.Group>


            <Button 
              variant="primary" 
              type="submit" 
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? "처리 중..." : "등록하기"}
            </Button>
          </Form>
        </div>

        {error && (
          <Alert variant="danger" className="mt-4">
            <Alert.Heading>오류</Alert.Heading>
            <p>{error}</p>
          </Alert>
        )}

        {success && (
          <Alert variant="success" className="mt-4">
            <Alert.Heading>성공</Alert.Heading>
            <p>회원가입이 완료되었습니다. 홈으로 이동합니다.</p>
          </Alert>
        )}
      </Container>
    </div>
  );
};

const saveUser = async (url, json, token) => {
  console.log(json)

  const response = await axios.post(url, json, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};

export default Register;