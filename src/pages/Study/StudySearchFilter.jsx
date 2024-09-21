import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { ChevronDown, ChevronUp } from 'lucide-react';
import axios from 'axios';

const FilterContainer = styled(Container)`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: max-height 0.3s ease-out;
  overflow: hidden;
  max-height: ${props => props.isCollapsed ? '60px' : '1000px'};
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.isCollapsed ? '0' : '20px'};
`;

const FilterTitle = styled.h5`
  color: #007bff;
  font-weight: bold;
  margin-bottom: 0;
`;

const ToggleButton = styled(Button)`
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
`;

const FilterSection = styled.div`
  margin-bottom: 20px;
`;

const FilterLabel = styled.h6`
  color: #495057;
  font-weight: 600;
  margin-bottom: 10px;
`;

const ResetButton = styled(Button)`
  margin-top: 20px;
  width: 100%;
`;

const SearchButton = styled(Button)`
  margin-top: 20px;
  width: 100%;
`;

const FilterOption = ({ label, options, selected, onChange }) => (
  <FilterSection>
    <FilterLabel>{label}</FilterLabel>
    <div>
      {options.map((option) => (
        <Button
          key={option}
          variant={selected === option ? "primary" : "outline-primary"}
          onClick={() => onChange(option)}
          className="me-2 mb-2"
        >
          {option}
        </Button>
      ))}
    </div>
  </FilterSection>
);

const StudySearchFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    category: '',
    difficulty: '',
    day: '',
    type: '',
    status: '',
    startDate: null,  // 검색 시작일
    endDate: null     // 검색 종료일
  });
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchResults, setSearchResults] = useState([]); // State for search results

  const handleFilterChange = (category, value) => {
    const newFilters = { ...filters, [category]: value };
    setFilters(newFilters);
    onFilterChange(newFilters); // 부모 컴포넌트에 필터 변경 알림
  };

  const handleDateChange = (startDate, endDate) => {
    const newFilters = { ...filters, startDate, endDate };
    setFilters(newFilters);
    onFilterChange(newFilters); // 날짜 변경 시 필터 업데이트
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const resetFilters = () => {
    const initialFilters = {
      category: '',
      difficulty: '',
      day: '',
      type: '',
      status: '',
      startDate: null,
      endDate: null,
    };
    setFilters(initialFilters);
    onFilterChange(initialFilters); // 초기화 시 필터 상태 업데이트
  };

  const handleSearch = () => {
    console.log(filters);

    axios.post('/study/search', filters, {
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
    })
      .then((response) => {
        console.log('Search response:', response.data);
        setSearchResults(response.data); // Update the state with the search results
      })
      .catch((error) => {
        console.error('Error during search request:', error);
      });
  };

  return (
    <>
      <FilterContainer isCollapsed={isCollapsed}>
        <FilterHeader isCollapsed={isCollapsed}>
          <FilterTitle>스터디 검색 필터</FilterTitle>
          <ToggleButton variant="outline-primary" onClick={toggleCollapse}>
            {isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          </ToggleButton>
        </FilterHeader>
        {!isCollapsed && (
          <Row>
            <Col md={6}>
              {/* 날짜 선택 필터 추가 */}
              <FilterSection>
                <FilterLabel>검색 시작일</FilterLabel>
                <DatePicker
                  selected={filters.startDate}
                  onChange={(date) => handleDateChange(date, filters.endDate)}
                  selectsStart
                  startDate={filters.startDate}
                  endDate={filters.endDate}
                  placeholderText="검색 시작일 선택"
                  dateFormat="yyyy-MM-dd"
                />
              </FilterSection>
            </Col>
            <Col md={6}>
              <FilterSection>
                <FilterLabel>검색 종료일</FilterLabel>
                <DatePicker
                  selected={filters.endDate}
                  onChange={(date) => handleDateChange(filters.startDate, date)}
                  selectsEnd
                  startDate={filters.startDate}
                  endDate={filters.endDate}
                  minDate={filters.startDate}
                  placeholderText="검색 종료일 선택"
                  dateFormat="yyyy-MM-dd"
                />
              </FilterSection>
            </Col>
            <Col md={6}>
              {Object.entries({
                category: ['주제', '개념학습', '응용/활용', '프로젝트', '챌린지', '자격증/시험', '취업/코테', '특강', '기타'],
                difficulty: ['난이도', '초급', '중급', '고급'],
                day: ['요일', '월', '화', '수', '목', '금', '토', '일'],
                type: ['유형', '오프라인', '온라인'],
                status: ['상태', '모집 중', '진행 중', '완료']
              }).map(([key, options]) => (
                <FilterOption
                  key={key}
                  label={options[0]}
                  options={options.slice(1)}
                  selected={filters[key]}
                  onChange={(value) => handleFilterChange(key, value)}
                />
              ))}
            </Col>
            <Col md={6}>
              <ResetButton variant="outline-secondary" onClick={resetFilters}>
                초기화
              </ResetButton>
              <SearchButton variant="primary" onClick={handleSearch}>
                검색
              </SearchButton>
            </Col>
          </Row>
        )}
      </FilterContainer>

      {/* Render search results */}
      <Container>
        <Row>
          {searchResults.map((result, index) => (
            <Col key={index} md={4}>
              <div className="search-result-item">
                {/* Customize this part to display your search result */}
                <h5>{result.title}</h5>
                <p>{result.description}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default StudySearchFilter;