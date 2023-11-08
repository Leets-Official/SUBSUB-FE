import { useState } from "react";
import Urgent from "./Urgent";
import styled from "styled-components";

const UrgentBox = styled.div`
  border: 1px solid gray;
`;
 
export default function UrgentTasks() {
  const [urgentTasks, setUrgentTasks] = useState([]);
  let urgentTaskTest = [
    {
      id: 0,
      sub: "컴퓨터구조",
      todo: "레포트제출",
      date: "23.11.05",
      deadline: "1일전",
    },
    {
      id: 1,
      sub: "리눅스",
      todo: "명령어암기",
      date: "23.11.07",
      deadline: "3일전",
    },
    {
      id: 2,
      sub: "심프",
      todo: "발표준비",
      date: "23.11.07",
      deadline: "3일전",
    },
    {
      id: 3,
      sub: "컴퓨터구조",
      todo: "레포트제출",
      date: "23.11.11",
      deadline: "7일전",
    },
  ];
  return (
    <UrgentBox>
      <h3>급한 일정</h3>
      {urgentTaskTest.map((task) => (
        <Urgent
          sub={task.sub}
          todo={task.todo}
          date={task.date}
          deadline={task.deadline}
        />
      ))}
    </UrgentBox>
  );
}
