import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../Firebase";
import { toast } from "react-toastify";

export default function Header() {
  const userId=sessionStorage.getItem("userId")
  const nav=useNavigate()
  const logout=()=>{
    if(window.confirm("Do you really want to logout?")){
      auth.signOut()
      sessionStorage.clear()
      toast.success("Logout successfully")
      nav("/login")
    }
  }
  return (
    <div className="main">
      <div className="header_section position-fixed">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand text-white" href="/">
              {/* <img
                src="/assets/images/lrlogo.png"
                width="140px"
                alt="CrownWheels Logo"
              /> */}
              <i className="bi bi-car-front-fill text-light"></i>CrownWheels
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/brands">
                    Brands
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cars">
                    Cars
                  </Link>
                </li>
                {
                  !!userId && 
                  <>
                    <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Pages
                  </Link>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link className="dropdown-item" to="/booking">
                      Booking
                    </Link>
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                  </div>
                </li>
                  </>
                }
              </ul>
              {!userId?
              <ul className="navbar-nav ml-auto ">
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </ul>
              :
              <ul className="navbar-nav ml-auto ">
              <li className="nav-item">
                <a className="nav-link" onClick={logout}>
                  Logout
                </a>
              </li>
            </ul>
            }
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
