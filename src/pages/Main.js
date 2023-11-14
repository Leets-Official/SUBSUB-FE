import { useState, useEffect } from "react";
import Subjects from "../components/Subjects";
import UrgentTodos from "../components/UrgentTodos";
import ButtonBar from "../components/ButtonBar";
import styled from "styled-components";
import Auth from "./Auth";
import { getMyPage } from "../apis/mypage";

const MainBox = styled.div`
display: flex;
flex-direction: column;
  align-items: center;
`;

function MainPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [data, setData] = useState();
  // const checkLoginStatus = () => {
  //   const token = localStorage.getItem("access");
  //   setIsLoggedIn(!!token);
  // };
  // useEffect(() => {
  //   checkLoginStatus();
  //   getMyPage().then((res) => {
  //     setData(res);
  //   });
  // }, []);
  return (
    <div>
      {isLoggedIn ? (
        <MainBox>
          <ButtonBar headText={"과목선택"} nickName={data?.nickname}/>
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
