import React, { createContext, useState } from 'react';

export const StudyContext = createContext();

export const StudyProvider = ({ children }) => {
  const [studyId, setStudyId] = useState(null);

  return (
    <StudyContext.Provider value={{ studyId, setStudyId }}>
      {children}
    </StudyContext.Provider>
  );
};