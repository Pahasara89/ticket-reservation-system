import React from 'react'
import { Button, Container, Row } from "react-bootstrap";
import "./Landing.css";
import { useEffect } from 'react';
import Footer from '../Footer';


const LandingPage = ({history}) => {
useEffect(() => {
 
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    //history.push("/myorders");
  }
}, [history]);



  return (
    <>
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to Booking My Train </h1>
              <p className="subtitle">
                The Best Ticket Reservation system
              </p>
            </div>



            <div className="buttonContainer">
              <a href="/LoginCard">
                <Button size="lg" className="landingbutton">
                  Login
                </Button>
              </a>
              <a href="/RegisterCard">
                <Button size="lg" className="landingbutton"
                 


                >
                  Signup
                </Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
    <Footer/>
    </>
  );
};



export default LandingPage
