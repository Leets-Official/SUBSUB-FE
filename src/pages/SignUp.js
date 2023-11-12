import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import ButtonBar from "../components/ButtonBar";

const SignUpBox = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-top: 40px;
  margin-bottom: 20px;
  column-gap: 20px;
`;
const Input = styled.input`
  font-size: 24px;
  width: 250px;
  border-radius: 10px;
`;
const Button = styled.button`
  font-size: 22px;
  width: 100px;
  height: 80px;
  background-color: #646464;
  cursor: pointer;
  border-radius: 10px;
  color: white;
  border: none;
`;
const LoginLink = styled(Link)`
  color:black;
  text-decoration:none;
  &:visited{
    color:black;
    text:decoration:none;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  row-gap: 12px;
`;

function SignUp({ onLoginClick }) {
  const [newID, setNewId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [nickName, setNickName] = useState("");
  const navigate = useNavigate();
  const goLogin = () => {
    navigate("/");
  };

  return (
    <div>
      <ButtonBar headText={"회원가입"} display="none" />
      <SignUpBox>
        <Form>
          <Input
            type="text"
            name="newID"
            placeholder="newID"
            value={newID}
            onChange={(e) => setNewId(e.target.value)}
          />
          <Input
            type="password"
            name="newPassword"
            placeholder="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input
            type="text"
            name="nickName"
            placeholder="nickName"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          />
        </Form>
        <Button type="button" onClick={goLogin}>
          회원가입
        </Button>
      </SignUpBox>
      <LoginLink to="/">로그인하기</LoginLink>
    </div>
  );
}
export default SignUp;
