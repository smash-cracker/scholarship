import { useContext, useEffect, useState } from "react"
import { updateDoc, doc, serverTimestamp, collection } from 'firebase/firestore';
import { db, storage } from "../firebase";
import { AuthContext } from "../context/auth_context";
import NavBar from "../components/navbar";
import { v4 as uuid } from 'uuid';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useLocation } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

function UpdateScholarship({inputs, title}, props) {

  const location = useLocation();
  console.log("========================",location.state.id)

  const [data, setData] = useState({});
    const [file, setFile] = useState("");
    const [percentage, setPercentage] = useState(null);
 
    const {currentUser} = useContext(AuthContext)



    useEffect(() => {

      const updateFile = () => {
          const img_unique_id = uuid();
          const storageRef = ref(storage, img_unique_id);

          const uploadTask = uploadBytesResumable(storageRef, file);

uploadTask.on('state_changed', 
(snapshot) => {
  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log('Upload is ' + progress + '% done');
  setPercentage(progress);
  switch (snapshot.state) {
    case 'paused':
      console.log('Upload is paused');
      break;
    case 'running':
      console.log('Upload is running');
      break;
  }
}, 
(error) => {
  console.log(error);
}, 
() => {
  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    setData((prev)=>({...prev, img:downloadURL}))
  });
}
);

      };
  file && updateFile(); 
  },[file])

  const handleInput = (e) => {
      const id = e.target.id;
      const value = e.target.value;

      setData({...data, [id]:value});
      console.log(data);
  }

  const handleUpdate = async (e)  => {
      const userDoc = doc(db, "scholarships", location.state.id);
      e.preventDefault();
      await updateDoc(userDoc, data);
        
  }
  return(
      <>
        <NavBar />
        <div className="formcenter">
      <Form onSubmit={handleUpdate}>
        <input type={"file"} onChange={(e) => setFile(e.target.files[0])} />

        {inputs.map((input) => (
          <Form.Group
            className="mb-3"
            controlId="formBasicEmail"
            key={input.id}
          >
            <Form.Control
              id={input.id}
              type={input.type}
              placeholder={input.placeholder}
              onChange={handleInput}
            />
          </Form.Group>

          // <div className="formInput" key={input.id}>
          // <input id={input.id} type={input.type} placeholder={input.placeholder} onChange={handleInput}/>
          // </div>
        ))
        }

<select>
          <option>General</option>
          <option>EWS</option>
          <option>SC</option>
          <option>ST</option>
        </select><br></br>

        

        <Button
          disabled={percentage != null && percentage < 100}
          variant="primary"
          type="submit"
        >
          Add scholarship
        </Button>
      </Form>
      </div>
      </>
  );

}

// const UpdateScholarship = ({inputs, title}, props) => {

//     const location = useLocation();
//     console.log(props, "props");
//     const sData = location.state.data;
//     console.log("x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x"+sData)
    

// }

export default UpdateScholarship;