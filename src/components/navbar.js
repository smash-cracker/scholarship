import React, { useContext } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { signOut } from "firebase/auth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Popover from "react-bootstrap/Popover";
import { auth } from "../firebase";
import "./navbar.css";
import { AuthContext } from "../context/auth_context";

function NavBar() {
  const { currentUser } = useContext(AuthContext);
  const naviagte = useNavigate();

  function signout() {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        window.location.reload();
        naviagte("/login");
      })
      .catch((error) => {});
  }
  return (
    <div id="navheader">
      <nav id="headernav">
        <div id="logotext">SCHOLARSHIPS</div>
        <ul className="nav_links">
          <li>
            <a>
              <Link to="/">Home</Link>
            </a>
          </li>
          <li>
            <a href="#">
              <Link to="/viewScholarships">Scholarships</Link>
            </a>
          </li>
          <li>
            <a href="#">
              <Link to="/about">About</Link>
            </a>
          </li>
        </ul>
        <OverlayTrigger
          trigger="click"
          key="bottom"
          placement="bottom"
          overlay={
            <Popover id={`popover-positioned-bottom`}>
              {/* <Popover.Header as="h3">{`Popover bottom`}</Popover.Header> */}
              <Popover.Body>
                <>
                  {currentUser && <strong>Profile</strong>}
                  <br />
                  <hr />
                </>
                <>
                  {currentUser && (
                    <Link to="/eligibleScholarships">
                      <strong>Eligible scholarships</strong>
                    </Link>
                  )}
                  <br />
                  <hr />
                </>
                <>
                  {currentUser && (
                    <a onClick={signout}>
                      {" "}
                      <strong>Log out</strong>
                    </a>
                  )}
                </>
              </Popover.Body>
            </Popover>
          }
        >
          {currentUser ? (
            <a variant="secondary">Account</a>
          ) : (
            <a>
              <Link to="/login">Login</Link>
            </a>
          )}
        </OverlayTrigger>
      </nav>
    </div>
  );
}

export default NavBar;
