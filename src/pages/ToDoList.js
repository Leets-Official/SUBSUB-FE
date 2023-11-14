import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import moment from "moment";
import { useTodos } from "../components/TodosContext";
import { SubjectsContext } from "../components/SubjectsContextFiles";
import ButtonBar from "../components/ButtonBar";

const TopBox = styled.div`
  background-color: #f5f5f5;
  width : 650px;
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
  width: 60px;
  height: 40px;
`;

const SubmitButton = styled.button`
  border-radius: 6px;
  background-color: #f5f5f5;
  border: none;
  font-size: 20px;
  width: 150px;
`;

const SubBox = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 20px;
  margin: 30px;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 24px;
  border-radius: 10px;
  width: 90%;
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
  width: 400px;
  padding: 10px;
  font-size: 14px;
  border: 2px solid #ccc;
  border-radius: 10px;
  font-family: "Orbit", sans-serif;
  resize: vertical; 
`;
const StyledButton = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  background-color: #228B22;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background-color: #006400;
  }
`;
const CalendarBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ToDoListBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  max-height: 300px; /* 높이를 원하는 크기로 설정 */
  overflow-y: auto;
`;
const ToDoBox = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  font-size: 16px;
  border-bottom: 1px solid #ccc;
  width: 650px;
  padding: 8px;
`;

const ToDoSubBox = styled.div`
  flex: 1;
`;
const ToDoContentBox = styled.div`
  flex: 3;
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
  font-size: 20px;
  padding: 20px;
  justify-content: center;
  border-top: 1px solid #ccc;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 25px;
  align-items: center;
  margin-bottom: 40px;
  font-size: 20px;
`;
export default function ToDoList() {
  const today = new Date();
  const { subjects, setSubjects } = useContext(SubjectsContext);
  const { todos, addTodo, deleteTodo, setTodos } = useTodos();
  const [dueDate, setDueDate] = useState(moment(today).format("YYYY-MM-DD"));
  const [content, setContent] = useState("");
  const [isSelected, setIsSelected] = useState(true);
  const navigate = useNavigate();
  let { index } = useParams();

  const filteredTodos = todos.filter((todo) => todo.index === index);
  const sortedTodos = filteredTodos.sort((a, b) => (a.isChecked ? 1 : -1));

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
    setTodos((prevTodos) =>
      filteredTodos.map((todo, i) =>
        i === todoIndex ? { ...todo, isChecked: !todo.isChecked } : todo
      )
    );
  };
  const handleDeleteTodo = (todoIndex) => {
    const todoToDelete = filteredTodos[todoIndex];
    const indexInTodos = todos.findIndex((todo) => todo === todoToDelete);
    deleteTodo(indexInTodos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDueDate(moment(today).format("YYYY-MM-DD"));
    addTodo(index, moment(dueDate).format("YYYY-MM-DD"), content);
    setContent("");
    console.log(todos);
  };

  const toggleCalendar = () => {
    setIsSelected(!isSelected);
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
      <Form onSubmit={handleSubmit}>
        {isSelected ? (
          <StyledButton onClick={toggleCalendar}>날짜선택</StyledButton>
        ) : (
          <CalendarBox>
            <Calendar
              onChange={handleCalendarChange}
              value={dueDate}
              minDate={today}
            />
            <StyledButton onClick={toggleCalendar}>선택완료</StyledButton>
          </CalendarBox>
        )}
        <TextBox>
          <TextArea
            value={content}
            onChange={handleContentChange}
            rows="2"
            placeholder="ex)심화프로그래밍 복습하기"
          />
        </TextBox>
        <SubmitButton type="submit">할 일 추가</SubmitButton>
      </Form>
      {isSelected ? (
        <div>
          <TodoTitle>
            <div>ToDoList</div>
          </TodoTitle>
          <ToDoListBox>
            {filteredTodos.map((todo, todoIndex) => (
              <ToDoBox key={todoIndex}>
                <input
                  type="checkbox"
                  checked={todo.isChecked}
                  onChange={() => handleToggleTodo(todoIndex)}
                />
                <ToDoSubBox>{subject.subject_name}</ToDoSubBox>
                <ToDoContentBox>{todo.content}</ToDoContentBox>
                <ToDoSubDay>
                  {moment(todo.dueDate).format("YYYY.MM.DD")}
                </ToDoSubDay>
                <DueDate>
                  {moment(todo.dueDate).diff(moment(today), "days")}일 전
                </DueDate>
                <Button onClick={() => handleDeleteTodo(todoIndex)}>
                  삭제
                </Button>
              </ToDoBox>
            ))}
          </ToDoListBox>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}
