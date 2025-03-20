import React, { useEffect } from "react";
import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../services/allAPI";
import { useState, useContext } from "react";
import { Authcontext } from "../context/contextAPI";

const Authentication = ({ insideRegister }) => {
  const { setUser } = useContext(Authcontext);
  const [inputdata, setInputdata] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleRegister = async () => {
    const { username, email, password } = inputdata;
    if (username && email && password) {
      try {
        const result = await registerAPI(inputdata);
        if (result.status == 200) {
          alert(`Welcome ${username},Please Login to use our services.`);
          setInputdata({ username: "", email: "", password: "" });
          navigate("/login");
        } else {
          alert(result.response.data);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("please fill the form");
    }
  };
  const handleLogin = async () => {
    const { email, password } = inputdata;
    if (email && password) {
      try {
        const result = await loginAPI(inputdata);
        if (result.status == 200) {
          sessionStorage.setItem("user", JSON.stringify(result.data.user));
          sessionStorage.setItem("token", result.data.token);
          const role = result.data.user.role;
          if (role == "user") {
            navigate("/userdashboard");
          } else if (role == "admin") {
            navigate("/admindashboard");
          }
          handlerole();
          setInputdata({ username: "", email: "", password: "" });
        } else {
          alert(result.response.data);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("please fill the form");
    }
  };
  const handlerole = () => {
    const userdata = sessionStorage.getItem("user");
    if (userdata) {
      setUser(JSON.parse(userdata));
    }
  };

  return (
    <>
      <div
        style={{
          height: "100vh",
          background: "linear-gradient(to right,rgb(154, 177, 193), #acb6e5)",
        }}
        className="d-flex justify-content-center align-items-center"
      >
        <div
          style={{ backgroundColor: "#fff" }}
          className=" rounded m-4 shadow w-75 d-flex justify-content-evenly align-items-center p-5"
        >
          <img
            className="d-none d-sm-block"
            width={400}
            src="https://images.unsplash.com/vector-1740057539094-067a39d3d92a?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <div className="d-flex flex-column justify-content-center align-items-start">
            {insideRegister ? (
              <>
                <h2
                  className="mb-4"
                  style={{
                    color: "#3E4A7A",
                    fontFamily: '"Poiret One", sans-serif',
                    fontWeight: "700",
                  }}
                >
                  Sign Up to Eventify :{" "}
                </h2>
                <TextField
                  value={inputdata?.username}
                  className="my-2"
                  size="small"
                  onChange={(e) =>
                    setInputdata({ ...inputdata, username: e.target.value })
                  }
                  id="outlined-basic"
                  label="Username"
                  variant="outlined"
                />
              </>
            ) : (
              <h2
                className="mb-4"
                style={{
                  color: "#3E4A7A",
                  fontFamily: '"Poiret One", sans-serif',
                  fontWeight: "700",
                }}
              >
                Welcome to Eventify :{" "}
              </h2>
            )}
            <TextField
              value={inputdata?.email}
              className="my-2"
              size="small"
              onChange={(e) =>
                setInputdata({ ...inputdata, email: e.target.value })
              }
              id="outlined-basic"
              label="Email"
              variant="outlined"
            />
            <TextField
              value={inputdata?.password}
              className="my-2"
              size="small"
              onChange={(e) =>
                setInputdata({ ...inputdata, password: e.target.value })
              }
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
            />
            {insideRegister ? (
              <>
                <button
                  onClick={handleRegister}
                  style={{ border: "1px solid #3E4A7A", color: "#3E4A7A" }}
                  className="btn my-2"
                >
                  Register
                </button>
                <p style={{ fontSize: "13px" }}>
                  Already a user?please
                  <Link
                    style={{ textDecoration: "none", color: "#3E4A7A" }}
                    to={"/login"}
                  >
                    Login
                  </Link>
                </p>
              </>
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  style={{ border: "1px solid #3E4A7A", color: "#3E4A7A" }}
                  className="btn my-2"
                >
                  Login
                </button>
                <p style={{ fontSize: "13px" }}>
                  Not a user?please
                  <Link
                    style={{ textDecoration: "none", color: "#3E4A7A" }}
                    to={"/register"}
                  >
                    Sign up
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Authentication;
