// 카카오 로그인 후 회원 가입 폼
// SurveyJS 라이브러리를 사용하여 회원 가입 폼을 구성

import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Survey } from 'survey-react-ui';
import { Model } from 'survey-core';
import { useCallback } from 'react';

import 'survey-core/defaultV2.min.css';

const surveyJson = {
    elements: [{
      name: "Area",
      title: "선호하는 지역을 입력하세요.",
      type: "text"
    }, {
      name: "Interests",
      title: "나의 관심 분야를 입력하세요.",
      type: "text"
    }]
  };

const Register = () => {
    const survey = new Model(surveyJson);

    const accessToken = localStorage.getItem('accessToken');

    const alertResults = useCallback((sender) => {
        const results = JSON.stringify(sender.data);
        console.log(results);
        alert(results);
        
        saveSurveyResults(
            "https://studywithme.store/member/craete/info",
            results,
            accessToken
          )

      }, []);

      survey.onComplete.add(alertResults);

    return <Survey model={survey} />;
}

function saveSurveyResults(url, json, token) {
    fetch(url, {
      method: 'POST',
      mode: 'no-cors', // CORS 우회 설정
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(json)
    })
    .then(response => {
      if (response.ok) {
        console.log(response)
        alert('로그인 성공');
        window.location.href = '/home';
      } else {
       alert('Failed to save survey results');
      }
    })
    .catch(error => {
     
    });
  }

export default Register;

