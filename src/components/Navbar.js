import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Navbar({
  isAuth,
  openSignup,
  openLogin,
  logout,
  keyword,
  setKeyword,
}) {
  const navigate = useNavigate();

  const goToCurrentUserProfile = () => {
    const userid = localStorage.getItem("id#username").split("#")[0];
    navigate(`/profile/${userid}`);
  };

  return (
    <Nav>
      <div>
        <Title>Porfolio</Title>
      </div>
        <SearchInput
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Tapez votre recherche"
        />
      <>
        {!isAuth ? (
          <ButtonContainer>
            <Button onClick={openSignup}>Inscription</Button>
            <Button onClick={openLogin}>Connection</Button>
          </ButtonContainer>
        ) : (
          <ButtonContainer>
            <Button onClick={goToCurrentUserProfile}>Profile</Button>
            <Button onClick={logout}>Logout</Button>
          </ButtonContainer>
        )}
      </>
    </Nav>
  );
}

const SearchInput = styled.input`
  width: 270px;
  height: 42%;
  border-radius: 8px;
  padding-left: 18px;
`;

const Title = styled.h3`
  padding-left: 4px;
  color: white;
  margin-left: 36px;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1c1e1f;
  height: 60px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
`;

const Button = styled.button`
  padding: 8px 4px;
  margin: 4px 15px;
  width: 110px;
  height: 30px;
  border-radius: 18px;
  color: #111111;
  background-color: #ffffff;
  line-height: 0px;
`;

const ButtonContainer = styled.div`
  margin-right: 80px;
`;

export default Navbar;
