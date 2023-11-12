import { useState } from "react";
import Urgent from "./Urgent";
import styled from "styled-components";

const UrgentBox = styled.div`
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #f5f5f5;
  padding: 20px;
`;

const Urgents = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
`;

export default function UrgentTasks() {
  const [urgentTasks, setUrgentTasks] = useState([]);
  let urgentTaskTest = [
    {
      key: 0,
      sub: "컴퓨터구조",
      todo: "레포트제출",
      date: "23.11.05",
      deadline: "1일전",
    },
    {
      key: 1,
      sub: "리눅스",
      todo: "명령어암기",
      date: "23.11.07",
      deadline: "3일전",
    },
    {
      key: 2,
      sub: "심프",
      todo: "발표준비",
      date: "23.11.07",
      deadline: "3일전",
    },
    {
      key: 3,
      sub: "컴퓨터구조",
      todo: "레포트제출",
      date: "23.11.11",
      deadline: "7일전",
    },
    {
      key: 4,
      sub: "컴퓨터구조",
      todo: "레포트제출",
      date: "23.11.11",
      deadline: "7일전",
    },
  ];
  return (
    <div>
      <h2>급한일정</h2>
      <UrgentBox>
        <Urgents>
          {urgentTaskTest.map((task) => (
            <Urgent
              key={task.key}
              sub={task.sub}
              todo={task.todo}
              date={task.date}
              deadline={task.deadline}
            />
          ))}
        </Urgents>
      </UrgentBox>
    </div>
  );
}
