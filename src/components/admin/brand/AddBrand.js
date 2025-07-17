import React, { useState, useEffect } from "react";
import { db, storage } from "../../../Firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import {  toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { ClipLoader } from "react-spinners";
const AddBrand = () => {
  const [name, setName] = useState("");
  const [file,setFile]=useState({})
  const [fileName,setFileName]=useState("")
  const [url,setUrl]=useState("")
  const [load,setLoad]=useState(false)
  const status = true;
  const handleForm=(e)=>{
    e.preventDefault()
    setLoad(true)
    if(!fileName){
        toast.error("Please upload image")
        return ;
    }

    // Upload file and metadata to the object 'images/mountains.jpg'
    //file.name- is the useState name
    const storageRef = ref(storage, 'brand_images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
    (snapshot) => {
        console.log(snapshot);
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
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
        toast.error("something went wrong", error.code)
        
    }, 
    () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        //***store in state so that we can use it later
        setUrl(downloadURL)
        });
    }
);
   }
   useEffect(()=>{
    if(!!url){
        saveData()
    }
   },[url])
  const saveData = async (e) => {
    try {
      await addDoc(collection(db, "brands"), {
        name:name,
        logo:url,
        status:true,
        createdAt: Timestamp.now(),
      });
      setName("");
      setFile({});
      setFileName("")
      toast.success("Brand added successfully");
      setTimeout(()=>{setLoad(false)},500)
    } catch (error) {
      console.error("Error adding brand: ", error);
      toast.error("Error adding brand");
      setTimeout(()=>{setLoad(false)},500)
    }
  };

  return (
    <div className="form_main">
      <ClipLoader cssOverride={{display:"block",margin:"10vh auto"}} loading={load}/>
       
       <div className={load==true?"d-none":"container my-5 text-capitalize"}>
      <div className="add-brand-container">
        
        <h2 className="brand_h">Add New Brand</h2>
        <form onSubmit={handleForm}>
          <div className="form-group">
            <label htmlFor="name" className="lbl-brand">
              Brand Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-control"
              placeholder="Enter brand name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="logo" className="lbl-brand">
              Logo URL
            </label>
            <input
              type="file"
              id="logo"
              value={fileName}
              onChange={(e) => {setFileName(e.target.value); setFile(e.target.files[0])}}
              required
              className="form-control"
              placeholder="Enter logo URL"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AddBrand;
