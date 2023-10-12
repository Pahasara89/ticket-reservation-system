import React from 'react'
import {useState ,useEffect} from "react"
import { useNavigate } from 'react-router-dom';
import MainScreen from '../MainScreen';
import { useDispatch, useSelector } from "react-redux";
import {Col, Row,Button,Form,Card} from 'react-bootstrap';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import Loading from '../Loading/Loading';
import { deleteProfile, updateProfile } from '../../actions/userAction';
import "./profile.css";
import axios from 'axios';
import Footer from '../Footer';
import Header from '../Header/Header';



const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
   const [phone, setPhone] = useState("");
  const [pic, setPic] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState();

  const [user, setUsers] = useState([]);

  const dispatch = useDispatch();
  //auto fill all of the fils
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  const userDelete = useSelector((state) => state.userDelete);
  const {loading: loadingDelete,error: errorDelete,success: successDelete} = userDelete;

  const deleteHandler = (_id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProfile(_id));}
      {
        navigate("/");
      }
  };

  const navigate = useNavigate();

  useEffect(() => {
      if (!userInfo) {
      //redirect to the home page
      navigate("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPhone(userInfo.phone);
      setPic(userInfo.pic);
    }
  }, [navigate, userInfo, successDelete]);

  const postDetails = (pics) => {
    if (!pics) {
      return setPicMessage("Please Select an Image");
    }

    setPicMessage(null);
    if (pics.type == "image/jpeg" || pics.type == "image/png") {
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
          setPic(data.url.toString());
          console.log(pic);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please select an image ");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword)
      dispatch(updateProfile({ name, email, password, phone,pic }));
  };
  return (
    <>
      <Header/>

      <MainScreen tittle="Edit Profile">
      <Card style={{ paddingtop: 0, paddingright: 100 }}>
        <Row className="profileContainer">
          <Col md={6}>
            {loadingDelete && <Loading />}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}

            <Form onSubmit={submitHandler}>
              {loading && <Loading />}
              {success && (<ErrorMessage variant="success"> Updated Successfully </ErrorMessage>)}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}



              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  className="line"
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  className="line"
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className="line"
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  className="line"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="phone">
                <Form.Label>Phone No</Form.Label>
                <Form.Control
                  className="line"
                  type="phone"
                  placeholder="Enter Phone No"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                ></Form.Control>
              </Form.Group>

              {picMessage && (
                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
              )}
              <Form.Group controlId="pic">
                <Form.Label>Profile Picture</Form.Label>
                <div>
                  <input
                    type="file"
                    name="image"
                    onChange={(e) => postDetails(e.target.files[0])}
                  />
                </div>
                <br />
              </Form.Group>
              <div>
                <Button type="submit" varient="primary">
                  Update
                </Button>
                <Button
                  variant="danger"
                  className="mx-2"
                  //need to add underscore
                  onClick={() => deleteHandler(userInfo._id)}
                >Delete</Button>
              </div>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={pic}
              alt={name}
              className="profilePic"
              width="400"
              height="400"
              class="rounded-circle"
            />
            
          </Col>
        </Row>
      </Card>
    </MainScreen>

    <Footer/>
    </>
  );
};

export default ProfileScreen;
