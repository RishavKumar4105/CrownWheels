import { collection, query, where, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../../Firebase";
import { useState,useEffect } from "react";
export default function Brands(){
   const [brands,setBrands]=useState([])
  const [load,setLoad]=useState(true)
  useEffect(() => {
    const que = query(collection(db, "brands"), where("status","==",true));
    const unsubscribe = onSnapshot(
      que,
      (snapshot) => {
        setBrands(
        snapshot.docs.map((doc) => {
          const docData = doc.data();
          // console.log(docData);
          
          return { id: doc.id, data: docData };
        })
      )
      },
      (error) => {
        console.error("Error fetching data: ", error); // Log any errors
      }
    );
    setTimeout(()=>{setLoad(false)},500)
    return () => unsubscribe();
  }, []);
    return(
        
        <>
      { /* header section end */ }
      <div className="call_text_main py-5">
         <div className="container">
            <div className="call_taital">
               <div className="call_text"><Link to="#"><i className="fa fa-map-marker" aria-hidden="true" /><span className="padding_left_15">Location</span></Link></div>
               <div className="call_text"><Link to="#"><i className="fa fa-phone" aria-hidden="true" /><span className="padding_left_15">(+71) 8522369417</span></Link></div>
               <div className="call_text"><Link to="#"><i className="fa fa-envelope" aria-hidden="true" /><span className="padding_left_15">demo@gmail.com</span></Link></div>
            </div>
         </div>
      </div>
      { /* gallery section start */ }
      <div className="gallery_section layout_padding">
         <div className="container">
            <div className="row">
               <div className="col-md-12">
                  <h1 className="gallery_taital">Our Brands</h1>
               </div>
            </div>
          </div>
     </div>
     <div className="slider">
      <div className="slide-track">
         {/* 9 slides */}
         {brands?.map((el,index)=>(
         <div className="slide1" key={index}>
         <img className="images" src={el?.data?.logo} style={{height:"100px", width:"200px"}} />
         </div>
         ))}
    
        
         {brands?.map((el,index)=>(
         <div className="slide1" key={index}>
         <img className="images" src={el?.data?.logo} style={{height:"100px", width:"200px"}}/>
         </div>
         ))}
      </div>
     </div>
     <div className="slider1">
      <div className="slide-track">
         {/* 9 slides */}
         {brands?.map((el,index)=>(
         <div className="slide1" key={index}>
         <img className="images" src={el?.data?.logo} style={{height:"100px", width:"200px"}}/>
         </div>
         ))}
         {/* same 9 slides */}
         {brands?.map((el,index)=>(
         <div className="slide1" key={index}>
         <img className="images" src={el?.data?.logo} style={{height:"100px", width:"200px"}}/>
         </div>
         ))}
      </div>
     </div>
      </>
    )
}