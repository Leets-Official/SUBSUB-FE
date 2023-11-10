import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  background-color: #3498db;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #2980b9;
  }
`;
const CaledarBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default function MyCalendar({ value, onChange }) {
  const [isSelected, setIsSelected] = useState(false);
  const toggleCalendar = () => {
    setIsSelected(!isSelected);
  };
  return (
    <div>
      {isSelected ? (
        <StyledButton onClick={toggleCalendar}>날짜선택</StyledButton>
      ) : (
        <CaledarBox>
          <Calendar onChange={onChange} value={value} />
          <StyledButton onClick={toggleCalendar}>선택완료</StyledButton>
        </CaledarBox>
      )}
    </div>
  );
}
