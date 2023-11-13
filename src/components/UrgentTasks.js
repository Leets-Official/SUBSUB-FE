import { useState,useContext } from "react";
import moment from "moment";
import { useTodos } from "../components/TodosContext";
import { SubjectsContext } from "../components/SubjectsContextFiles";
import styled from "styled-components";

const UrgentBox = styled.div`
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #f5f5f5;
  padding: 10px;
`;

const Urgents = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  font-size: 14px;
`;

const ToDoBox = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 10px;
`;

const ToDoSubBox = styled.div`
  flex: 2;
`;
const ToDoContentBox = styled.div`
  flex: 5;
`;
const ToDoSubDay = styled.div`
  flex: 1;
`;
const DueDate = styled.div`
  flex: 1;
`;

export default function UrgentTasks() {
  const { todos,  setTodos } = useTodos();
  const { subjects, setSubjects } = useContext(SubjectsContext);
  const today = new Date();

  const handleToggleTodo = (todoIndex) => {
    setTodos((prevTodos) =>
    todos.map((todo, i) =>
      i === todoIndex ? { ...todo, isChecked: !todo.isChecked } : todo)
  );
}
const closestTodos = todos.filter((todo) => !todo.isChecked).sort(
      (a, b) =>
        moment(a.dueDate).diff(moment(today), "days") -
        moment(b.dueDate).diff(moment(today), "days")
    )
    .slice(0, 5); 

  return (
    <div>
      <h2>급한일정</h2>
      <UrgentBox>
        <Urgents>
          {closestTodos.map((todo, todoIndex) => (
          <ToDoBox key={todoIndex}>
            <input
              type="checkbox"
              checked={todo.isChecked}
              onChange={() => handleToggleTodo(todoIndex)}
            />
            <ToDoContentBox>{todo.content}</ToDoContentBox>
            <ToDoSubBox>{subjects[todo.index].subject_name}</ToDoSubBox>
            <ToDoSubDay>{moment(todo.dueDate).format("YYYY.MM.DD")}</ToDoSubDay>
            <DueDate>
              {moment(todo.dueDate).diff(moment(today), "days")}일 전
            </DueDate>
          </ToDoBox>
        ))}
        </Urgents>
      </UrgentBox>
    </div>
  );
}
