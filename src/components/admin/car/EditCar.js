import React, { useState, useEffect } from 'react';
import { db, storage } from '../../../Firebase';
import { collection, addDoc, Timestamp, query, doc, getDoc, orderBy, where, onSnapshot, updateDoc } from 'firebase/firestore';
import {  toast } from 'react-toastify';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { ClipLoader } from 'react-spinners';
import { useParams, useNavigate } from 'react-router-dom';
import { logDOM } from '@testing-library/react';

const EditCar = () => {
  const [load,setLoad]=useState(true)
  const [url,setUrl]=useState("")
  const [brandName, setBrandName] = useState('');
  const [carName, setCarName] = useState('');
  const [price, setPrice] = useState('');
  const [seat,setSeat]=useState(2)
  const [description, setDescription] = useState('');
  const [file,setFile]=useState({})
  const [fileName,setFileName]=useState("")
  const [allBrand,setAllBrand]=useState([])
  const [previousImage,setPreviousImage]=useState("")
  const {id}=useParams()
  const nav=useNavigate()
  useEffect(()=>{
      getData()
  },[])
  const getData=async ()=>{
      let docRef=doc(db,"cars",id)
      let data=await getDoc(docRef)
      if(data.exists()){
          let finalData=data.data() 
          setBrandName(finalData.brandName)
          setCarName(finalData.carName)
          setDescription(finalData.description)
          setPrice(finalData.price)
          setSeat(finalData.seat)
          setPreviousImage(finalData.image)
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
  useEffect(() => {
    const que = query(collection(db, "brands"));
    const unsubscribe = onSnapshot(
      que,
      (snapshot) => {
        const fetchedData = snapshot.docs.map((doc) => {
          const docData = doc.data();
          return { id: doc.id, data: docData };
        });
        setAllBrand(fetchedData);
      },
      (error) => {
        console.error("Error fetching data: ", error); // Log any errors
      }
    );
    setTimeout(()=>{setLoad(false)},500)
    return () => unsubscribe();
  }, []);
 
  const handleForm=(e)=>{
    e.preventDefault()
    setLoad(true)
    if(!fileName){
        saveData()
    }else{
    const storageRef = ref(storage, 'car_images/' + file.name);
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
   }
   const saveData=async ()=>{
    try{
        let data={
          brandName:brandName,
          carName:carName,
          price:price,
          description:description,
          noOfSeat:seat,
          status:true,
          createdAt:Timestamp.now()
        }
        if(!!url){
            data.image=url
        }
        
        const docRef=doc(db,"cars",id)
        await updateDoc(docRef,data)
        toast.success("Data Updated")
      
        setTimeout(()=>{nav("/admin/managecar")},500)
    }
    catch(err){
        console.log(err);
        
        toast.error("Something went wrong")
        setTimeout(()=>{setLoad(false)},500)
    }
   }
   useEffect(()=>{
    if(!!url){
        saveData()
    }
   },[url])

  return (
    <div className='form_main'>
       <ClipLoader cssOverride={{display:"block",margin:"10vh auto"}} loading={load}/>
       
       <div className={load==true?"d-none":"container my-5 text-capitalize"}>
      <div className="add-brand-container">
        <h2 className='brand_h'>Edit Car</h2>
        <form onSubmit={handleForm}>
          <div className="form-group">
            <label htmlFor="brandName" className="lbl-brand">Brand Name</label>
            <select className='custom-select' required  value={brandName} onChange={(e)=>{setBrandName(e.target.value)}}>
              <option value={""} selected disabled>Choose Brand</option>
              {allBrand?.map((el,index)=>(
                  <option key={index}>{el?.data?.name}</option>
              ))}
          </select>
          </div>
          <div className="form-group">
            <label htmlFor="carName" className="lbl-brand">Car Name</label>
            <input
              type="text"
              id="carName"
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
              required
              className="form-control"
              placeholder="Enter car name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price" className="lbl-brand">Price</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="form-control"
              placeholder="Enter Price"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price" className="lbl-brand">Seats</label>
            <input
              type="number"
              id="price"
              min={2}
              max={20}
              value={seat}
              onChange={(e) => setSeat(e.target.value)}
              required
              className="form-control"
              placeholder="Enter number of Seats"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price" className="lbl-brand">Image</label>
            <input
              type="file"
              id="price"
              value={fileName}
              onChange={(e) => {setFileName(e.target.value); setFile(e.target.files[0])}}
              
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="lbl-brand">Description</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => {setDescription(e.target.value)}}
              required
              className="form-control"
              placeholder="Enter description"
            />
          </div>  
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
      </div>
    </div>
  );
};

export default EditCar;
