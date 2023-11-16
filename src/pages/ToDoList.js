import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import moment from "moment";
import { useTodos } from "../components/TodosContext";
import { SubjectsContext } from "../components/SubjectsContextFiles";
import ButtonBar from "../components/ButtonBar";
import findToken from "../findToken";
import { deleteSub, getSubjects } from "../apis/subject.js";
import {
  addTodo,
  deleteToDo,
  getSortToDo,
  getTodo,
  updateToDo,
} from "../apis/todo";
import axios from "axios";

const TopBox = styled.div`
  background-color: #f5f5f5;
  width: 650px;
`;
const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Button = styled.button`
  border-radius: 6px;
  background-color: #228b22;
  border: none;
  font-size: 14px;
  width: 60px;
  height: 40px;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #006400;
  }
`;
const DeleteButton = styled.button`
  border-radius: 6px;
  background-color: #cd1f48;
  border: none;
  color: white;
  font-size: 14px;
  width: 60px;
  height: 40px;
  cursor: pointer;
  &:hover {
    background-color: #ff4646;
  }
`;
const SubmitButton = styled.button`
  border-radius: 6px;
  background-color: #228b22;
  border: none;
  height: 40px;
  font-size: 20px;
  width: 150px;
  cursor: pointer;
  color: white;
  &:hover {
    background-color: #006400;
  }
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
  height: 40px;
  border-radius: 10px;
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
  background-color: #228b22;
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
  width: 650px;

  max-height: 280px; /* 높이를 원하는 크기로 설정 */
  overflow-y: auto;
`;
const ToDoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
  width: 600px;
  padding: 8px;
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
  let { index } = useParams();
  const { subjects, setSubjects } = useContext(SubjectsContext);
  const { todos, setTodos } = useTodos();
  const [dueDate, setDueDate] = useState(moment(today).format("YYYY-MM-DD"));
  const [content, setContent] = useState("");
  const [isSelected, setIsSelected] = useState(true);
  const [subject, setSubject] = useState({});
  const navigate = useNavigate();
  const access_token = findToken();
  const [todo, setTodo]= useState([]);

  const handleDelete = async (access_token, todo) => {
    await deleteToDo(access_token, todo.propertyId);
    const sortToDo = await getSortToDo(index, access_token);
    setTodos(sortToDo);
  };

  const handleToggleTodo = async (access_token, todo) => {
    const updatedTodo = {
      ...todo,
      isCompleted: !todo.isCompleted,
    };
    await updateToDo(access_token, updatedTodo, index);
    const sortToDo = await getSortToDo(index, access_token);
    await setTodos(sortToDo);
  };

  useEffect(() => {
    getSubjects(index, access_token, setSubject);
    
  }, []);

  useEffect(() => {
    const getData= async () => {
      const sortToDo = await getSortToDo(index, access_token);
      await setTodos(sortToDo);
    };
    getData();
  }, []);

  const isMon = subject.mon;
  const isTue = subject.tue;
  const isWed = subject.wed;
  const isThu = subject.thu;
  const isFri = subject.fri;

  const goEdit = (index) => {
    navigate(`/Edit/${index}`);
  };

  const handleCalendarChange = (value) => {
    setDueDate(value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTodo(index, dueDate, content, access_token);
    const sortToDo = await getSortToDo(index, access_token);
    await setTodos(sortToDo);
    console.log('정렬된 배열', sortToDo);
    setDueDate(moment(today).format("YYYY-MM-DD"));
    setContent("");
  };

  const toggleCalendar = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div>
      <ButtonBar headText={subject.subjectName} />
      <BtnBox>
        <Button onClick={() => goEdit(index)}>수정</Button>
        <DeleteButton onClick={() => deleteSub(index, access_token, navigate)}>
          삭제
        </DeleteButton>
      </BtnBox>
      <TopBox>
        <SubBox>
          {subject.professorName}
          <DayBox>
            <Day isOn={isMon}>월</Day>
            <Day isOn={isTue}>화</Day>
            <Day isOn={isWed}>수</Day>
            <Day isOn={isThu}>목</Day>
            <Day isOn={isFri}>금</Day>
          </DayBox>
          {subject.classType}
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
        <div>
          <TodoTitle>
            <div>ToDoList</div>
          </TodoTitle>
          <ToDoListBox>
            {todos.map((todo, todoIndex) => (
              <ToDoBox key={todoIndex}>
                <input style={{accentColor:subject.color}}
                  type="checkbox"
                  checked={todo.isCompleted}
                  onChange={() => handleToggleTodo(access_token, todo)}
                />
                <ToDoSubBox>{subject.subjectName}</ToDoSubBox>
                <ToDoContentBox>{todo.content}</ToDoContentBox>
                <ToDoSubDay>
                  {moment.utc(todo.expiredAt).format("MM.DD")}
                </ToDoSubDay>
                <DueDate>
                  {todo.isCompleted ? <p>완료</p> :<div>
    {moment(todo.expiredAt).diff(moment(today), "days") === 0 ? 
      <p style={{color:"red"}}>오늘까지 </p> : 
      moment(todo.expiredAt).diff(moment(today), "days")+1 + '일 전'
    }
  </div>}
                </DueDate>
                <DeleteButton onClick={() => handleDelete(access_token, todo)}>
                  삭제
                </DeleteButton>
              </ToDoBox>
            ))}
          </ToDoListBox> 
        </div>
    </div>
  );
}
