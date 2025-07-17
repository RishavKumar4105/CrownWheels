import React, { useState, useEffect } from "react";
import { db, storage } from "../../../Firebase";
import { updateDoc,doc, getDoc, Timestamp } from "firebase/firestore";
import {  toast } from "react-toastify";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { ClipLoader } from "react-spinners";
import { useParams, useNavigate } from "react-router-dom";
const EditBrand = () => {
    const [name,setName]=useState("")
    const [file,setFile]=useState({})
    const [fileName,setFileName]=useState("")
    const [url,setUrl]=useState("")
    const [load,setLoad]=useState(true)
    const [previousImage,setPreviousImage]=useState("")
    const {id}=useParams()
    useEffect(()=>{
        getData()
    },[])
    const getData=async ()=>{
        let docRef=doc(db,"brands",id)
        let data=await getDoc(docRef)
        if(data.exists()){
            let finalData=data.data() 
            setName(finalData.name)
            setPreviousImage(finalData.logo)
          setTimeout(()=>{
            setLoad(false)
          },500)
        }else{
            toast.error("No data found")
            setTimeout(()=>{
                setLoad(false)
              },500)
        }
       }
       const nav=useNavigate()
    const saveData=async ()=>{
        //try catch
        try{
            let data={
                name:name,
                status:true,
                createdAt:Timestamp.now()
            }
            if(!!url){
                data.logo=url
            }
            const docRef=doc(db,"brands",id)
            await updateDoc(docRef,data)
            toast.success("Brand updated successfully")
            setTimeout(()=>{
                nav("/admin/manageBrand")
            },500)
        }
        catch(err){
            toast.error("something went wrong!!")
            setTimeout(()=>{
                setLoad(false)
            },500)
        }
    }
    const handleForm=(e)=>{
        e.preventDefault()
        setLoad(true)
        if(!!fileName){
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
else{
    saveData()
}
}
       useEffect(()=>{
        if(!!url){
            saveData()
        }
       },[url])
  return (
    <div className="form_main">
      <ClipLoader cssOverride={{display:"block",margin:"10vh auto"}} loading={load}/>
       
       <div className={load==true?"d-none":"container my-5 text-capitalize"}>
      <div className="add-brand-container">
        
        <h2 className="brand_h">Edit Brand</h2>
        <img src={previousImage} style={{height:"100px", width:"100px", display:"block", margin:"2vh auto"}}/>
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

export default EditBrand;
