import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import DeliveryHeader from './DeliveryHeader';
// import "../App.css";
// import './DownloadInvoice.css';
import {FiPrinter} from 'react-icons/fi';
import { useReactToPrint } from "react-to-print";




const UserManagement = () => {

    const [users,setUsers] = useState([]);

    const navigate = useNavigate();

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    useEffect(() =>{

        function getUsers() {
            axios.get("http://localhost:5000/api/users/view").then((res) => {
    
                setUsers(res.data);
                console.log(res.data)
            }).catch((err) => {
    
                alert(err.message);
            })
        }
    
        getUsers();
    
    }, [])

    const backHome = () => {
        navigate(-1);
    }


    return (

        <>
              <button className='btn' onClick={backHome}>Go Back</button>
              <br/>
    
              <div>
        
        <br/>
    
         <div ref={componentRef} className="info">
    
       
         <table className="table background">
         <thead>
          <tr>
            
            <th>CustomerName</th>
            <th>Email</th>
             <th>Contact Number</th>
             
           </tr>
         </thead>
        
         <tbody>
    
         {users.map(user => (

             <tr key={user._id}>
               <td className='td'>{user.name}</td>
               <td className='td'>{user.email}</td>
               <td className='td'>{user.phone}</td>
               
               
             </tr>
        
           ))}
    
         </tbody>
       </table>
    
       
    
    
    
       
       <br/><br/>
       <br/>
    
       <button onClick={handlePrint} className="print__button btn btn2"><FiPrinter/> Print </button>
    
    
       </div>
       </div>
        </>
          
          
        
      )

}

export default UserManagement;