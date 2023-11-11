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
  border: none;
  font-size: 16px;
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
`;

const ToDoListBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
const ToDoBox = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 10px;
`;

const ToDoSubBox = styled.div`
  flex: 1;
`;
const ToDoContentBox = styled.div`
  flex: 4;
`;
const ToDoSubDay = styled.div`
  flex: 1;
`;
const DueDate = styled.div`
  flex: 1;
`;
const TextBox = styled.div``;
const TodoTitle = styled.div`
  display: flex;
  font-size:20px;
  padding:15px;
  justify-content: center;
  border-bottom: 1px solid #ccc;
  `
export default function ToDoList() {
  const today = new Date();
  const { subjects, setSubjects } = useContext(SubjectsContext);
  const { todos, addTodo, toggleTodo, deleteTodo, setTodos } = useTodos();
  const [dueDate, setDueDate] = useState(moment(today).format("YYYY-MM-DD"));
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  let { index } = useParams();
  const subject = subjects[index];

  const isMon = subject.day.mon;
  const isTue = subject.day.tue;
  const isWed = subject.day.wed;
  const isThu = subject.day.thu;
  const isFri = subject.day.fri;

  const goEdit = (index) => {
    navigate(`/Edit/${index}`);
  };
  const deleteSub = (index) => {
    const updatedSubjects = [...subjects];
    updatedSubjects.splice(index, 1);
    setSubjects(updatedSubjects);
    navigate(`/Main`);
  };

  const handleCalendarChange = (value) => {
    setDueDate(value);
  };
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };
  const handleToggleTodo = (todoIndex) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos];
      const toggledTodo = updatedTodos.splice(todoIndex, 1)[0];
      toggledTodo.isChecked = !toggledTodo.isChecked;
      if (toggledTodo.isChecked) {
        updatedTodos.push(toggledTodo);
      } else {
        updatedTodos.unshift(toggledTodo);
      }
      return updatedTodos;
    });
  };
  const handleDeleteTodo = (todoIndex) => {
    deleteTodo(todoIndex);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setDueDate(moment(today).format("YYYY-MM-DD"));
    addTodo(index, moment(dueDate).format("YYYY-MM-DD"), content);
    setContent("");
    console.log(todos);
  };

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
          <Calendar value={dueDate} onChange={handleCalendarChange} />
        </CalendarBox>
        <label>해야 할 일을 입력하세요:</label>
        <TextBox>
          <TextArea
            value={content}
            onChange={handleContentChange}
            rows="2"
            placeholder="ex)심화프로그래밍 복습하기"
          />
          <Button type="submit">할 일 추가</Button>
        </TextBox>
      </form>
      <TodoTitle>
        <div>ToDoList</div>
      </TodoTitle>
      <ToDoListBox>
        {todos.map((todo, todoIndex) => (
          <ToDoBox key={todoIndex}>
            <input
              type="checkbox"
              checked={todo.isChecked}
              onChange={() => handleToggleTodo(todoIndex)}
            />
            <ToDoSubBox>{subject.subject_name}</ToDoSubBox>
            <ToDoContentBox>{todo.content}</ToDoContentBox>
            <ToDoSubDay>{moment(todo.dueDate).format("YYYY.MM.DD")}</ToDoSubDay>
            <DueDate>{moment(todo.dueDate).diff(moment(today), "days")}일 전</DueDate>
            <Button onClick={() => handleDeleteTodo(todoIndex)}>삭제</Button>
          </ToDoBox>
        ))}
      </ToDoListBox>
    </div>
  );
}
