import { useState } from "react";
import {useNavigate, Link} from "react-router-dom";
import { login } from "../apis/login";
import ButtonBar from "../components/ButtonBar";
import styled from "styled-components";

const LoginBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top:100px;
  column-gap:20px;
  margin-bottom:20px;
`;
const Input = styled.input`
  font-size: 24px;
  width: 250px;
  border-radius: 10px;
  border: 2px solid ${(props) => (props.isError ? "red" : "#000")};
`;
const ErrorMessage = styled.div`
  font-size: 14px;
  color: red;
  margin-top: -9px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap : 12px;
`
const Button = styled.button`
  font-size: 20px;
  width:100px;
  height:80px;
  background-color:#646464;
  cursor: pointer;
  color:white;
  border-radius: 10px;
  border: none;
`;
const SignUpLink = styled(Link)`
  margin-top:20px;
  color:black;
  text-decoration:none;
  &:visited{
    color:black;
    text-decoration:none;
  }
`;
function Auth() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [idError, setIdError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();
  const goMain = () => {
    navigate("/Main");
  };
  const validateInput = () => {
    const idRegex = /^[a-zA-Z0-9]{5,12}$/;
    if (!idRegex.test(id)) {
      setIdError(true);
      return false;
    }
    if (password.length < 5 || password.length > 12) {
      setPasswordError(true);
      return false;
    }
    setIdError(false);
    setPasswordError(false);
    return true;
  };
  
  const handleFocus = (inputName) => {
    switch (inputName) {
      case "id":
        setIdError(false);
        break;
      case "password":
        setPasswordError(false);
        break;
      default:
        break;
    }
  };
  const onClick = async () => {
    try{
      if (validateInput()) {
        const token = await login(id, password);
        document.cookie = `access_token=${token}; Path=/; SameSite=Lax`;
        goMain();
      }
    }catch (error) {
      alert('로그인 실패');
    }
  };


  return (
    <div>
      <ButtonBar
        headText={"로그인"}
        display='none'
        />
      <LoginBox>
        <Form>
            <Input
              type="text"
              name="id"
              placeholder="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              isError={idError}
            onFocus={() => handleFocus("id")}
            />
             {idError && (
            <ErrorMessage>영어와 숫자로 5~12글자 입력하세요.</ErrorMessage>
          )}
            <Input
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isError={passwordError}
            onFocus={() => handleFocus("password")}
            />
            {passwordError && (
            <ErrorMessage>5~12글자로 입력하세요.</ErrorMessage>
          )}
        </Form>
            <Button type="button" onClick={onClick}>로그인</Button>
      </LoginBox>
      <SignUpLink to="/SignUp">회원가입하기</SignUpLink>
    </div>
  );
}
export default Auth;
