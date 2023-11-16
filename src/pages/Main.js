import { useState, useEffect } from "react";
import Subjects from "../components/Subjects";
import UrgentTodos from "../components/UrgentTodos";
import ButtonBar from "../components/ButtonBar";
import styled from "styled-components";
import Auth from "./Auth";

const MainBox = styled.div`
display: flex;
flex-direction: column;
  align-items: center;
`;

function MainPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <div>
      {isLoggedIn ? (
        <MainBox>
          <ButtonBar headText={"과목선택"}/>
          <UrgentTodos />
          <Subjects />
        </MainBox>
      ) : (
        <Auth />
      )}
    </div>
  );
}
export default MainPage;
