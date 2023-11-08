import React, { createContext, useContext, useState } from 'react';

export const SubjectsContext = createContext(); // SubjectsContext 생성

export const SubjectsProvider = ({ children }) => {
  const [subjects, setSubjects] = useState([]); // subjects 상태 초기화

  return (
    <SubjectsContext.Provider value={{ subjects, setSubjects }}>
      {children}
    </SubjectsContext.Provider>
  );
};