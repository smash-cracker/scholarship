import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth_context";
import NavBar from "../components/navbar";
import { AdminContext } from "../context/admin_context";
function Login() {
  const naviage = useNavigate();

  const{ dispatcher } = useContext(AdminContext);
  const { currentUser } = useContext(AuthContext);
    const docRef = doc(db, "users", currentUser.uid);
    useEffect(() => {
  const handleLogin = async (e) => {
    const docSnap = await getDoc(docRef);
          console.log(docSnap.data().Role)
          if (docSnap.exists()) {
            if(docSnap.data().Role==='admin') {
              console.log("admin dispatch")
              dispatcher({ type: "ADMIN" });
            } else {
              console.log("user dispatch")
              dispatcher({ type: "NOTADMIN" });
            }
            // console.log(docSnap.data().Role)
          } 
     };
     handleLogin();
    }, []);
  return (
    <>
      <NavBar />

      
    </>
  );
}

export default Login;



















// import { doc, getDoc } from "firebase/firestore";
// import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
// import { AuthContext } from "../context/auth_context";
// import { db } from "../firebase";
// let admin=false;

// function About() {
//   const [chartData, setChartData] = useState([]);

//   const { currentUser } = useContext(AuthContext);
//   const docRef = doc(db, "users", currentUser.uid);
//   const[datas, setData] = useState()
//   const[isAdmin, setAdmin] = useState()

  // useLayoutEffect(() => {
  //   const getScholarships = async () => {
  //     const docSnap = await getDoc(docRef);
  //     console.log(docSnap.data().Role)
  //     if (docSnap.exists()) {
  //       setData(() => ({ ...docSnap.data() }));
  //       console.log(datas.Role)
  //       // console.log(docSnap.data().Role==='admin')
  //       // console.log(docSnap.data().Role)
  //     } 
      
  //   };
  //     getScholarships();
  // }, []);
//   // console.log(docChartData)
  
  
//   return (
//     <div>

//      {isAdmin ? <h1>admin</h1> : <h1>user</h1>}
//     </div>
//   );
// }

// export default About;
