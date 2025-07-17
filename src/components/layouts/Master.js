import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function Master(){
    return(
        <>
        <Header/>
        <div className="main py-5 ">
        <Outlet/>
        </div>
        <Footer/>
        </>
    )
}