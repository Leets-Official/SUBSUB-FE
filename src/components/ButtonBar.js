import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
const NavBar = styled.div`
  column-gap: 140px;
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
  width: 650px;
`;
const MainLink = styled(Link)`
  color: black;
  font-size: 40px;
  text-decoration: none;
  font-family: "Arial", sans-serif;
`;
const LogoutButton = styled.button`
  border-radius: 6px;
  border: none;
  font-size: 12px;
  height: 40px;
  width:250px;
  color:white;
  font-family: "Arial", sans-serif;
  font-weight: bold;
  background-color: #228B22;
  cursor: pointer;
  &:hover {
    background-color: #006400;
  }
`;
const ArrowButton = styled.button`
  border-radius: 6px;
  background-color: #f5f5f5;
  border: none;
  font-size: 20px;
  width:250px;
  height: 40px;
  font-family: "Arial", sans-serif;
  cursor: pointer;
  &:hover {
    background-color: #646464;
  }
`;
const ButtonBox = styled.div`
  text-align: center;
  display: flex;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
  column-gap: 180px;
`;

const ButtonBar = ({ headText, display }) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/Main");
  };


  const onLogout =()=>{
    document.cookie = "access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
    navigate("/");
  }
  return (
    <Header>
      <ButtonBox>
        <ArrowButton onClick={goBack} style={{ display: display }}>
         🏠
        </ArrowButton>
        <MainLink>SUBSUB</MainLink>
        <LogoutButton onClick={onLogout} style={{ display: display }}>
          로그아웃
        </LogoutButton>
      </ButtonBox>
      <Title>
        <div style={{ "font-weight": "bold" }}>{headText}</div>
      </Title>
      <NavBar></NavBar>
    </Header>
  );
};

export default ButtonBar;
