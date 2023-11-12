import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import React, { useContext } from "react";
import { SubjectsContext } from "../components/SubjectsContextFiles";

const SubjectsBox = styled.div`
  display: flex;  
  margin-top: 10px;
  flex-wrap: wrap;
  column-gap: 15px;
  row-gap:20px;
  margin: 10px;
  align-items: center;
  max-height: 30vh;
  overflow-y: auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); 
  border-radius: 10px;
  background-color:#F5F5F5;
  padding: 20px;
`;
const SubjectBox = styled.div`
  display: flex;
  border-radius: 50px;
`;
const ImgBox = styled.div`
  display: flex;
  border-radius: 50%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 105px;
  height: 105px;
  font-size: 14px;
  text-align: center;
  margin-left:10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
`;

const Img = styled.img`
  width: 45px;
  height:45px;
`;
export default function Subjects(params) {
  const { subjects, setSubjects } = useContext(SubjectsContext);
  const navigate = useNavigate();

  const goNew = () => {
    navigate("/New");
  };

  const goToDo = (index) => {
    navigate(`/ToDoList/${index}`);
  };
  return (
    <div>
      <h2>과목 목록</h2>
      <SubjectsBox>
        <ImgBox style={{ backgroundColor: "white" }} onClick={goNew}>
          <Img alt="sub_img" src="images\subject.png"></Img>
          추가
        </ImgBox>
        {subjects.map((subject, index) => (
          <SubjectBox key={index}>
            <ImgBox
              style={{ backgroundColor: subject.color }}
              onClick={() => goToDo(index)}
            >
              <Img alt="sub_img" src="images\subject.png"></Img>
              {subject.subject_name}
            </ImgBox>
          </SubjectBox>
        ))}
      </SubjectsBox>
    </div>
  );
}
