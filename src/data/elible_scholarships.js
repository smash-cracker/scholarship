import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth_context";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

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
      {scholarships.map((scholarship) => {
        if(parseInt(scholarship.maxAnnualIncome)>parseInt(userData.annualincome)){
            console.log(scholarship);
            return (
                <div>
                  <h1>Name : {scholarship.scholarshipName}</h1>
                  <h1>Id : {scholarship.id}</h1>
                  <a href={scholarship.img}>download</a>
                  <Link to="/updateScholarship" state={{ data: scholarship }}>
                    Edit
                  </Link>
                </div>
              );
        }
      })}
    </div>
  );
}

export default RealEligibleScholarships;
