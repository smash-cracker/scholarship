import { useContext, useEffect, useState } from "react";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase";
import { AuthContext } from "../context/auth_context";
import NavBar from "../components/navbar";
import { v4 as uuid } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Button, Form } from "react-bootstrap";
import './new_scholarship.css'
import add from '../assets/add.svg'

const New = ({ inputs, title }) => {
  const [data, setData] = useState({});
  const [file, setFile] = useState("");
  const [percentage, setPercentage] = useState(null);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const uploadFile = () => {
      const img_unique_id = uuid();
      const storageRef = ref(storage, img_unique_id);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPercentage(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });

    console.log(data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const unique_id = uuid();
    await setDoc(doc(db, "scholarships", unique_id), {
      ...data,
      timestamp: serverTimestamp(),
      id:unique_id,
    });
  };
  return (
    <>
      <NavBar />
      {/* <form onSubmit={handleAdd}>
            <input type={'file'} onChange={(e)=>setFile(e.target.files[0])}/>

            {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                <input id={input.id} type={input.type} placeholder={input.placeholder} onChange={handleInput}/>
                </div>
            ))}
            

            <button disabled={percentage!=null && percentage<100} type="submit">add scholarship</button>
        </form> */}
    <div className="addbg">
      <img src={add} alt="" />
    </div>

    <div className="formcenter">
      <Form onSubmit={handleAdd}>
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
};

export default New;
