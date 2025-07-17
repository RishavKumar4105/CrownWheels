import React, { Profiler } from "react";
import About from "./components/pages/About";
import Home from "./components/pages/Home";
import Client from "./components/pages/Client";
import ContactUs from "./components/pages/ContactUs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Master from "./components/layouts/Master";
import Register from "./components/auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/auth/Login";
import Brands from "./components/pages/Brands";
import Cars from "./components/pages/Cars";
import AdminMaster from "./components/layouts/AdminMaster";
import AdminWelcome from "./components/pages/AdminWelcome";
import AddBrand from "./components/admin/brand/AddBrand";
import AddBooking from "./components/user/booking/AddBooking";
import AddRating from "./components/user/ratings/AddRating";
import ViewUser from "./components/admin/view/ViewUser";
import ManageBrand from "./components/admin/brand/ManageBrand";
import AddCar from "./components/admin/car/AddCar";
import ManageCar from "./components/admin/car/ManageCar";
import ViewBooking from "./components/user/booking/ViewBooking";
import UserProfile from "./components/user/pages/UserProfile";

import EditBrand from "./components/admin/brand/EditBrand";
import EditCar from "./components/admin/car/EditCar";
import ViewCarDetails from "./components/pages/ViewCarDetails";
import ViewBookingAdmin from "./components/admin/view/ViewBookingAdmin";
import ViewRating from "./components/user/ratings/ViewRating";
import ViewRatingAdmin from "./components/admin/view/ViewRatingAdmin";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Master />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About/>} />
            <Route path="/client" element={<Client />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/userprofile" element={<UserProfile/>}/>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/viewcar/:id" element={<ViewCarDetails/>}/>
            <Route path="/booking" element={<ViewBooking/>}/>
            <Route path="/rate/:id" element={<AddRating/>}/>
            <Route path="/rating" element={<ViewRating/>}/>
            <Route path="/rating/:id" element={<ViewRating/>}/>
            <Route path="/profile" element={<UserProfile/>}/>
            {/* <Route path="/book/:id" element={<AddBooking/>}/> */}
          </Route>
   

          <Route path="/admin" element={<AdminMaster />}>
          {/* <Route index element={<AdminWelcome />} />  */}
            <Route path="/admin" element={<AdminWelcome />} />
            <Route path="/admin/addbrand" element={<AddBrand/>}/>
            <Route path="/admin/addcar" element={<AddCar/>}/>
            <Route path="/admin/managecar" element={<ManageCar/>}/>
            <Route path="/admin/managebrand" element={<ManageBrand/>}/>
            <Route path="/admin/addbooking" element={<AddBooking/>}/>
            <Route path="/admin/addrating" element={<AddRating/>}/>
            <Route path="/admin/viewuser" element={<ViewUser/>}/>
            <Route path="/admin/viewbooking" element={<ViewBookingAdmin/>}/>
            <Route path="/admin/editBrand/:id" element={<EditBrand/>}/>
            <Route path="/admin/editCar/:id" element={<EditCar/>}/>
            <Route path="/admin/viewrating/:id" element={<ViewRatingAdmin/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}
export default App;
