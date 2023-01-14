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
  if (!knownPaths.includes(window.location.pathname)) window.location.replace("/");

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [modalView, setModalView] = React.useState(null);

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await AuthServices.isAuthenticated();
      setAuthenticated(response.data === true);
    })();
  }, [modalView]);

  function openLoginPopup() {
    setModalView("LOGIN");
    openModal();
  }

  function openSingupPopup() {
    setModalView("SIGNUP");
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
          {modalView === "LOGIN" ? "Connection" : "Inscription"}
        </h2>
        <button onClick={closeModal}>close</button>
        {modalView === "LOGIN" ? <LoginForm closeModal={closeModal} /> : <SignupForm closeModal={closeModal} />}
      </Modal>
      <Portfolios />
      {authenticated && (<UploadPortfolioForm />)}
      
     {/*  <Routes>
        <Route path="/" element={<Portfolios />} />
        <Route path="/profile" element={ <Profile />}/>
      </Routes> */}
      <ToastContainer />
    </div>
  );
}

export default App;
