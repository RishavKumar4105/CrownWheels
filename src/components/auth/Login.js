import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { app, db } from "../../Firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const userId = user.uid;
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();

      if (userData) {
        if(userData.status){
        sessionStorage.setItem("name", userData.name);
        sessionStorage.setItem("email", userData.email);
        sessionStorage.setItem("userId", userData.user_id);
        sessionStorage.setItem("userType", userData.userType);

        if (userData.userType === 1) {
          navigate("/admin");
        } else if (userData.userType === 2) {
          navigate("/");
        } else {
          toast.error("Invalid user type");
        }
      }else{
        toast.error("Account is Blocked, Contact admin.")
      }
      } else {
        toast.error("No data found for this user");
      }
    } catch (err) {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="main1">
      <div className="register_padding">
        <div className="container">
          <div className="login">
            <form onSubmit={handleForm} className="form">
              <h1 className="h_style">Login</h1>
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <p>
                Don't have an account?{" "}
                <span>
                  <Link className="color" to="/register">
                    Register
                  </Link>
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
