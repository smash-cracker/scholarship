import { v4 as uuid } from 'uuid';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import Form from 'react-bootstrap/Form';
import { db, storage } from "../firebase";
import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

const Details = ({inputs})  => {

    const [data, setData] = useState({});
      const [error, setError] = useState(false);
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
  
  
      const handleInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;
  
        setData({...data, [id]:value});
  
        console.log(data);
    }
  
      const handleSignup = (e)=> {
          e.preventDefault();
          createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      handleAdd();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
      }

      const handleAdd = async (e)  => {
        const unique_id = uuid();
        await setDoc(doc(db, "users", unique_id), {
          email : email,
            ...data,
            timestamp: serverTimestamp(),
          });
          
    }
  
    return (
      <Form onSubmit={handleSignup}>
        <input type={"text"} onChange={e=>setEmail(e.target.value)}></input>
        <input type={"password"} onChange={e=>setPassword(e.target.value)}></input>
        {inputs.map((input) => (
                  <div className="formInput" key={input.id}>
                  <input id={input.id} type={input.type} placeholder={input.placeholder} onChange={handleInput}/>
                  </div>
              ))}
        <button type='submit'>Create account</button>
      </Form>
    )
  
}


export default Details