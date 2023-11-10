import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import { useTodos } from "../components/TodosContext";
import { SubjectsContext } from "../components/SubjectsContextFiles";
import ButtonBar from "../components/ButtonBar";
import Calendar from "../components/Calendar";

const TopBox = styled.div`
  background-color: #f5f5f5;
`;
const BtnBox = styled.div`
display: flex;
justify-content: space-between;
`;
const Button = styled.button`
  border-radius: 6px;
  background-color: #f5f5f5;
  border:none;
  font-size:16px;
`;
const SubBox = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 20px;
  margin: 30px;
  justify-content: space-around;
  align-items: center;
  font-weight:bold;
  font-size:22px;
  border-radius: 10px;
  width=90%
`;
const Day = styled.div`
  color: ${(props) => (props.isOn ? "black" : "gray")};
  font-weight: ${(props) => (props.isOn ? "bold" : "normal")};
`;
const DayBox = styled.div`
  font-size: 18px;
  display: flex;
  flex-direction: row;
  column-gap: 16px;
`;
const TextArea = styled.textarea`
  width: 80%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical; /* 사용자가 수직으로만 리사이즈 가능하도록 설정 */
`;
const CalendarBox = styled.div`
width=90%
`

export default function ToDoList() {
  const { subjects, setSubjects } = useContext(SubjectsContext);
  const { todos, addTodo, toggleTodo } = useTodos();
  const [dueDate, setDueDate] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  let { index } = useParams();

  const subject = subjects[index];

  const goEdit = (index) => {
    navigate(`/Edit/${index}`);
    console.log(index, "번째 item", subjects[index]);
  };

  const deleteSub = (index) => {
    const updatedSubjects = [...subjects];
    updatedSubjects.splice(index, 1);
    setSubjects(updatedSubjects);
    navigate(`/Main`);
  };
  const handleCalendarChange = (value) => {
    setDueDate(value);
    console.log(dueDate);
  };
  const handleContentChange = (e)=>{
    setContent(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(index,moment(dueDate).format("YYYY-MM-DD"), content);
    setDueDate('');
    setContent('');
    console.log(todos);
  };

  const isMon = subject.day.mon;
  const isTue = subject.day.tue;
  const isWed = subject.day.wed;
  const isThu = subject.day.thu;
  const isFri = subject.day.fri;
  return (
    <div>
      <ButtonBar headText={subject.subject_name} />
      <BtnBox>
        <Button onClick={() => goEdit(index)}>수정</Button>
        <Button onClick={() => deleteSub(index)}>삭제</Button>
      </BtnBox>
      <TopBox>
        <SubBox>
          {subject.professor_name}
          <DayBox>
            <Day isOn={isMon}>월</Day>
            <Day isOn={isTue}>화</Day>
            <Day isOn={isWed}>수</Day>
            <Day isOn={isThu}>목</Day>
            <Day isOn={isFri}>금</Day>
          </DayBox>
          {subject.class_type}
        </SubBox>
      </TopBox>
    <form onSubmit={handleSubmit}>
      <CalendarBox>
          마감날짜 : {moment(dueDate).format("YYYY년 MM월 DD일")}까지
          <Calendar value={dueDate} onChange={handleCalendarChange}/>
      </CalendarBox>
      <label>해야 할 일을 입력하세요:</label>
      <TextArea value={content} onChange={handleContentChange} rows="4"placeholder="ex)심화프로그래밍 복습하기" />
      <button type="submit">할 일 추가</button>
    </form>
    </div>
  );
}
