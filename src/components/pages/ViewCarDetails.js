import { doc, getDoc, Timestamp } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { db } from "../../Firebase"
import { toast } from "react-toastify"
import { ClipLoader } from "react-spinners"
import AddBooking from "../user/booking/AddBooking"
export default function ViewCarDetails(){
  const [data,setData]=useState({})
  const [load,setLoad]=useState(true)
  const nav=useNavigate()
    const [isBooked,setIsBooked]=useState(false)
  const {id}=useParams()
  useEffect(()=>{
    getData()
  },[id])
  const getData=async ()=>{
    if(!!id){
      const docRef=doc(db,"cars",id)
      const docData=await getDoc(docRef)
      if(docData.exists()){
       setData(docData.data())

      }else{
        toast.error("No Data found!!")
      }
      setTimeout(()=>{setLoad(false)},500)
    }
    else{
      toast.error("Please choose a car")
      nav("/cars")
    }
  }
  const userId=sessionStorage.getItem("userId")
  const bookCar= (id,carName,price, image)=>{

    if(!userId){
        toast.error("Please Login!!")
        nav("/login")
    }
    else{
        setIsBooked(true)
    }
}
    return(
        <>
    <div className="search_section1 mt-5">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="search_taital">Get Best Cars</h1>
              
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
            <div className="card p-5">
                <div className="row">
                    <div className="col-lg-6">
                    <div className="product-pic-zoom">
                        <img
                        className="product-big-img"
                        src={data.image}
                        style={{height:"53vh"}}
                        alt=""
                        />
                    
                    </div>
                    </div>
                    <div className="col-lg-6 my-5">
              
                    <div className="card-body" >
                        <h1 style={{fontSize:"2rem"}}>{data?.carName}</h1>
                        <h5 style={{fontSize:"1.2rem"}}>
                        {data?.description}
                        </h5>
                        <h4 style={{fontSize:"1.5rem"}}>
                            &#8377;{data?.price} Rent Per Day
                        </h4>
                        <ul className="pd-tags">
                        <li >
                            <span style={{fontSize:"1.5rem"}}>BRAND: {data?.brandName}</span>
                        </li>
                        
                        </ul>
                        <div className="pd-share">
                        <div className="p-code" style={{fontSize:"1.5rem"}}>Sku : {id}</div>
                        <a  onClick={()=>{bookCar(id,data?.carName,data?.price, data?.image)}} className="btn btn-outline-warning">
                            Rent Now
                        </a>
                        <Link to={"/rating/"+data?.carName} className="mx-2 btn btn-info"><i className="fa fa-star"></i>Ratings</Link>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-md-8 mt-5 offset-md-2">
        {isBooked && <AddBooking carName={data.carName} price={data.price} brandName={data.brandName} image={data.image}/>}
        </div>
      </div>
    </div>
    </div>

</>

    )
}