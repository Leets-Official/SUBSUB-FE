import { useNavigate } from "react-router-dom";
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
  align-items: center; 

`;
const SubjectBox = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-radius: 15px;

`;
const ImgBox = styled.div`
  display:flex;
  border-radius: 50%;
  flex-direction:column;
  justify-content: center;
  align-items: center; 
  width: 90px;
  height:90px;
  font-size: 15px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
`;

const Img = styled.img`
width: 50px;
height: 50px
`


export default function Subjects(params) {
  const { subjects, setSubjects } = useContext(SubjectsContext);
  const navigate = useNavigate();
 
  const goNew = () => {
    navigate("/New");
  };
 
  const goToDo =(index)=>{
    navigate(`/ToDoList/${index}`)
  }
  return (
    <div>
      <h2>과목 목록</h2>
      <SubjectsBox>
      <ImgBox onClick={goNew}><Img alt="sub_img" src="images\subject.png"></Img>➕</ImgBox>
        {subjects.map((subject, index) => (
          <SubjectBox key={index}>
            <ImgBox style={{ backgroundColor: subject.color }} onClick={()=>goToDo(index)}>
              <Img alt="sub_img" src="images\subject.png"></Img>
            {subject.subject_name}
            </ImgBox>
          </SubjectBox>
        ))}
      </SubjectsBox>
    </div>
  );
}
