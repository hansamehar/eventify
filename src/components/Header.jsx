import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header style={{ borderBottom: " 1px solid rgba(169, 169, 169, 0.5)" }}>
      <nav style={{ color: "#3E4A7A" }} className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <h1
            className="d-block d-lg-none"
            style={{ fontFamily: '"Great Vibes", cursive' }}
          >
            Eventify
          </h1>

          <button
            className="navbar-toggler ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/"}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/events"}>
                  Events
                </Link>
              </li>

              <li className="nav-item">
              <Link className="nav-link" to={"/about"}>
                  About
                </Link>
              </li>
            </ul>
            <h2
              className="d-none d-lg-block"
              style={{ fontFamily: '"Great Vibes", cursive' }}
            >
              Eventify
            </h2>

            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/login"}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/register"}>
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
