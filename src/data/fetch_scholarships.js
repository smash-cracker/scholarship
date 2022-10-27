import { collection, getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/navbar";
import ListGroup from "react-bootstrap/ListGroup";
import { db } from "../firebase";
import './fetchscholarships.css'
import downloadicon from './filedownload.png'
import { AdminContext } from "../context/admin_context";

function FetchScholarships() {
  const [scholarships, setScholarships] = useState([]);
  const collectionRef = collection(db, "scholarships");
  const { isAdmin } = useContext(AdminContext);
  console.log(isAdmin)


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
        return (
          <div class="container_scholarship">
          <div class="blog-post">
              <div class="blog-post_img">
                  <img src="https://www.flaticon.com/free-icon/download_2989976?" alt=""/>
              </div>
              <div class="blog-post_info">
                  <div class="blog-post_date">
                      <span>{user.scholarshipName}</span>
                      <span>2 days ago</span>
                  </div>
                  <h1 class="blog-post_title">General</h1>
                  <p class="blog-post_text">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores a, tempore veniam quasi sint fugiat
                      facilis, facere, amet magnam optio velit. Laudantium et temporibus soluta, esse cupiditate aliquid
                      dicta
                      accusantium.
                  </p>
                  <a href="#" class="blog-post_cta">Download</a>
              </div>
          </div>
  
      </div>  
            // <ListGroup.Item>

            //   <div id="elementbox">
            //   <h1>{user.scholarshipName}</h1>
            //   <div id="smallbox">
            //   <a href={user.img}>download</a>
            //   {isAdmin && <Link to="/updateScholarship" state={{ data: user }}>
            //     Edit
            //   </Link>}
              
            //   </div>
            //   </div>
            // </ListGroup.Item>
        );
      })}
       

    </>
  );
}

export default FetchScholarships;
