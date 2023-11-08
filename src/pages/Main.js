import Subjects from "../components/Subjects";
import UrgentTasks from "../components/UrgentTasks";
import { useState } from "react";
import ButtonBar from "../components/ButtonBar";
import styled from "styled-components";



const MainBox = styled.div`
  margin-top: 50px;
  align-items: center;
`;

function MainPage() {
  const [curDate, setCurDate] = useState(new Date());
  const [isLogined, setIsLogined] = useState(false);
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  return (
    <MainBox>
      <ButtonBar
        headText={"과목선택"}
        />
        <>
          <h2> 오늘은 {headText}</h2>
          <UrgentTasks />
          <Subjects />
        </>
    </MainBox>
  );
}
export default MainPage;
