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
const ManageBrand = () => {
  const [data, setData] = useState([]);
  const [load,setLoad]=useState(true)
  useEffect(() => {
    const que = query(collection(db, "brands"));
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
        console.error("Error fetching data: ", error); // Log any errors
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
    setLoad(true)
    try {
      const docRef = doc(db, "brands", id);
      const newStatus = !currentStatus;
      await updateDoc(docRef, { status: newStatus });
      toast.success(`Brand ${newStatus ? "activated" : "deactivated"} successfully!`);
    } catch (error) {
      console.error("Error updating status: ", error);
      toast.error("Error updating status. Please try again.");
    }
    setTimeout(()=>{
      setLoad(false)
    },500)
  };

  return (
    <>
      <ClipLoader cssOverride={{display:"block",margin:"10vh auto"}} loading={load}/>
        
      <div className={load==true?"d-none":"container table-responsive my-5 text-capitalize"}>
        
        <div className=" my-5">
          <h1
            className="mt-5"
            style={{
              color: "#416e96",
              fontSize: "35px",
              fontWeight: "bold",
              fontFamily: "Lucida Calligraphy",
            }}
          >
            Manage Brands
          </h1>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Sr. No</th>
                <th scope="col">Name</th>
                <th scope="col">Logo</th>
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
                    <td>{el?.data?.name || "N/A"}</td>
                    <td>
                      {el?.data?.logo ? (
                        <img src={el.data.logo} alt={el.data.name} width="50" />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td>{el?.data?.status ? "Active" : "Inactive"}</td>
                    <td>{formatDate(el?.data?.createdAt)}</td>
                    <td>
                      <Link to={"/admin/editBrand/"+el?.id}
                        className="btn btn-success btn-sm m-sm-1"
                       
                      >
                        <i className="fa fa-edit"></i>
                      </Link>
                      <button
                        className={`btn btn-${
                          el?.data?.status ? "danger" : "success"
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
                  <td colSpan="6" className="text-center">
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
export default ManageBrand;
