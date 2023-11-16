import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { signUp } from "../apis/signUp";
import ButtonBar from "../components/ButtonBar";

const SignUpBox = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  margin-bottom: 20px;
  column-gap: 20px;
`;
const Img = styled.img`
  width: 300px;
  height: 300px;
`;
const Input = styled.input`
  font-size: 24px;
  width: 250px;
  font-family: 'Noto Sans KR', sans-serif;  
  border-radius: 10px;
  border: 2px solid ${(props) => (props.isError ? "red" : "#000")};
`;

const ErrorMessage = styled.div`
  font-size: 14px;
  color: red;
  margin-top: -9px;
`;

const Button = styled.button`
  font-size: 22px;
  height: 80px;
  background-color: #646464;
  cursor: pointer;
  border-radius: 10px;
  color: white;
  border: none;
  font-family: 'Noto Sans KR', sans-serif;  
  background-color: #228b22;
  cursor: pointer;
  &:hover {
    background-color: #006400;
  }
`;
const LoginLink = styled(Link)`
  color: black;
  text-decoration: none;
  &:visited {
    color: black;
    text-decoration: none;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  row-gap: 10px;
`;

function SignUp() {
  const [newID, setNewId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [nickName, setNickName] = useState("");
  const [newIdError, setNewIdError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [nickNameError, setNickNameError] = useState(false);
  const navigate = useNavigate();

  const goLogin = () => {
    navigate("/");
  };

  const onClick = async () => {
    if (validateInput()) {
      const result = await signUp(newID, newPassword, nickName);
      console.log(result);
      goLogin();
    }
  }; 

  const validateInput = () => {
    const newIdRegex = /^[a-zA-Z0-9]{5,12}$/;
    if (!newIdRegex.test(newID)) {
      setNewIdError(true);
      return false;
    }

    if (newPassword.length < 5 || newPassword.length > 12) {
      setNewPasswordError(true);
      return false;
    }

    if (nickName.length < 2 || nickName.length > 8) {
      setNickNameError(true);
      return false;
    }

    setNewIdError(false);
    setNewPasswordError(false);
    setNickNameError(false);
    return true;
  };

  const handleFocus = (inputName) => {
    switch (inputName) {
      case "newID":
        setNewIdError(false);
        break;
      case "newPassword":
        setNewPasswordError(false);
        break;
      case "nickName":
        setNickNameError(false);
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <ButtonBar headText={"회원가입"} display="none" />
      <Img src="images/logo.jpg"></Img>
      <SignUpBox>
        <Form>
          <Input
            type="text"
            name="newID"
            placeholder="newID"
            value={newID}
            onChange={(e) => setNewId(e.target.value)}
            isError={newIdError}
            onFocus={() => handleFocus("newID")}
          />
          {newIdError && (
            <ErrorMessage>영어와 숫자로 5~12글자 입력하세요.</ErrorMessage>
          )}
          <Input
            type="password"
            name="newPassword"
            placeholder="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            isError={newPasswordError}
            onFocus={() => handleFocus("newPassword")}
          />
          {newPasswordError && (
            <ErrorMessage>5~12글자로 입력하세요.</ErrorMessage>
          )}
          <Input
            type="text"
            name="nickName"
            placeholder="nickName"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
            isError={nickNameError}
            onFocus={() => handleFocus("nickName")}
          />
          {nickNameError && <ErrorMessage>2~8글자로 입력하세요.</ErrorMessage>}
        </Form>
        <Button type="button" onClick={onClick}>
          회원가입
        </Button>
      </SignUpBox>
      <LoginLink to="/">로그인하기</LoginLink>
    </div>
  );
}
export default SignUp;
