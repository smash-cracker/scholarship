import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

function Signup() {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = (e)=> {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
    }

  return (
    <Form onSubmit={handleSignup}>
      <input type={"text"} onChange={e=>setEmail(e.target.value)}></input>
      <input type={"password"} onChange={e=>setPassword(e.target.value)}></input>
      <button type='submit'>Create account</button>
    </Form>
  )
}

export default Signup