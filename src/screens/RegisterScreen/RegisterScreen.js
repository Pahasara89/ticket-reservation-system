import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Row ,Card} from 'react-bootstrap';
import { Link } from "react-router-dom";
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import Loading from '../Loading/Loading';
import MainScreen from '../MainScreen';
import "./Register.css";
import { register } from '../../actions/userAction';

const RegisterScreen = () => {
   const [email, setEmail] = useState("");
   const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
   const [pic, setPic] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
   const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
   //if user enter wrong pw
   const [message, setMessage] = useState(null);
   //if user didnot choose the image
   const [picMessage, setPicMessage] = useState(null);
  
const dispatch = useDispatch();

const userRegister = useSelector((state) => state.userRegister);
const { loading, error, userInfo } = userRegister;

const navigate = useNavigate();

//redirect to order page
useEffect(() => {
  if (userInfo) {
    navigate("/register");
  }
}, [navigate,userInfo]);

const submitHandler = async (e) => {
  e.preventDefault();
  //if pw are not equal throw an error
  if (password !== confirmpassword) {
    setMessage("password do not match");
  } else {

    dispatch(register(name, password, email, phone,pic));
    alert("Successfully registered!")
    window.location.reload();
  }
};


const postDetails = (pics) => {
  if (!pics) {
    return setPicMessage("Please Select an Image");
  }

  setPicMessage(null);
  if (pics.type === "image/jpeg" || pics.type === "image/png") {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "verver_emarket");
    data.append("cloud_name", "wafra");
    fetch("https://api.cloudinary.com/v1_1/wafra/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPic(data.url.toString());
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    return setPicMessage("Please select an image ");
  }
};

 return (
   <>

    <MainScreen tittle="Let's Get Started!">
     <div className="top"  >


       <Card style={{ paddingtop: 0 }}>
         <div className="loginContainer">
           {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
           {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
           {loading && <Loading />}
           <Col md={6}>
             <Form onSubmit={submitHandler}>
               <Form.Group controlId="name">
                 <Form.Label>Name</Form.Label>
                 <Form.Control
                   className="line"
                   type="name"
                   value={name}
                   placeholder="Enter name"
                   onChange={(e) => setName(e.target.value)}
                   required
                 />
               </Form.Group>

               <Form.Group controlId="formBasicEmail">
                 <Form.Label>Email address</Form.Label>
                 <Form.Control
                   className="line"
                   type="text"
                   value={email}
                   placeholder="Enter email"
                   onChange={(e) => setEmail(e.target.value)}
                   required
                 />
               </Form.Group>

               <Form.Group controlId="formBasicPassword">
                 <Form.Label>Password</Form.Label>
                 <Form.Control
                   className="line"
                   type="password"
                   value={password}
                   placeholder="Password"
                   onChange={(e) => setPassword(e.target.value)}
                   required
                 />
               </Form.Group>

               <Form.Group controlId="confirmPassword">
                 <Form.Label>Confirm Password</Form.Label>
                 <Form.Control
                   className="line"
                   type="password"
                   value={confirmpassword}
                   placeholder="Confirm Password"
                   onChange={(e) => setConfirmPassword(e.target.value)}
                   required
                 />
               </Form.Group>

               <Form.Group controlId="formBasicPhone">
                 <Form.Label>Phone No</Form.Label>
                 <Form.Control
                   className="line"
                   type="text"
                   value={phone}
                   placeholder="Enter Phone No"
                   onChange={(e) => setPhone(e.target.value)}
                   required
                 />
               </Form.Group>

               {picMessage && (
                 <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
               )}
               <Form.Group controlId="pic">
                 <Form.Label>Profile Picture</Form.Label>
                 <div>
                   <input
                     onChange={(e) => postDetails(e.target.files[0])}
                     className="line"
                     id="custom-file"
                     type="file"
                     name="image"
                     width="500"
                     height="250"
                     class="img-thumbnail"
                     required
                   />
                 </div>
               </Form.Group>
               <br />
               <Button variant="primary" type="submit">
                 Register
               </Button>
             </Form>
             <Row className="py-3">
               <Col>
                 Have an Account ? <Link to="/login">Login</Link>
               </Col>
             </Row>
           </Col>
         </div>
       </Card>
     </div>
   </MainScreen>

   </>
 );
}

export default RegisterScreen;
