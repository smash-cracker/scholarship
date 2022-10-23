import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useContext, useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth_context';

function Login() {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const naviage = useNavigate()

    const {dispatch} = useContext(AuthContext)

    const handleLogin = (e)=> {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    dispatch({type:"LOGIN",payload:user})
    naviage("/")
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
    }

  return (
    <Form onSubmit={handleLogin}>
      <input type={"text"} onChange={e=>setEmail(e.target.value)}></input>
      <input type={"password"} onChange={e=>setPassword(e.target.value)}></input>
      <button type='submit'>Log in</button>
    </Form>
  )
}

export default Login