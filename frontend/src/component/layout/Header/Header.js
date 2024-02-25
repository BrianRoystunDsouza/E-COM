import React from "react";
import { Link } from "react-router-dom";
// import Logo from "../img/logo.png";
import { useSelector } from "react-redux";
import UserOptions from "../Header/UserOptions";

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">

          <Link to="/">
            <img src={""} alt="" />
          </Link>
        </div>
          <div className="links">
            <Link className="link" to="/">
              <h6>Home</h6>
            </Link>
            <Link className="link" to="/products">
              <h6>Products</h6>
            </Link>
            <Link className="link" to="/about">
              <h6>About</h6>
            </Link>
            {!isAuthenticated && <Link className="link" to="/login">
              <h6>Login</h6>
            </Link>}
            {isAuthenticated &&  <UserOptions user={user} />}

          </div>
      </div>
    </div>
  );
};

export default Header;
