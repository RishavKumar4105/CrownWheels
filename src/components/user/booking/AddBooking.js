import React, { useEffect, useState } from 'react';
import { db } from '../../../Firebase';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const AddBooking = (props) => {
  const [userName, setUserName] = useState(sessionStorage.getItem("name"));
  const [userEmail, setUserEmail] = useState(sessionStorage.getItem("email"));
  const [dateOfBooking, setDateOfBooking] = useState('');
  const [days,setDays]=useState(1)
  let carName=props.carName
  let price=props.price
  let brandName=props.brandName
  let image=props.image
  let contact=sessionStorage.getItem("contact")
  let userId=sessionStorage.getItem("userId")
  const nav=useNavigate()
  const handleAddBooking = async (e) => {
    e.preventDefault();
    let currentDate=new Date()
    let selectedDate=new Date(dateOfBooking)
    if(selectedDate<=currentDate){
      toast.error("Please select upcoming Dates")
      return;
    }
    try {
      await addDoc(collection(db, 'bookings'), {
        userId,
        userName,
        userEmail,
        contact,
        carName,
        price,
        brandName,
        image,
        dateOfBooking,
        days,
        total,
        isRated:'false',
        status: 'booked',
        createdAt: new Date(),
      });
    
      toast.success('Booking added successfully');
      setTimeout(()=>{
        nav("/booking")
        },500)
    } catch (error) {
      console.error('Error adding booking:', error);
      toast.error('Error adding booking');
    }
  };
  const [total,setTotal]=useState(props.price)
  useEffect(()=>{
    if(!!days){
      if(days>0){
        setTotal(days* price)
      }
    }
    else{
      setTotal(price)
    }
  },[days])

  return (
    <div className="add-booking-container">
      <h2>Add New Booking</h2>
      <form onSubmit={handleAddBooking}>
        <div className="form-group">
          <label htmlFor="userName">User Name</label>
          <input
            type="text"
            id="userName"
            placeholder="Add User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="userEmail">User Email</label>
          <input
            type="email"
            id="userEmail"
            placeholder="Add User Email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        
     
        <div className="form-group">
          <label htmlFor="dateOfBooking">Date of Booking</label>
          <input
            type="date"
            id="dateOfBooking"
            placeholder="Add Date of Booking"
            value={dateOfBooking}
            onChange={(e) => setDateOfBooking(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateOfBooking">No. of Days</label>
          <input
            type="number"
            id=""
            placeholder="Add number of days you need to rent car"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />
        </div>
        <h3>Total for {days? days:1} days is Rs. {total}</h3>
        <button type="submit" className="btn">Add Booking</button>
      </form>
    </div>
  );
};

export default AddBooking;
