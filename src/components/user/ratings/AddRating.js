import React, { useState, useEffect } from 'react';
import { db } from '../../../Firebase';
import { collection, addDoc, Timestamp, doc, getDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
const AddRating = () => {
  const [data,setData]=useState({})
  const [load,setLoad]=useState(true)
  const {id}=useParams()
  const nav=useNavigate()
  useEffect(()=>{
    getData()
  },[id])
  const getData=async ()=>{
    if(!!id){
      const docRef=doc(db,"bookings",id)
      const docData=await getDoc(docRef)
      if(docData.exists()){
       setData(docData.data())
      }else{
        toast.error("No Data found!!")
      }
      setTimeout(()=>{setLoad(false)},500)
    }
    else{
      toast.error("Please choose a booking to rate")
      nav("/booking")
    }
  }
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const handleAddRating = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'ratings'), {
        carName:data.carName,
        userName:data.userName,
        email:data.userEmail,
        brandName:data.brandName,
        bookingId:id,
        dateOfBooking:data.dateOfBooking,
        image:data.image,
        rating,
        review,
        status:true,
        createdAt: Timestamp.now(), 
      });
      setRating('');
      setReview('');
      await updateDoc(doc(db,"bookings",id),{isRated:true})
      toast.success('Rating added successfully');
    } catch (error) {
      console.error('Error adding rating:', error);
      toast.error('Error adding rating');
    }
  };

  return (
    <div className="add-rating-container py-5">
        <ClipLoader cssOverride={{display:"block",margin:"10vh auto"}} loading={load}/>
       
       <div className={load==true?"d-none":"container  text-capitalize"}>
          <h2>Add New Rating</h2>
          <form onSubmit={handleAddRating}>
        
            <div className="form-group">
              <label htmlFor="rating">Rating</label>
              <input
                type="number"
                id="rating"
                placeholder="Add Rating (1-5)"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                min="1"
                max="5"
              />
            </div>
            <div className="form-group">
              <label htmlFor="review">Review</label>
              <textarea
                id="review"
                placeholder="Add Review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </div>
            
            <button type="submit" className="btn">Submit</button>
          </form>
        </div>
    </div>
  );
};

export default AddRating;
