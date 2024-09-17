import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; 
import data from "../../data/관심사리스트.json"; 

const SelectInterestComponent = () => {
  const [list, setList] = useState([]);
  const [selectedInterest, setSelectedInterest] = useState("");
  const navigate = useNavigate(); 

  useEffect(() => {
    setList(data.IT_Interests);
  }, []);

  useEffect(() => {
    if (selectedInterest) {
      navigate("/register", { state: { interest: selectedInterest } });
    }
  }, [selectedInterest, navigate]);

  return (
    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm="2">관심사</Form.Label>
      <Col sm="10">
        <Form.Select
          value={selectedInterest}
          onChange={(e) => setSelectedInterest(e.target.value)}
        >
          <option value="">선택하세요</option>
          {list.map((interest, index) => (
            <option key={index} value={interest}>
              {interest}
            </option>
          ))}
        </Form.Select>
      </Col>
    </Form.Group>
  );
};

export default SelectInterestComponent;