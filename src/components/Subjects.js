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
`;
const SubjectBox = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  width:150px;
  height: 50px;
  padding: 20px;
background-color:#F5F5F5;

`;
const BtnBox = styled.div`
  display: flex;
  flex-direction:column;
  row-gap: 10px;
`;
const ImgBox = styled.div`
  display: flex;
  flex-direction:column;
  width: 50px;
`;
const Button = styled.button`
font-size: 12px;
`


export default function Subjects(params) {
  const { subjects, setSubjects } = useContext(SubjectsContext);
  const navigate = useNavigate();
  const goNew = () => {
    navigate("/New");
  };
  const goEdit = () => {
    navigate("/Edit");
  };
  const goToDo =(subject)=>{
    navigate("/ToDoList")
  }
  const deleteSub = (index)=>{
    const updatedSubjects = [...subjects];
    updatedSubjects.splice(index, 1);
    setSubjects(updatedSubjects);
  }
  return (
    <div>
      <h2>과목 목록</h2>
      <Button onClick={goNew}>new Subject</Button>
      <SubjectsBox>
        {subjects.map((subject, index) => (
          <SubjectBox key={index}>
            <ImgBox onClick={(subject)=>goToDo(subject)}>
            <img alt="sub_img" src="images\subject.png" style={{ backgroundColor: subject.color }}  ></img>
            {subject.subject_name}
            </ImgBox>
            <BtnBox>
              <Button onClick={goEdit}>수정</Button>
              <Button onClick={()=>deleteSub(index)}>삭제</Button>
            </BtnBox>
          </SubjectBox>
        ))}
      </SubjectsBox>
    </div>
  );
}
