
import react,  { useEffect,useState } from "react";
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userAction";
import "./Header.css";
import {AiOutlineDingding} from 'react-icons/ai';
import '../HomeNavBar.css';
import { FaShoppingCart } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";


const Header = ({ history ,setSearch}) => {
  const dispatch = useDispatch();
  //5
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { cart } = useSelector(state => state.cart);
  const [length,setLen] = useState("");

  const logoutHandler = () => {
    dispatch(logout());
  
  };

  useEffect(() => {
    function setLength(){
      var len = 0;

      for(var i=0; i<cart.length;i++){
        if(userInfo?.name == cart[i].userName){
          len = len + 1
        }
      }
      setLen(len)
    }

    setLength();
  }, [userInfo]);


  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand>
        <Link to='/customer-home' className='homenavbar-logo'>
                Booking My Train <AiOutlineDingding/>
        </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form>
          </Nav>

          {userInfo ? (
            <>
              <Nav >

              <Nav.Link href="/admin-home">
                          Home     
                </Nav.Link>

                <Nav.Link href="/contact">
                          Contact Us     
                </Nav.Link>
{/* 
                <Nav.Link href="/cart">
                  
                  <FaShoppingCart/> Cart <span className='circle' style={{position: 'absolute', top: '15px'}}>{length}</span>
  
                </Nav.Link> */}

                <NavDropdown title={userInfo?.name} id="basic-nav-dropdown">
                  <NavDropdown.Item href="/profile">
                    <img
                      alt=""
                      src={`${userInfo.pic}`}
                      width="25"
                      height="25"
                      style={{ marginRight: 10 }}
                    />
                    MyProfile
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </>
          ) : (
            <Nav>
              {" "}
              <Nav.Link>
              <Link to='/customer-home' className='homenav-links'>
                        Home
                    </Link>
              </Nav.Link>

              <Nav.Link>
                <Link to='/contact-us' className='homenav-links'>
                        Contact Us
                </Link>
              </Nav.Link>

              
            </Nav>
            
          
           
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
