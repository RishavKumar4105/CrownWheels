import React, { useEffect, useState } from 'react';
import { db } from '../../../Firebase'; // Adjust the path as necessary
import { collection, onSnapshot, doc, updateDoc, query, where } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
const ViewUser = () => {
  const [users, setUsers] = useState([]);
  const [load,setLoad]=useState(true)
  useEffect(() => {
    const fetchUsers = () => {
      const usersCollection = query(collection(db, 'users'),where("userType","!=",1));
      const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
        const fetchedUsers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(fetchedUsers);
      }, (error) => {
        console.error("Error fetching users: ", error);
        toast.error('Error fetching users');
      });
      setTimeout(()=>{setLoad(false)},500)
      return unsubscribe;
    };

    fetchUsers();
  }, []);
  const blockUser=async (id, status)=>{
    if(window.confirm(`You are about to ${status==true?"Unblock":"Block"} User?`)){
      setLoad(true)
      try{      
       await updateDoc(doc(db,"users",id),{status:status})
        toast.success(`User ${status==true?"Unblocked":"Blocked"}  successfully`)
        setTimeout(()=>{
          setLoad(false)
        },1000)
      }
      catch(err){
        toast.error("Something went wrong")
        setTimeout(()=>{
          setLoad(false)
        },1000)
      }
    }
  }

  return (
    <div className='table_main mx-auto'>
      <ClipLoader cssOverride={{display:"block",margin:"10vh auto"}} loading={load}/>
       
       <div className={load==true?"d-none":"container table-responsive my-3 text-capitalize"}>
      <h1 className="mt-2" 
        style={{ color: '#416e96', fontSize: '35px', fontWeight:'bold',fontFamily:'Lucida Calligraphy' }}>
          View Users</h1>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Sr. No</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Contact</th>
              <th scope="col">Address</th>
              <th>Status</th>
              <th scope="col">Created At</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.contact}</td>
                <td>{user.address}</td>
                <td>{user?.status?"Active":"In-Active"}</td>
                <td>{user.createdAt?.toDate().toLocaleString()}</td>
                <td>
                  {user?.status?
                  <button className="btn btn-outline-danger" onClick={
                    ()=>{
                      blockUser(user.id, false)
                    }
                  }>
                    Block
                  </button>
                  :
                  <button className="btn btn-outline-success" onClick={
                      ()=>{
                        blockUser(user.id, true)
                      }
                    }>
                      Unblock
                    </button>
                  }
                  </td> 
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewUser;
