import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app, db } from "../../Firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
   const [load,setLoad]=useState(false)
  const navigate = useNavigate();

  const saveData = async (userId) => {
    try {
      let data = {
        name: name,
        email: email,
        contact: contact,
        address: address,
        userType: 2,
        user_id: userId,
        status: true,
        createdAt: Timestamp.now(),
      };
      await setDoc(doc(db, "users", userId), data);
      toast.success("User registered successfully");
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem("userType", 2);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
    setTimeout(()=>{
      setLoad(false)
    },500)
  };

  const handleForm = async (e) => {
    e.preventDefault();
    setLoad(true)
    const auth = getAuth(app);
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredentials.user.uid;
      saveData(userId);
    } catch (err) {
      toast.error(err.message);
    }
    setTimeout(()=>{
      setLoad(false)
    },500)
  };

  const signUpGoogle = async () => {
    setLoad(true)
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    try {
      const userCredentials = await signInWithPopup(auth, provider);
      const user = userCredentials.user;
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName || "",
        email: user.email || "",
        contact: "",
        address: "",
        userType: 2,
        user_id: user.uid,
        status: true,
        createdAt: Timestamp.now(),
      });
      toast.success("User registered successfully with Google");
      sessionStorage.setItem("name",  user.displayName );
      sessionStorage.setItem("email", user.email);
      sessionStorage.setItem("userId",  user.uid);
      sessionStorage.setItem("userType", 2);
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
    setTimeout(()=>{
      setLoad(false)
    },500)
  };

  return (
    <div className="main1">
      <ClipLoader cssOverride={{display:"block",margin:"10vh auto"}} loading={load}/>
       
       <div className={load==true?"d-none":"register"}>
        <form onSubmit={handleForm} method="post" className="form">
          <h1 className="h_style">Register Here</h1>
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <label>Contact</label>
          <input
            type="text"
            className="form-control"
            required
            pattern="[0-9]{10}"
            title="Please enter a valid contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
         
          <label>Address</label>
          <textarea
            className="form-control"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
          <button type="submit">Register</button>
          <p>Register with Google</p>
          <button
            type="button"
            className="google-reg-btn"
            onClick={signUpGoogle}
          >
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link className="color" to="/login">Login</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
