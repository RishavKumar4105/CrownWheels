import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { db } from "../../../Firebase"
import { toast } from "react-toastify"
import { ClipLoader } from "react-spinners"
export default function UserProfile(){
  const [data,setData]=useState({})
  const [load,setLoad]=useState(true)
  const nav=useNavigate()
  const userId=sessionStorage.getItem("userId")
  useEffect(()=>{
    getData()
  },[userId])
  const getData=async ()=>{
    if(!!userId){
      const docRef=doc(db,"users",userId)
      const docData=await getDoc(docRef)
      if(docData.exists()){
       setData(docData.data())

      }else{
        toast.error("No Data found!!")
      }
      setTimeout(()=>{setLoad(false)},500)
    }
    else{
      toast.error("Please login")
      nav("/login")
    }
  }

    return(
        <>
    <div className="search_section1 m-0 ">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="search_taital">Profile</h1>
              
              </div>
            </div>
          </div>
        </div>
        {/* gallery section start */}
       
        <div className="gallery_section layout_padding">
        <ClipLoader cssOverride={{display:"block",margin:"10vh auto"}} loading={load}/>
       
        <div className={load==true?"d-none":"container text-capitalize"}>
        <div className="row">
     
        <div className="col-lg-10  offset-md-1">
          <div className="row">
            <div className="col-md-6 offset-md-3 text-center">
                <div className="client_taital_box p-5">
                  <h1>{data.name}</h1>
                  <p>Email: {data.email}</p>
                  <p>Contact: {data.contact}</p>
                  <p>Address: {data.address}, {data.city}</p>
                </div>
            </div>
          </div>
        </div>
     
      </div>
    </div>
    </div>

</>

    )
}