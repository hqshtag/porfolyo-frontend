import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Navbar({ isAuth, openSignup, openLogin, logout }) {
  const navigate = useNavigate()

  const goToCurrentUserProfile = () => {
    const userid = localStorage.getItem('id#username').split('#')[0];
    navigate(`/profile/${userid}`);
  }

  return (
    <Nav>
      <div>
        <Title>Porfolio</Title>
      </div>
      <>
        {!isAuth ? (
          <ButtonContainer>
            <Button onClick={openSignup}>Inscription</Button>
            <Button onClick={openLogin}>Connection</Button>
          </ButtonContainer>
        ) : (<ButtonContainer>
            <Button onClick={goToCurrentUserProfile}>Profile</Button>
            <Button onClick={logout}>Logout</Button>
        </ButtonContainer>)}
      </>
    </Nav>
  );
}

const Title = styled.h3`
  padding-left: 4px;
  color: white;
`

const Nav = styled.nav`
 display: flex;
 justify-content: space-between;
 align-items: center;
 background-color: #1c1e1f; 
 height: 60px
`

const Button = styled.button`
  padding: 8px 4px;
  margin: 4px;
  width: 110px;
  height: 30px;
  border-radius: 18px;
  color: #111111;
  background-color: #ffffff;
  line-height: 2px;
`

const ButtonContainer = styled.div`
`

export default Navbar;
