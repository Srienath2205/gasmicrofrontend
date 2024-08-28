import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  DropdownDivider,
  Card,
  Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./CustomerLogin.css";

function AdminViewProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const email = "Sri003@gmail.com";
        const response = await axios.get(
          `http://localhost:8787/adminside/admin/email/${email}`
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to load profile.");
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <Navbar expand="lg" id="home" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand
            href="#home"
            className="text-light"
            style={{
              fontSize: "25px",
              fontFamily: "verdana",
              fontWeight: "bold",
              fontStyle: "italic",
            }}
            aria-label="Brand Name"
          >
            LPG Connect
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav id="nav0">
              <Link to="/admin-home">
                <Button
                  id="button2"
                  style={{
                    fontSize: "12px",
                    fontFamily: "verdana",
                    fontWeight: "bold",
                  }}
                  aria-label="Home"
                >
                  Home
                </Button>
              </Link>
            </Nav>
            <Nav id="nav5">
              <NavDropdown
                title="Connections"
                id="basic-nav-dropdown"
                aria-label="Connections Dropdown"
              >
                <NavDropdown.Item id="homeback">
                  <Link to="/adminview-connections">
                    <Button id="homebutton" aria-label="View Connections">
                      View Connections
                    </Button>
                  </Link>
                </NavDropdown.Item>
                <DropdownDivider />
                <NavDropdown.Item id="homeback">
                  <Link to="/connection-distribution">
                    <Button id="homebutton" aria-label="New Connection">
                      New Connection
                    </Button>
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav id="nav2">
              <NavDropdown
                title="Bookings"
                id="basic-nav-dropdown"
                aria-label="Bookings Dropdown"
              >
                <NavDropdown.Item id="homeback">
                  <Link to="/adminbooking">
                    <Button id="homebutton" aria-label="View Bookings">
                      View Bookings
                    </Button>
                  </Link>
                </NavDropdown.Item>
                <DropdownDivider />
                <NavDropdown.Item id="homeback">
                  <Link to="/view-staff">
                    <Button id="homebutton" aria-label="View Delivery Staffs">
                      View Delivery Staffs
                    </Button>
                  </Link>
                </NavDropdown.Item>
                <DropdownDivider />
                <NavDropdown.Item id="homeback">
                  <Link to="/add-staff">
                    <Button id="homebutton" aria-label="Add Delivery Staffs">
                      Add Delivery Staffs
                    </Button>
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav id="nav3">
              <form className="d-flex" aria-label="Search Form">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search"
                  aria-label="Search Input"
                  id="search"
                  style={{ fontSize: "15px", textDecoration: "none" }}
                />
                <Button
                  className="btn"
                  id="button2"
                  type="submit"
                  style={{ fontSize: "20px", textDecoration: "none" }}
                  aria-label="Search Button"
                >
                  Search
                </Button>
              </form>
            </Nav>
            <Nav id="nav4">
              <NavDropdown
                title={<FaUserCircle className="text-2xl" />}
                id="basic-nav-dropdown"
                className="text-white"
                aria-label="User Menu"
              >
                <NavDropdown.Item
                  as="button"
                  onClick={() => navigate("/view-admin")}
                  aria-label="View Profile"
                >
                  View Profile
                </NavDropdown.Item>
                <NavDropdown.Item
                  as="button"
                  onClick={() => navigate("/edit-admin")}
                  aria-label="Edit Profile"
                >
                  Edit Profile
                </NavDropdown.Item>
                <NavDropdown.Item
                  as="button"
                  onClick={() => navigate("/")}
                  aria-label="Log Out"
                >
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="containerlogin">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <Card aria-label="Profile Card">
              <Card.Body>
                <h2 className="card-title" aria-label="Profile Title">
                  View Profile
                </h2>
                {error && (
                  <p className="text-danger" aria-label="Error Message">
                    {error}
                  </p>
                )}
                <Card.Text aria-label="Profile Details">
                  <strong>Email:</strong> {profile.email}
                  <br />
                  <strong>Password:</strong> {profile.password}
                </Card.Text>
                <Link to="/edit-admin">
                  <Button
                    className="btnlogin btnlogin-primary"
                    aria-label="Edit Profile Button"
                  >
                    Edit Profile
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminViewProfile;
