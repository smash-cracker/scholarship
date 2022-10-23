import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/navbar";
import ListGroup from "react-bootstrap/ListGroup";
import { db } from "../firebase";

function FetchScholarships() {
  const [scholarships, setScholarships] = useState([]);
  const collectionRef = collection(db, "scholarships");

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
      <ListGroup variant="flush">
      {scholarships.map((user) => {
        return (
            <ListGroup.Item>
              <h1>Name : {user.scholarshipName}</h1>
              <h1>Id : {user.id}</h1>
              <a href={user.img}>download</a>
              <Link to="/updateScholarship" state={{ data: user }}>
                Edit
              </Link>
            </ListGroup.Item>
        );
      })}
          </ListGroup>

    </div>
  );
}

export default FetchScholarships;
