import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth_context";
import NavBar from "../components/navbar";
import "./login.css";
import dogpaw from "./dogpaw.png";
function Login() {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const naviage = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        console.log(user)
        naviage("/about");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <>
      <NavBar />

      <div className="parent clearfix">
        <div className="bg-illustration"></div>
        <div className="login">
          <div className="container">
            <h1>
              Login to access to
              <br />
              your account
            </h1>
            <div className="login-form">
              <form onSubmit={handleLogin}>
                <input
                  type={"text"}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                ></input>
                <input
                  type={"password"}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                ></input>
                <div className="remember-form">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </div>
                <div className="forget-pass">
                  <a href="#">
                    <Link to={"/signup"}>Need an account ?</Link>
                  </a>
                </div>
                <button type="submit">LOG-IN</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
