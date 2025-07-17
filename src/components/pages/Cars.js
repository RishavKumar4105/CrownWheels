import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../Firebase";
import { ClipLoader } from "react-spinners";
export default function Cars(props) {
  const isCalled=props.isCalled
  const [selectedBrand, setSelectedBrand] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);
  const [brands,setBrands]=useState([])
   const [cars, setCars] = useState([]);
  const [load,setLoad]=useState(true)
  useEffect(() => {
    const que = query(collection(db, "brands"),where("status","==",true));
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
  useEffect(() => {
    const que = query(collection(db, "cars"),where("status","==",true));

    const unsubscribe = onSnapshot(
      que,
      (snapshot) => {
        setCars(
        snapshot.docs.map((doc) => {
          const docData = doc.data();
          return { id: doc.id, data: docData };
        }))
        setFilteredCars(
        snapshot.docs.map((doc) => {
          const docData = doc.data();
          return { id: doc.id, data: docData };
        })
      )
        
      },
      (error) => {
        console.error("Error fetching data: ", error);
      }
    );
    setTimeout(()=>{setLoad(false)},500)

    return () => unsubscribe();
  }, []);
 
  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
  };

  const handleSearch = () => {
    const filtered = selectedBrand ? cars.filter(car => car?.data?.brandName === selectedBrand) : cars;
    setFilteredCars(filtered);
  };
  return (
    
      <>
        <div className="search_section1 m-0">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="search_taital">Search Your Best Cars</h1>
                {/* select box section start */}
                <div className="container">
                  <div className="select_box_section">
                    <div className="select_box_main">
                      <div className="row">
                        <div className="col-md-3">
                          <select
                            className="custom-select "
                            value={selectedBrand}
                            onChange={handleBrandChange}
                          >
                            <option value=""  selected>
                              Any Brand
                            </option>
                            {brands?.map((brand, index) => (
                              <option key={index}  value={brand?.data?.name}>
                                {brand?.data?.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-3">
                          <div className="search_btn ">
                            <a  onClick={handleSearch}>Search Now</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* select box section end */}
              </div>
            </div>
          </div>
        </div>
        {/* gallery section start */}
       
        <div className="gallery_section layout_padding">
        <ClipLoader cssOverride={{display:"block",margin:"10vh auto"}} loading={load}/>
       
       <div className={load==true?"d-none":"container  text-capitalize"}>
            <div className="row">
              <div className="col-md-12">
                <h1 className="gallery_taital">Our best Cars</h1>
              </div>
            </div>
            <div className="gallery_section_2">
              <div className="row">
                {
                filteredCars.length > 0 ? 
                (isCalled?filteredCars.slice(0,6):filteredCars).map((car, index) => (
                  <div className="col-md-4 p-3" key={index}>
                    <div className="gallery_box">
                      <div className="gallery_img"><img src={car?.data?.image} /></div>
                      <h3 className="types_text">{car?.data?.brandName}</h3>
                      <p className="looking_text">Start per day &#8377;{car?.data?.price}</p>
                      <p className="looking_text">No. Of Seats {car?.data?.noOfSeat}</p>
                      <div className="read_bt"><Link to={"/viewcar/"+car?.id}>View</Link></div>
                    </div>
                  </div>
                ))
              :
              "No Car found"
              }
              </div>
            </div>
          </div>
        </div>
        {/* gallery section end */}
        {/* footer section start */}
      </>
    
  );
}
