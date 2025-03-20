import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/SideMenu.css";
import { Authcontext } from "../context/contextAPI";
import { useEffect } from "react";

const SideMenu = () => {
  const { user, setUser } = useContext(Authcontext);
  const navigate = useNavigate();

  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const logout = () => {
    sessionStorage.clear();
    setUser("");
    navigate("/");
  };

  return (
    <>
      <aside className="Sidemenu">
        <div className="nav">
          <h1
            style={{
              fontFamily: '"Great Vibes", cursive',
              color: "#3E4A7A",
            }}
          >
            E
          </h1>
          {user?.role == "user" && (
            <>
              <Link to={"/userdashboard"}>
                <box-icon
                  type={isActive("/userdashboard") ? "solid" : ""}
                  color="#3E4A7A"
                  name="home-alt-2"
                ></box-icon>
              </Link>
              <Link to={"/events"}>
                <box-icon
                  type={isActive("/events") ? "solid" : ""}
                  color="#3E4A7A"
                  name="calendar-event"
                ></box-icon>
              </Link>
              <Link to={"/bookmarks"}>
                <box-icon
                  type={isActive("/bookmarks") ? "solid" : ""}
                  color="#3E4A7A"
                  name="bookmarks"
                ></box-icon>
              </Link>
              <Link to={"/bookings"}>
                <box-icon
                  type={isActive("/bookings") ? "solid" : ""}
                  color="#3E4A7A"
                  name="barcode"
                ></box-icon>
              </Link>
            </>
          )}
          {user?.role == "admin" && (
            <>
              <Link to={"/admindashboard"}>
                <box-icon
                  type={isActive("/admindashboard") ? "solid" : ""}
                  color="#3E4A7A"
                  name="home-alt-2"
                ></box-icon>
              </Link>
              <Link to={"/events"}>
                <box-icon
                  type={isActive("/events") ? "solid" : ""}
                  color="#3E4A7A"
                  name="calendar-event"
                ></box-icon>
              </Link>
              <Link to={"/users"}>
                <box-icon
                  color="#3E4A7A"
                  type={isActive("/users") ? "solid" : ""}
                  name="group"
                ></box-icon>
              </Link>
            </>
          )}
          <Link onClick={logout}>
            <box-icon color="#3E4A7A" name="exit"></box-icon>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default SideMenu;
