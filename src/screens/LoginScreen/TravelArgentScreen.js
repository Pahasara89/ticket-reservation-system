
import  { useState ,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainScreen from '../../components/MainScreen'
import { Form, Button, Row, Col,Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Login.css";
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loading from "../../components/Loading/Loading";
import { login } from "../../actions/userAction";
import Footer from "../../components/Footer";
import HomeNavBar from "../../components/HomeNavBar";
import Header from "../../components/Header/Header";

const TravelArgentScreen = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const navigate = useNavigate();


//call the user Action for login
const dispatch=useDispatch();
//reducers
const userLogin = useSelector((state) => state.userLogin);
//3`
const { loading, error, userInfo } = userLogin;
//assign to the localstorage


//4
  useEffect(() => {
    const userInfo=localStorage.getItem("userInfo");
  if (userInfo) {
    navigate("/login");
  }
}, [navigate, userInfo]);

const submitHandler = async(e) => {
    e.preventDefault();
    dispatch(login(email,password));
};


  return (
    <>
    

      <MainScreen tittle="LOGIN" style={{ margin: 150 }}>
      <Card style={{ margin: 150 }}>
        <div className="loginContainer">
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {loading && <Loading />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>


              <br/>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <Row className="py-3">
            <Col>
              New Customer ? <Link to="/register">Register Here</Link>
            </Col>
          </Row>
        </div>
      </Card>
    </MainScreen>

  
    </>
  );
  
}

export default TravelArgentScreen;
