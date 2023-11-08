import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import React, { useContext } from "react";
import { SubjectsContext } from "../components/SubjectsContextFiles";

const SubjectsBox = styled.div`
  margin-top: 10px;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  column-gap: 15px;
  margin: 10px;
  justify-content: space-between;
`;
const SubjectBox = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  width: 150px;
  height: 40px;
  border: 2px solid #000;
  border-radius: 10px;
  padding: 20px;
`;
const BtnBox = styled.div`
  display: flex;
  column-gap: 5px;
  height: 30px;
`;

export default function Subjects(params) {
  const { subjects } = useContext(SubjectsContext);
  const navigate = useNavigate();
  const goNew = () => {
    navigate("/New");
  };
  const goEdit = () => {
    navigate("/Edit");
  };
  const deleteSub = ()=>{
    
  }
  return (
    <SubjectsBox>
      <h2>과목 목록</h2>
      <SubjectsBox>
        {subjects.map((subject, index) => (
          <SubjectBox key={index} style={{ backgroundColor: subject.color }}>
            {/* <img src="img/subject.png" alt="과목" /> */}
            {subject.subject_name}
            <br />
            <BtnBox>
              <button onClick={goEdit}>수정</button>
              <button onClick={deleteSub}>삭제</button>
            </BtnBox>
          </SubjectBox>
        ))}
      </SubjectsBox>
      <button onClick={goNew}>new Subject</button>
    </SubjectsBox>
  );
}
