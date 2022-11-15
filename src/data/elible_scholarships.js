import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth_context";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NavBar from "../components/navbar";
import { faEdit, faDownload } from '@fortawesome/free-solid-svg-icons'

function RealEligibleScholarships() {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  const [scholarships, setScholarships] = useState([]);
  const collectionRef = collection(db, "scholarships");
  const docRef = doc(db, "users", currentUser.uid);
  useEffect(() => {
    const getUserData = async () => {
      const data = await getDoc(docRef);
      setUserData(data.data());
    };
    getUserData();
  }, []);
  useEffect(() => {
    const getScholarships = async () => {
      const data = await getDocs(collectionRef);
      setScholarships(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getScholarships();
  }, []);
  return (
    <div>
      <NavBar />
      {console.log("xxxxxxxxxxxxxxxxxxxxxxx",userData)}
      {scholarships.map((scholarship) => {
        var x = scholarship.timestamp.seconds*1000;
        var y = new Date().getTime() - new Date(x).getTime()
        console.log(y/(1000 * 3600 * 24))
        if (parseInt(scholarship.maxAnnualIncome) > parseInt(userData.annualIncome)) {
          if (scholarship.caste == userData.caste || scholarship.caste == "any") {
            if(scholarship.gender == userData.gender || scholarship.gender =="any") {
              console.log("included")
              console.log(scholarship);
              return (
                <div class="container_scholarship">
                <div class="blog-post">
                    {/* <div class="blog-post_img"> */}
                        {/* <img src="https://www.flaticon.com/free-icon/download_2989976?" alt=""/> */}
                    {/* </div> */}
                    <div class="blog-post_info">
                        <div class="blog-post_date">
                            <span className="scholarshipName">{scholarship.scholarshipName}</span>
                            <span>{Math.floor(y/(1000 * 3600 * 24))} days ago</span>
                        </div>
                        <h1 class="blog-post_title">{scholarship.category}</h1>
                        <p class="blog-post_text">
                           <a href={scholarship.link} target="_blank">To apply, click here</a> 
                        </p>
                        <a href="#" class="blog-post_cta"> <a href={scholarship.img} download="file"><FontAwesomeIcon icon={faDownload}></FontAwesomeIcon></a> </a>
                        {/* {isAdmin && <a class="blog-post_cta" onClick={()=>{ navigate('/updateScholarship', {state:{id:scholarship.id}})}}><FontAwesomeIcon icon={faEdit} /></a>} */}
                        
                        
                    </div>
                </div>
        
            </div>  
              );
            }
            
          }

        } else {
          console.log("Excluded")
        }
      })}
    </div>
  );
  
}

export default RealEligibleScholarships;
