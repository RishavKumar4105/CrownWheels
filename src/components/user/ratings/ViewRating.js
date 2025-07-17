import { collection, where, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../../../Firebase";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
export default function ViewRating(){
    const [rating, setRating] = useState([]);
    const [load, setLoad]=useState(true)
    let {id}=useParams()
      useEffect(() => {
        const fetchBookings = () => {
            if(!!id){
                var ratingsCollection = query(collection(db, 'ratings'), where("carName","==",id), orderBy("createdAt", "desc"));
            }else{
                var ratingsCollection = query(collection(db, 'ratings'), orderBy("createdAt", "desc"));
            }
        
          const unsubscribe = onSnapshot(ratingsCollection, (snapshot) => {
            const fetchedBookings = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data()
            }));
            setRating(fetchedBookings);
          }, (error) => {
            console.error("Error fetching ratings: ", error);
            toast.error('Error fetching ratings');
          });
          setTimeout(()=>{setLoad(false)},500)
          return unsubscribe;
        };
    
        fetchBookings();
      }, [id]);
    return(
        <>
          {/* client section start */}
          <div className="client_section layout_padding">
          <div className="container">
          <div className="row">
            <div className="col-md-12">
                <h1 className="client_taital">What Says Customers</h1>
            </div>
        </div>
        <ClipLoader cssOverride={{display:"block",margin:"10vh auto"}} loading={load}/>
       
        <div className={load==true?"d-none":"text-capitalize"}>
            <div
              id="custom_slider"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner">
             
                    {rating.length>0?
                    rating.map((el,index)=>(
                    <div className={index==0?"carousel-item active":"carousel-item"} key={index}>
                        <div className="client_section_2" >
                        <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <div className="client_taital_box">
                            <div className="client_img">
                                <img src={el.image} />
                            </div>
                            <h3 className="moark_text text-capitalize">{el?.userName}</h3>
                            <p className="client_text text-capitalize">
                                {
                                    el?.rating==5?"⭐⭐⭐⭐⭐":
                                    el?.rating==4?"⭐⭐⭐⭐":
                                    el?.rating==3?"⭐⭐⭐":
                                    el?.rating==2?"⭐⭐":
                                    "⭐"
                                }
                                <br />
                                {el?.review}
                            </p>
                            </div>
                        </div>
                        </div>
                        </div>
                    </div>
                  ))
                  :
                  <h1 className="text-center">No ratings found!!</h1>    
                }
              </div>
              <a
                className="carousel-control-prev"
                href="#custom_slider"
                role="button"
                data-slide="prev"
              >
                <i className="fa fa-angle-left" />
              </a>
              <a
                className="carousel-control-next"
                href="#custom_slider"
                role="button"
                data-slide="next"
              >
                <i className="fa fa-angle-right" />
              </a>
            </div>
          </div>
          </div>
        </div>
        {/* client section end */}
        </>
    )
}