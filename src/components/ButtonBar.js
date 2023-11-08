import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const NavBar = styled.div`
  column-gap: 180px;
  font-size: 30px;
  margin-bottom: 100px;
`;
const Title = styled.div`
  font-size: 40px;
  margin-bottom: 10px;
`;
const Header = styled.header`
  height: 150px;
  text-align: center;
  border-bottom: 1px solid gray;
  margin-bottom: 10px;
`;
const A = styled.a`
  text-decoration-line: none;
  font-family: "Arial", sans-serif;
`;
const Button = styled.button`
  font-size: 15px;
`;
const ButtonBox = styled.div`
  text-align: center;
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: flex-start;
`;

const ButtonBar = ({ headText, display }) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const goAuth = () => {
    navigate("/");
  };

  return (
    <Header>
      <ButtonBox>
        <Button onClick={goBack} style={{ display: display }}>⬅️</Button>
        <Button onClick={goAuth} style={{ display: display }}>로그아웃</Button>
      </ButtonBox>
      <Title>
        <A href="/Main">My SUBSUB</A>
        <div>{headText}</div>
      </Title>
      <NavBar></NavBar>
    </Header>
  );
};

export default ButtonBar;
