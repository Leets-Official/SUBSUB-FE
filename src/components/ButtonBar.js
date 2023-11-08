import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const NavBar = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 180px;
  font-size: 30px;
  margin-bottom: 100px;
  align-items: center;
`;
const Title = styled.div`
  font-size: 40px;
  margin-bottom: 10px;
`;
const Header = styled.header`
  height: 200px;
`;
const A = styled.a`
  text-decoration-line: none;
  font-family: "Arial", sans-serif;
`;
const Button = styled.button`
  font-size: 25px;
`;

const ButtonBar = ({ headText }) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <Header>
      <Title>
        <A href="/Main">My SUBSUB</A>
      </Title>
      <NavBar>
        <Button onClick={goBack}>⬅️</Button>
        <div>{headText}</div>
      </NavBar>
    </Header>
  );
};

export default ButtonBar;
