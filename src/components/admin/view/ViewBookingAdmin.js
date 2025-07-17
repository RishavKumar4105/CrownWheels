import React, { useEffect, useState } from 'react';
import { db } from '../../../Firebase'; // Adjust the path as necessary
import { collection, onSnapshot, orderBy, query, where, doc, updateDoc } from 'firebase/firestore';
import {  toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

const ViewBookingAdmin = () => {
  const [bookings, setBookings] = useState([]);
const [load, setLoad]=useState(true)
  useEffect(() => {
    const fetchBookings = () => {
      const bookingsCollection = query(collection(db, 'bookings'), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(bookingsCollection, (snapshot) => {
        const fetchedBookings = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setBookings(fetchedBookings);
      }, (error) => {
        console.error("Error fetching bookings: ", error);
        toast.error('Error fetching bookings');
      });
      setTimeout(()=>{setLoad(false)},500)
      return unsubscribe;
    };

    fetchBookings();
  }, []);
  const changeStatus=(id,status)=>{
    setLoad(true)
        const taskDocRef = doc(db, 'bookings', id)
        try {
            let data = {
                status:status
            }
             updateDoc(taskDocRef, data)
            toast.success("Booking Updated!!")
            setTimeout(()=>{
                setLoad(false)
            },700)
        } catch (err) {
            setTimeout(()=>{
                setLoad(false)
            },700)
            toast.error("Something went wrong!")
        }
  }


  return (
    <>
    <ClipLoader cssOverride={{display:"block",margin:"10vh auto"}} loading={load}/>
        
    <div className={load==true?"d-none":"container table-responsive text-capitalize py-5"}>
      <div className="table-responsive ">
        <h1
          className="mt-2"
          style={{
            color: "#416e96",
            fontSize: "35px",
            fontWeight: "bold",
            fontFamily: "Lucida Calligraphy",
          }}
        >
            Manage Bookings
        </h1>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Sr. No</th>
              <th scope="col">Image</th>
              <th>User Details</th>
              <th scope="col">Car Name</th>
              <th scope="col">Price</th>
              <th scope="col">Brand Name</th>
              <th scope="col">Date of Booking</th>
              <th>No. Of Days</th>
              <th>Total</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking.id}>
                <th scope="row">{index + 1}</th>
                <td className='p-2'>
                    <img src={booking.image} style={{height:"100px",width:"100px"}}/>
                </td>
                <td>{booking.userName},<br/>
                {booking.userEmail},<br/>
                {booking.contact}
                </td>
                <td>{booking.carName}</td>
                <td>{booking.price}</td>
                <td>{booking.brandName}</td>
                <td>{booking.dateOfBooking}</td>
                <td>{booking.days}</td>
                <td>&#8377;{booking.total}</td>
                <td>{booking.status}</td>
                <td>
                  {booking.status=="booked"?
                <>
                <button className='btn btn-success' onClick={()=>{
                  changeStatus(booking.id,"Approved")
                }}>Approve</button>
                <button className='btn btn-danger' onClick={()=>{
                  changeStatus(booking.id,"Declined")
                }}>Decline</button>
                </>
                :booking.status=="Approved"?
                <>
                  <button className='btn btn-info' onClick={()=>{
                  changeStatus(booking.id,"Completed")
                }}>Completed</button>
                </> 
                : 
                <>
                {booking.status}
                <br/>
                {booking.isRated &&
                <Link to={"/admin/viewrating/"+booking.id} className='btn btn-info'><i className='fa fa-star'></i>Rating</Link>
                }
                </>
                }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default ViewBookingAdmin;
