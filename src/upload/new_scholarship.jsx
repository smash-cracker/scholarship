import { useContext, useEffect, useState } from "react"
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db, storage } from "../firebase";
import { AuthContext } from "../context/auth_context";
import { v4 as uuid } from 'uuid';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const New = ({inputs, title}) => {

    const [data, setData] = useState({});
    const [file, setFile] = useState("");
    const [percentage, setPercentage] = useState(null);
 
    const {currentUser} = useContext(AuthContext)

    useEffect(() => {
        const uploadFile = () => {
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
    file && uploadFile(); 
    },[file])

    const handleInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;

        setData({...data, [id]:value});
    }

    const handleAdd = async (e)  => {
        e.preventDefault();
        const unique_id = uuid();
        await setDoc(doc(db, "scholarships", unique_id), {
            ...data,
            timestamp: serverTimestamp(),
          });
          
    }
    return(
        <>
        <h1>{title}</h1>
        <form onSubmit={handleAdd}>
            <input type={'file'} onChange={(e)=>setFile(e.target.files[0])}/>

            {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                <input id={input.id} type={input.type} placeholder={input.placeholder} onChange={handleInput}/>
                </div>
            ))}
            <button disabled={percentage!=null && percentage<100} type="submit">add scholarship</button>
        </form>
        </>
    );
}

export default New;