import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  updateDoc,
  query,
} from "firebase/firestore";
import { db } from "../../../Firebase";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const ManageCar = () => {
  const [data, setData] = useState([]);
  const [load,setLoad]=useState(true)
  useEffect(() => {
    const que = query(collection(db, "cars"));

    const unsubscribe = onSnapshot(
      que,
      (snapshot) => {
        const fetchedData = snapshot.docs.map((doc) => {
          const docData = doc.data();
          return { id: doc.id, data: docData };
        });
        setData(fetchedData);
      },
      (error) => {
        console.error("Error fetching data: ", error);
      }
    );
    setTimeout(()=>{setLoad(false)},500)

    return () => unsubscribe();
  }, []);

  const formatDate = (timestamp) => {
    if (timestamp) {
      const date = timestamp.toDate();
      return date.toLocaleString();
    }
    return "N/A";
  };

  const handleStatusToggle = async (id, currentStatus) => {
    try {
      const docRef = doc(db, "cars", id);
      const newStatus = !currentStatus;
      await updateDoc(docRef, { status: newStatus });
      toast.success(`Car ${newStatus ? "enabled" : "disabled"} successfully!`);
    } catch (error) {
      console.error("Error updating status: ", error);
      toast.error("Error updating status. Please try again.");
    }
  };

  return (
    <>
    <ClipLoader cssOverride={{display:"block",margin:"10vh auto"}} loading={load}/>
        
    <div className={load==true?"d-none":"container table-responsive my-5 text-capitalize"}>
      <div className="table-responsive my-5">
        <h1
          className="mt-2"
          style={{
            color: "#416e96",
            fontSize: "35px",
            fontWeight: "bold",
            fontFamily: "Lucida Calligraphy",
          }}
        >
          Manage Cars
        </h1>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Sr. No</th>
              <th scope="col">Image</th>
              <th scope="col">Brand Name</th>
              <th scope="col">Car Name</th>
              <th scope="col">Price</th>
              <th scope="col">Description</th>
              <th scope="col">Status</th>
              <th scope="col">Created At</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((el, index) => (
                <tr key={el.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{el?.data?.brandName || "N/A"}</td>
                  <td className="p-2">
                    <img src={el?.data?.image} style={{height:"100px",width:"100px"}}/>
                  </td>
                  <td>{el?.data?.carName || "N/A"}</td>
                  <td>&#8377;{el?.data?.price || "N/A"}</td>
                  <td>
                    No. of Seat- {el?.data?.noOfSeat}<br/>
                    {el?.data?.description || "N/A"}</td>
                  <td>{el?.data?.status ? "Active" : "Inactive"}</td>
                  <td>{formatDate(el?.data?.createdAt)}</td>
                  <td>
                    <Link to={"/admin/editCar/"+el?.id} className="btn btn-outline-success">
                      <i className="fa fa-edit"></i>
                    </Link>
                    <button
                      className={`btn btn-${
                        el?.data?.status ? "warning" : "success"
                      } btn-sm m-sm-1`}
                      onClick={() =>
                        handleStatusToggle(el.id, el?.data?.status)
                      }
                    >
                      {el?.data?.status ? "Disable" : "Enable"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default ManageCar;
