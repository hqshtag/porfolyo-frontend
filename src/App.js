import React, { useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import AuthServices from "./services/AuthServices";
import LoginForm from "./forms/LoginForm";
import Modal from "react-modal";
import Navbar from "./components/Navbar";
import SignupForm from "./forms/SignupForm";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Portfolios from "./components/Portfolios";
import UploadPortfolioForm from "./forms/UploadPortfolioForm";
import Profile from "./components/Profile";
import styled from "styled-components";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

function App() {
  let subtitle;
  
  const knownPaths = [
    "/",
    "/profile"
  ];
  //relocate the user to landing page in any other case
  if (!knownPaths.includes(window.location.pathname) && !window.location.pathname.includes("/profile")
  ) window.location.replace("/");

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [modalView, setModalView] = React.useState(null);

  const [authenticated, setAuthenticated] = useState(false);

  const [editMode, setEditMode] = React.useState(false);


  useEffect(() => {
    (async () => {
      const response = await AuthServices.isAuthenticated();
      setAuthenticated(response.data === true);
    })();
  }, [modalView, modalIsOpen]);

  function openLoginPopup() {
    setModalView("LOGIN");
    openModal();
  }

  function openSingupPopup() {
    setModalView("SIGNUP");
    openModal();
  }

  function openEditPopup() {
    setEditMode(true);
    setModalView("SIGNUP");
    openModal();
  }


  function openNewPortfolioPopup() {
    if(authenticated) setModalView("PORTFOLIO");
    else setModalView("LOGIN");
    openModal();
  }


  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#";
  }

  function closeModal() {
    setModalView(null);
    setIsOpen(false);
  }

  function logout() {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("id#username");
    window.location.reload(false);
  }

  console.log(modalView);
  return (
    
    <div className="App">
      <Navbar
        isAuth={authenticated}
        openLogin={openLoginPopup}
        logout={logout}
        openSignup={openSingupPopup}
      />
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="AuthModal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
        {modalView === "LOGIN" && "Connection"}
        {modalView === "SIGNUP" && (editMode ? "Modifier vos cordonnées" : "Inscription")}
        {modalView === "PORTFOLIO" && "Ajouter votre portfolio"}
        </h2>
        <button onClick={closeModal}>close</button>
        {modalView === "LOGIN" && <LoginForm closeModal={closeModal} />}
        {modalView === "SIGNUP" && <SignupForm closeModal={closeModal} editMode={editMode} setEditMode={setEditMode} />}
        {modalView === "PORTFOLIO" && <UploadPortfolioForm closeModal={closeModal}/>}
      </Modal>
{/*       {authenticated && (<UploadPortfolioForm />)}
 */}       <Routes>
        <Route path="/" element={<Portfolios update={modalIsOpen} />} />
        <Route path="/profile/:id" element={ <Profile openEditPopup={openEditPopup} update={modalIsOpen}  />}/>

      </Routes>
      <FloatingActionButton
        onClick={openNewPortfolioPopup}
      >
        +
      </FloatingActionButton>
      <ToastContainer />
    </div>
  );
}

const FloatingActionButton = styled.button`
  position: fixed;
  bottom: 70px;
  right: 54px;

  height: 58px;
  width: 58px;

  border-radius: 50%;
  background-color: #1f4c;
  color: white;
  border: none;
  font-weight: 900;
  font-size: 38px;
`

export default App;
