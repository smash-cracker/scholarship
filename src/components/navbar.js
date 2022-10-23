import React from 'react'
import './navbar.css'
import icon from './navicon.png'
import { MdAccountCircle } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { signOut } from "firebase/auth";
import { Navigate, useNavigate } from 'react-router-dom';
import Popover from 'react-bootstrap/Popover';
import { auth } from '../firebase';

function NavBar() {

    function signout() {
        signOut(auth).then(() => {
            localStorage.removeItem('user');
            <Navigate to={"/login"}/>
          }).catch((error) => {
            // An error happened.
          });
          
    }
  return (
    <header>
        <img src={icon} className='logo' alt='logo'></img>
        <nav>
            <ul className='nav_links'>
                <li><a href='#'>Home</a></li>
                <li><a href='#'>Scholarships</a></li>
                <li><a href='#'>About</a></li>
            </ul>
        </nav>
        <>
        <OverlayTrigger
          trigger="click"
          key="bottom"
          placement="bottom"
          overlay={
            <Popover id={`popover-positioned-bottom`}>
              {/* <Popover.Header as="h3">{`Popover bottom`}</Popover.Header> */}
              <Popover.Body>
                <strong>profile</strong> <br></br>
              <button onClick={signout}>log out</button>
              </Popover.Body>
            </Popover>
          }
        >
          <Button variant="secondary">Account</Button>
        </OverlayTrigger>
    </>
    </header>
  )
}

export default NavBar