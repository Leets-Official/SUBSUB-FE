import { useState } from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import ButtonBar from "../components/ButtonBar";

const SignUpBox = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
font-size: 20px;
  width: 150px;
  margin-left:10px;
`;
const Button = styled.button`
margin-top:50px;
font-size:25px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  row-gap : 12px;
`

function Auth({ onLoginClick }) {
  const [newID, setNewId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const goLogin = () => {
    navigate("/");
  };

  return (
    <div>
      <SignUpBox>
        <ButtonBar
        headText={"회원가입"}
        />
        <Form>
          <label>
            아이디 : 
            <Input
              type="text"
              name="newID"
              placeholder="newID"
              value={newID}
              onChange={(e) => setNewId(e.target.value)}
            />
          </label>
          <label>
            비밀번호 : 
            <Input
              type="password"
              name="newPassword"
              placeholder="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </label>
          <Button type="button" onClick={goLogin}>회원가입</Button>
        </Form>
      </SignUpBox>
    </div>
  );
}
export default Auth;
