import Subjects from "../components/Subjects";
import UrgentTasks from "../components/UrgentTasks";
import { useState } from "react";
import ButtonBar from "../components/ButtonBar";
import styled from "styled-components";

const MainBox = styled.div`
  align-items: center;
`;
const Time = styled.div`
  margin: 20px;
`;

function MainPage() {
  const [curDate, setCurDate] = useState(new Date());
  const dayText = `${curDate.getFullYear()}년 ${
    curDate.getMonth() + 1
  }월 ${curDate.getDate()}일 `;
  const hourText = `${curDate.getHours()}시 ${curDate.getMinutes()}분`;

  return (
    <MainBox>
      <ButtonBar headText={"과목선택"} />
      <Time>
        <h2>{dayText}</h2>
        <h2> {hourText}</h2>
      </Time>
      <UrgentTasks />
      <Subjects />
    </MainBox>
  );
}
export default MainPage;
