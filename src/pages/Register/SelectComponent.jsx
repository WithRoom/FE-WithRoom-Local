import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import data from "../../data/전국행정동리스트.json";

const SelectComponent = ({ onCategoryChange, onCityChange, onDistrictChange, onTownChange }) => {
  const [list, setList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedTown, setSelectedTown] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [filteredTowns, setFilteredTowns] = useState([]);

  useEffect(() => {
    setList(data.LIST);
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filteredList = list.filter(item => item.Column1 === selectedCategory);
      const cities = filteredList
        .map(item => item.Column2)
        .filter((value, index, self) => value && self.indexOf(value) === index);
      const districts = filteredList
        .map(item => item.Column3)
        .filter((value, index, self) => value && self.indexOf(value) === index);
      const towns = filteredList
        .map(item => item.Column4)
        .filter((value, index, self) => value && self.indexOf(value) === index);

      setFilteredCities(cities);
      setFilteredDistricts(districts);
      setFilteredTowns(towns);
    } else {
      setFilteredCities([]);
      setFilteredDistricts([]);
      setFilteredTowns([]);
    }
  }, [selectedCategory, list]);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    onCategoryChange(value);
  };

  const handleCityChange = (e) => {
    const value = e.target.value;
    setSelectedCity(value);
    onCityChange(value);
  };

  const handleDistrictChange = (e) => {
    const value = e.target.value;
    setSelectedDistrict(value);
    onDistrictChange(value);
  };

  const handleTownChange = (e) => {
    const value = e.target.value;
    setSelectedTown(value);
    onTownChange(value);
  };

  return (
    <div>
      <h1 className="my-4">지역 선택</h1>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">대분류</Form.Label>
        <Col sm="10">
          <Form.Select
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">선택하세요</option>
            {[...new Set(list.map(item => item.Column1))].map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Form.Group>

      {filteredCities.length > 0 && (
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">시/군</Form.Label>
          <Col sm="10">
            <Form.Select
              value={selectedCity}
              onChange={handleCityChange}
            >
              <option value="">선택하세요</option>
              {filteredCities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>
      )}

      {filteredDistricts.length > 0 && (
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">구</Form.Label>
          <Col sm="10">
            <Form.Select
              value={selectedDistrict}
              onChange={handleDistrictChange}
            >
              <option value="">선택하세요</option>
              {filteredDistricts.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>
      )}

      {filteredTowns.length > 0 && (
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">동/면/리</Form.Label>
          <Col sm="10">
            <Form.Select
              value={selectedTown}
              onChange={handleTownChange}
            >
              <option value="">선택하세요</option>
              {filteredTowns.map((town, index) => (
                <option key={index} value={town}>
                  {town}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>
      )}
    </div>
  );
};

export default SelectComponent;