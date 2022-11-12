import { collection, getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/navbar";
import { db } from "../firebase";
import './fetchscholarships.css'
import { AdminContext } from "../context/admin_context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faDownload } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";

function FetchScholarships() {
  const [scholarships, setScholarships] = useState([]);
  const collectionRef = collection(db, "scholarships");
  const { isAdmin } = useContext(AdminContext);
  console.log(isAdmin)
  const navigate = useNavigate()

  const passData=()=>{
   
  }
  


  useEffect(() => {
    const getScholarships = async () => {
      const data = await getDocs(collectionRef);
      setScholarships(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getScholarships();
  }, []);
  return (
    <>
      <NavBar />
    
      {scholarships.map((user) => {
        var x = user.timestamp.seconds*1000;
        // console.log(new Date(x).getTime())
        // console.log(new Date().getTime())
        var y = new Date().getTime() - new Date(x).getTime()
        console.log(y/(1000 * 3600 * 24))
        return (
          <div class="container_scholarship">
          <div class="blog-post">
              {/* <div class="blog-post_img"> */}
                  {/* <img src="https://www.flaticon.com/free-icon/download_2989976?" alt=""/> */}
              {/* </div> */}
              <div class="blog-post_info">
                  <div class="blog-post_date">
                      <span className="scholarshipName">{user.scholarshipName}</span>
                      <span>{Math.floor(y/(1000 * 3600 * 24))} days ago</span>
                  </div>
                  <h1 class="blog-post_title">{user.category}</h1>
                  <p class="blog-post_text">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores a, tempore veniam quasi sint fugiat
                      facilis, facere, amet magnam optio velit. Laudantium et temporibus soluta, esse cupiditate aliquid
                      dicta
                      accusantium.
                  </p>
                  <a href="#" class="blog-post_cta"> <a href={user.img} download="file"><FontAwesomeIcon icon={faDownload}></FontAwesomeIcon></a> </a>
                  {isAdmin && <a class="blog-post_cta" onClick={()=>{ navigate('/updateScholarship', {state:{id:user.id}})}}><FontAwesomeIcon icon={faEdit} /></a>}
                  
                  
              </div>
          </div>
  
      </div>  
        );
      })}
       

    </>
  );
}

export default FetchScholarships;

// function UpdateScholarship(props) {

//   const location = useLocation();
//   console.log("========================",location.state.id)