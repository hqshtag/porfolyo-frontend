import React from "react";

function Navbar({ isAuth, openSignup, openLogin, logout }) {
  return (
    <nav>
      <div>
        <h3>Porfolyo</h3>
      </div>
      <>
        {!isAuth ? (
          <div>
            <button onClick={openSignup}>Inscription</button>
            <button onClick={openLogin}>Connection</button>
          </div>
        ) : (<div>
            <button onClick={logout}>logout</button>
        </div>)}
      </>
    </nav>
  );
}

export default Navbar;
