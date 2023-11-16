import { useState,useContext, useEffect } from "react";
import moment from "moment";
import { useTodos } from "./TodosContext";
import { SubjectsContext } from "./SubjectsContextFiles";
import styled from "styled-components";
import { getSortToDo, getUrgent, updateToDo } from "../apis/todo";
import findToken from "../findToken";


const UrgentBox = styled.div`
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 10px;
  width : 650px;
  box-shadow: 0 0 13px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
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
  font-weight: bold;
`;

const ToDoSubBox = styled.div`
  flex: 2;
`;
const ToDoContentBox = styled.div`
  flex: 6 ;
`;
const ToDoSubDay = styled.div`
  flex: 2;
`;
const DueDate = styled.div`
  flex: 1;
`;

export default function UrgentTasks() {
  const [ todos,  setTodos ] = useState([]);
  const { subjects, setSubjects } = useContext(SubjectsContext);
  const today = new Date();
  const access_token = findToken();

  // const handleToggleTodo = async (access_token, todo) => {
  //   const updatedTodo = {
  //     ...todo,
  //     isCompleted: !todo.isCompleted,
  //   };
  //   await updateToDo(access_token, updatedTodo, index);
  //   const sortToDo = await getSortToDo(index, access_token);
  //   await setTodos(sortToDo);
  // };

useEffect(() => {
  const urgent = getUrgent(access_token);
  const getData=()=>{
    urgent.then((urgentList)=>{
      setTodos(urgentList)
    });
  };
  getData()
}, []);
  return (
    <div>
      <h2>급한일정</h2>
      <UrgentBox>
        <Urgents>
          {todos.length > 0 && todos.map((todo, todoIndex) => (
          <ToDoBox key={todoIndex}>
            {/* <input
                  type="checkbox"
                  checked={todo.isCompleted}
                  onChange={() => handleToggleTodo(access_token, todo)}
                /> */}
            {todoIndex+1}순위
            <ToDoContentBox>{todo.content}</ToDoContentBox>
            <ToDoSubDay>{todo.expiredAt}</ToDoSubDay>
            <DueDate>
              {moment(todo.expiredAt).diff(moment(today), "days")}일 전
            </DueDate>
          </ToDoBox>
        ))}
        </Urgents>
      </UrgentBox>
    </div>
  );
}
