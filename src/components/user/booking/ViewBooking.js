import React, { useEffect, useState } from 'react';
import { db } from '../../../Firebase'; // Adjust the path as necessary
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import {  toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

const ViewBooking = () => {
  const [bookings, setBookings] = useState([]);
let userId=sessionStorage.getItem("userId")
const [load, setLoad]=useState(true)
  useEffect(() => {
    const fetchBookings = () => {
      const bookingsCollection = query(collection(db, 'bookings'), where("userId","==",userId), orderBy("createdAt", "desc"));
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

  const formatDate = (dateTime) => {
    if (dateTime) {
      const date = dateTime?.toDate();
      return date.toLocaleString();
    }
    return "N/A";
  };

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
            Your Bookings
        </h1>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Sr. No</th>
              <th scope="col">Image</th>
              <th scope="col">Car Name</th>
              <th scope="col">Price</th>
              <th scope="col">Brand Name</th>
              <th scope="col">Date of Booking</th>
              <th>No. of Days</th>
              <th>Total</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking.id}>
                <th scope="row">{index + 1}</th>
                <td className='p-2'>
                    <img src={booking.image} style={{height:"100px",width:"100px"}}/>
                </td>
                <td>{booking.carName}</td>
                <td>&#8377;{booking.price}</td>
                <td>{booking.brandName}</td>
                <td>{booking.dateOfBooking}</td>
                <td>{booking.days}</td>
                <td>&#8377;{booking.total}</td>
                <td>{booking.status}
                    <br/>
                    {booking.status=="Completed" && !booking.isRated && <Link to={"/rate/"+booking.id} className='btn btn-outline-info'><i className='fa fa-star'> Rate Us</i></Link>}

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

export default ViewBooking;
