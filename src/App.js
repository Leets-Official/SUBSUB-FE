import styled from "styled-components";
import New from "./pages/New";
import Main from "./pages/Main";
import Auth from "./pages/Auth";
import SignUp from "./pages/SignUp";
import Edit from "./pages/Edit";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { SubjectsProvider } from "./components/SubjectsContextFiles";
const AppBox = styled.div`
  margin-top: 50px;
  text-align: center;
  display: flex;
`;

function App() {
  return (
    <SubjectsProvider>
      <BrowserRouter>
        <AppBox>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/New" element={<New />} />
            <Route path="/Main" element={<Main />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Edit" element={<Edit />} />
          </Routes>
        </AppBox>
      </BrowserRouter>
    </SubjectsProvider>
  );
}

export default App;
