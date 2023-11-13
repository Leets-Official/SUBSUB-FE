import styled from "styled-components";
import { useNavigate,Link } from "react-router-dom";
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
const MainLink = styled(Link)`
color:black;
text-decoration:none;
font-family: "Arial", sans-serif;

&:visited{
  color:black;
  text-decoration:none;
}
`
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

const ButtonBar = ({ headText, display, nickName }) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const goLogin = () => {
    navigate("/");
  };

  return (
    <Header>
      <ButtonBox>
        <Button onClick={goBack} style={{ display: display }}>⬅️</Button>
        <Button onClick={goLogin} style={{ display: display }}>로그아웃</Button>
      </ButtonBox>
      <Title>
        <MainLink to={'/Main'}>{nickName} SUBSUB</MainLink>
        <div>{headText}</div>
      </Title>
      <NavBar></NavBar>
    </Header>
  );
};

export default ButtonBar;
