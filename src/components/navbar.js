import React from 'react'
import icon from './navicon.png'
import { MdAccountCircle } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { signOut } from "firebase/auth";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Popover from 'react-bootstrap/Popover';
import { auth } from '../firebase';
import './navbar.css'

function NavBar() {

    function signout() {
        signOut(auth).then(() => {
            localStorage.removeItem('user');
            <Navigate to={"/login"}/>;
          }).catch((error) => {
            // An error happened.
          });
          
    }
  return (
    <div id='navheader'>
        <nav id='headernav'>
        <div id='logotext'>SCHOLARSHIPS</div>
            <ul className='nav_links'>
                <li><a href='#'>Home</a></li>
                <li><a href='#'><Link to="/viewScholarship">Scholarships</Link></a></li>
                <li><a href='#'>About</a></li>
            </ul>
            <OverlayTrigger
          trigger="click"
          key="bottom"
          placement="bottom"
          overlay={
            <Popover id={`popover-positioned-bottom`}>
              {/* <Popover.Header as="h3">{`Popover bottom`}</Popover.Header> */}
              <Popover.Body>
                <strong>Profile</strong> <br></br>
              <a onClick={signout}>Log out</a>
              <Link to="/eligibleScholarships">Eligible scholarships</Link>
              </Popover.Body>
            </Popover>
          }
        >
          <a variant="secondary">Account</a>
        </OverlayTrigger>

        </nav>
    </div>
  )
}

export default NavBar