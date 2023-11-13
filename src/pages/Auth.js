import { useState } from "react";
import {useNavigate, Link} from "react-router-dom";
import { login } from "../apis/login";
import ButtonBar from "../components/ButtonBar";
import styled from "styled-components";

const LoginBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top:40px;
  column-gap:20px;
  margin-bottom:20px;
`;
const Input = styled.input`
  font-size: 24px;
  width: 250px;
  border-radius: 10px;
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
  const navigate = useNavigate();
  const goMain = () => {
    navigate("/Main");
  };

  // const onClick = async () =>{
    const onClick = () =>{
    // const result = await login(id, password);
    // console.log(result);
    // const {token}=result
    // localStorage.setItem('acccess', token)
    goMain();
  }
  
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
            />
            <Input
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
        </Form>
            <Button type="button" onClick={onClick}>Login</Button>
      </LoginBox>
      <SignUpLink to="/SignUp">회원가입하기</SignUpLink>
    </div>
  );
}
export default Auth;
