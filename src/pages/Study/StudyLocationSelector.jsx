import React, { useState, useEffect } from 'react';
import data from '../../data/전국행정동리스트.json'; // JSON 파일 경로

const StudyLocationSelector = () => {
  const [selectedLargeClassification, setSelectedLargeClassification] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [largeClassifications, setLargeClassifications] = useState([]);
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);

  useEffect(() => {
    const uniqueLargeClassifications = Array.from(new Set(
      data.LIST.filter(item => item.Column1 !== "대분류" && item.Column1 !== "동/면/리").map(item => item.Column1)
    ));
    setLargeClassifications(uniqueLargeClassifications);
  }, []); 


  useEffect(() => {
    if (selectedLargeClassification) {
      const filteredRegions = Array.from(new Set(
        data.LIST.filter(item => item.Column1 === selectedLargeClassification).map(item => item.Column2)
      ));
      setRegions(filteredRegions);
      setSelectedRegion('');
      setDistricts([]);
      setNeighborhoods([]);
    }
  }, [selectedLargeClassification]);

  useEffect(() => {
    if (selectedRegion) {
      const filteredDistricts = Array.from(new Set(
        data.LIST.filter(item => item.Column1 === selectedLargeClassification && item.Column2 === selectedRegion).map(item => item.Column3)
      ));
      setDistricts(filteredDistricts);
      setSelectedDistrict('');
      setNeighborhoods([]);
    }
  }, [selectedRegion, selectedLargeClassification]); 


  useEffect(() => {
    if (selectedDistrict) {
      const filteredNeighborhoods = Array.from(new Set(
        data.LIST.filter(item => item.Column1 === selectedLargeClassification && item.Column2 === selectedRegion && item.Column3 === selectedDistrict).map(item => item.Column4)
      ));
      setNeighborhoods(filteredNeighborhoods);
    }
  }, [selectedDistrict, selectedRegion, selectedLargeClassification]); 

  return (
    <div>
      <label>
        대분류:
        <select
          value={selectedLargeClassification}
          onChange={(e) => setSelectedLargeClassification(e.target.value)}
        >
          <option value="">Select</option>
          {largeClassifications.map(lc => (
            <option key={lc} value={lc}>
              {lc}
            </option>
          ))}
        </select>
      </label>

      <label>
        시 / 군:
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          <option value="">Select</option>
          {regions.map(region => (
            <option key={`${selectedLargeClassification}-${region}`} value={region}>
              {region}
            </option>
          ))}
        </select>
      </label>

      <label>
        구:
        <select
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
        >
          <option value="">Select</option>
          {districts.map(district => (
            <option key={`${selectedLargeClassification}-${selectedRegion}-${district}`} value={district}>
              {district}
            </option>
          ))}
        </select>
      </label>

      <label>
        동 / 면 / 리:
        <select>
          <option value="">Select</option>
          {neighborhoods.map(neighborhood => (
            <option key={`${selectedLargeClassification}-${selectedRegion}-${selectedDistrict}-${neighborhood}`} value={neighborhood}>
              {neighborhood}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default StudyLocationSelector;
