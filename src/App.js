import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import New from "./pages/New";
import Main from "./pages/Main";
import Auth from "./pages/Auth";
import SignUp from "./pages/SignUp";
import Edit from "./pages/Edit";
import ToDoList from "./pages/ToDoList"
import { SubjectsProvider } from "./components/SubjectsContextFiles";
import { TodosProvider } from './components/TodosContext';
import './App.css'
const AppBox = styled.div`
  text-align: center;
  display: flex;
  margin:20px;
`;

function App() {
  return (
    <SubjectsProvider>
      <TodosProvider>
      <BrowserRouter>
        <AppBox>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/New" element={<New />} />
            <Route path="/Main" element={<Main />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Edit/:index" element={<Edit />} />
            <Route path="/ToDoList/:index" element={<ToDoList />} />
          </Routes>
        </AppBox>
      </BrowserRouter>
      </TodosProvider>
    </SubjectsProvider>
  );
}

export default App;
