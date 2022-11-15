import { doc, Firestore, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth_context";
import { setDoc, serverTimestamp } from "firebase/firestore";
import NavBar from "../components/navbar";
import { AdminContext } from "../context/admin_context";
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import ChatRoom from "./chatroom";


function Contact() {
  const [state, setState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [user] = useAuthState(auth)

  const { name, email, subject, message } = state;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      toast.error("Provide value in all input field");
    } else {
      await setDoc(doc(db, "feedbacks", email), {
        ...state,
        timestamp: serverTimestamp(),
      });
      toast.success("We'll get back to you soon");
    }
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <>
    <NavBar></NavBar>
    
    <>
    {user && <ChatRoom/>}

    </>
    <section className="contact-section">
      <div className="container">
        {/* <ToastContainer position="top-center" /> */}
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="wrapper">
              <div className="row no-gutters">
                <div className="col-md-6">
                  <div className="contact-wrap w-100 p-lg-5 p-4">
                    <h3 className="mb-4">Send us a message</h3>
                    <form
                      id="contactForm"
                      className="contactForm"
                      onSubmit={handleSubmit}
                    >
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              placeholder="Name"
                              onChange={handleInputChange}
                              value={name}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              placeholder="Email"
                              onChange={handleInputChange}
                              value={email}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              name="subject"
                              placeholder="Subject"
                              onChange={handleInputChange}
                              value={subject}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <textarea
                              type="text"
                              className="form-control"
                              name="message"
                              placeholder="Message"
                              cols="30"
                              rows="6"
                              onChange={handleInputChange}
                              value={message}
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <input
                              type="submit"
                              value="Send Message"
                              className="btn btn-primary"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-md-6 d-flex align-items-stretch">
                  <div className="info-wrap w-100 p-lg-5 p-4 img">
                    <h3>Contact us</h3>
                    <p className="mb-4">
                      We're open for any suggestion or just to have a chat
                    </p>
                    <div className="dbox w-100 d-flex align-items-start">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-map-marker"></span>
                      </div>
                      <div className="text pl-3">
                        <p>
                          <span>Address:</span> College of Engineering
                          Thiruvananthapuram
                        </p>
                      </div>
                    </div>
                    <div className="dbox w-100 d-flex align-items-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-phone"></span>
                      </div>
                      <div className="text pl-3">
                        <p>
                          <span>Phone:</span>
                          <a href="tel://123456789"> 7898563248</a>
                        </p>
                      </div>
                    </div>
                    <div className="dbox w-100 d-flex align-items-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-paper-plane"></span>
                      </div>
                      <div className="text pl-3">
                        {/* <p>
                          <span>Email:</span>
                          <a href="mailto:info@yoursite.com">
                            cetscholarships@gmail.com
                          </a>
                        </p> */}
                      </div>
                    </div>
                    <div className="dbox w-100 d-flex align-items-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-globe"></span>
                      </div>
                      <div className="text pl-3">
                        <p>
                          <span>Website:</span>
                          <a href="https://www.cet.ac.in/" target={"_blank"}>college website</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
    
  );
}


function chatRoom() {
  const messageRef = Firestore.collection('feedbacks').doc()
}


export default Contact

// function Login() {
//   const naviage = useNavigate();

//   const{ dispatcher } = useContext(AdminContext);
//   const { currentUser } = useContext(AuthContext);
//     const docRef = doc(db, "users", currentUser.uid);
//     useEffect(() => {
//   const handleLogin = async (e) => {
//     const docSnap = await getDoc(docRef);
//           console.log(docSnap.data().Role)
//           if (docSnap.exists()) {
//             if(docSnap.data().Role==='admin') {
//               console.log("admin dispatch")
//               dispatcher({ type: "ADMIN" });
//             } else {
//               console.log("user dispatch")
//               dispatcher({ type: "NOTADMIN" });
//             }
//             // console.log(docSnap.data().Role)
//           } 
//      };
//      handleLogin();
//     }, []);
//   return (
//     <>
//       <NavBar />

      
//     </>
//   );
// }

// export default Login;



















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
