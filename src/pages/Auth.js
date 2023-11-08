import { useState } from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import ButtonBar from "../components/ButtonBar";
const LoginBox = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top:30px;
`;

const Input = styled.input`
font-size: 20px;
  width: 150px;
  margin-left:10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap : 12px;
`
const Button = styled.button`
  font-size: 20px;
  width:100px
`;
function Auth({ onLoginClick }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isLogined, setIsLogined] = useState(false)
  const navigate = useNavigate();
  const goMain = () => {
    navigate("/Main");
  };
  const goSignUp = () => {
    navigate("/SignUp");
  };
  
  return (
    <div>
      <LoginBox>
      <ButtonBar
        headText={"로그인"}
        display='none'
        />
        <Form>
          <label>
            아이디 : 
            <Input
              type="text"
              name="id"
              placeholder="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </label>
          <label>
            비밀번호 : 
            <Input
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <Button type="button" onClick={goMain}>Login</Button>
          <Button type="button" onClick={goSignUp}>SignUp</Button>
        </Form>
      </LoginBox>
    </div>
  );
}
export default Auth;
