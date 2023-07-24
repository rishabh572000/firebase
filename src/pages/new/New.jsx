import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { addDoc, doc, setDoc, collection, serverTimestamp } from "firebase/firestore"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form"
import { db, auth, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const New = ({ inputs, title }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate()
  const [file, setFile] = useState("");
  const [percentage, setPercentage] = useState(null)

  const onSubmit = async(data) =>{
    try{

      const res = await createUserWithEmailAndPassword(auth, data?.email, data?.password)

      await setDoc(doc(db, "users", res?.user?.uid), {
        ...data,
        timeStamp: serverTimestamp()
      });
      navigate(-1)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    const uploadFile = () =>{
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    setPercentage(progress)
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
      default:
        break;
    }
  }, 
  (error) => {
     console.log(error)
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      setValue('image', downloadURL)
    });
  }
);

    }
    file && uploadFile()
  }, [file])
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} 
                    {...register(input?.register)} />
                </div>
              ))}
              <button type="submit" disabled={percentage != null && percentage <100}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
