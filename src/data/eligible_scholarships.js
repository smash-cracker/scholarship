import { collection, getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { AdminContext } from "../context/admin_context";
import { db } from "../firebase";

function EligibleScholarships() {
    const { isAdmin } = useContext(AdminContext);
    console.log(isAdmin)

    const [scholarships, setScholarships] = useState([]);
    const collectionRef = collection(db, "scholarships");

    useEffect(()=> {
        const getScholarships = async () => {
            const data = await getDocs(collectionRef);
            setScholarships(data.docs.map((doc)=>({...doc.data(), id: doc.id})));
        }
        getScholarships();
    },[])
  return (
    <div>
        {scholarships.map((user) => {
            return <div>
                <h1>Name : {user.scholarshipName}</h1>
                <h1>Id : {user.id}</h1>
                <a href={user.img}>download</a>
                <strong>{isAdmin}</strong>
        <Link to="/updateScholarship" state={{data:user}}>Edit</Link>
            </div>;
        })}
    </div>
  )
}

export default EligibleScholarships