import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./CustomerRegister.css";

function CustomerEditProfile() {
  const [inputData, setInputData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    currentPassword: "",
    newPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const navigate = useNavigate();

  const customerID = parseInt(sessionStorage.getItem("customerID"));

  useEffect(() => {
    if (!customerID) {
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:8787/customerside/customer/${customerID}`)
      .then((response) => {
        setInputData({
          ...response.data,
          currentPassword: "",
          newPassword: "",
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the profile data!", error);
        setError("Failed to load profile data.");
        setLoading(false);
      });
  }, [customerID, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationResult = validateInputs(inputData);
    if (!validationResult.isValid) {
      setError(validationResult.message);
      return;
    }

    try {
      const updatedData = { ...inputData };

      if (inputData.newPassword.trim() !== "") {
        updatedData.password = inputData.newPassword;
      }

      await axios.post(
        `http://localhost:8787/customerside/updatecustomer`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Profile updated successfully!");
      navigate("/cusprofile");
    } catch (error) {
      console.error("There was an error updating the profile!", error);
      setError("Profile update failed. Please try again.");
    }
  };

  const validateInputs = (data) => {
    if (!data.username || data.username.length < 3) {
      return {
        isValid: false,
        message: "Username must be at least 3 characters long.",
      };
    }
    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      return { isValid: false, message: "Please enter a valid email address." };
    }
    if (!data.phoneNumber || !/^\d{10}$/.test(data.phoneNumber)) {
      return {
        isValid: false,
        message: "Phone number must be 10 digits long.",
      };
    }
    if (data.currentPassword && data.currentPassword.length < 6) {
      return {
        isValid: false,
        message: "Current password must be at least 6 characters long.",
      };
    }
    if (data.newPassword && data.newPassword.length < 6) {
      return {
        isValid: false,
        message: "New password must be at least 6 characters long.",
      };
    }
    return { isValid: true, message: "" };
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Navbar expand="lg" id="home" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand
            className="text-light"
            style={{
              fontSize: "25px",
              fontFamily: "verdana",
              fontWeight: "bold",
              fontStyle: "italic",
            }}
          >
            LPG Connect
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav id="nav2">
              <Link to="/customer-home">
                <Button
                  id="button2"
                  style={{
                    fontSize: "12px",
                    fontFamily: "verdana",
                    fontWeight: "bold",
                  }}
                >
                  Home
                </Button>
              </Link>
            </Nav>
            <Nav id="nav2">
              <NavDropdown title="Connections" id="basic-nav-dropdown">
                <NavDropdown.Item id="homeback">
                  <Link to="/view-connections">
                    <button id="homebutton">View Connections</button>
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav id="nav2">
              <NavDropdown title="Bookings" id="basic-nav-dropdown">
                <NavDropdown.Item id="homeback">
                  <Link to="/orderhistory">
                    <button id="homebutton">View Bookings</button>
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item id="homeback">
                  <Link to="/cylinder-booking">
                    <button id="homebutton">Add Booking</button>
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav id="nav4">
              <form className="d-flex">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  id="search"
                  style={{ fontSize: "15px", textDecoration: "none" }}
                />
                <button
                  className="btn"
                  id="button2"
                  type="submit"
                  style={{ fontSize: "20px", textDecoration: "none" }}
                >
                  Search
                </button>
              </form>
            </Nav>
            <Nav id="nav4">
              <NavDropdown
                title={<FaUserCircle className="text-2xl" />}
                id="basic-nav-dropdown"
                className="text-white"
              >
                <NavDropdown.Item
                  as="button"
                  onClick={() => navigate("/cusprofile")}
                >
                  View Profile
                </NavDropdown.Item>
                <NavDropdown.Item
                  as="button"
                  onClick={() => navigate("/edit-cusprofile")}
                >
                  Edit Profile
                </NavDropdown.Item>
                <NavDropdown.Item as="button" onClick={() => navigate("/")}>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="containersign">
        <h2 className="card-title" style={{ color: "white" }}>
          Edit Profile
        </h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" style={{ color: "white" }}>
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              value={inputData.username}
              onChange={(e) =>
                setInputData({ ...inputData, username: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" style={{ color: "white" }}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={inputData.email}
              onChange={(e) =>
                setInputData({ ...inputData, email: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber" style={{ color: "white" }}>
              Phone Number:
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              className="form-control"
              value={inputData.phoneNumber}
              onChange={(e) =>
                setInputData({ ...inputData, phoneNumber: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="currentPassword" style={{ color: "white" }}>
              Current Password:
            </label>
            <div className="input-group">
              <input
                type={showCurrentPassword ? "text" : "password"}
                id="currentPassword"
                name="currentPassword"
                className="form-control"
                value={inputData.currentPassword}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    currentPassword: e.target.value,
                  })
                }
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="newPassword" style={{ color: "white" }}>
              New Password:
            </label>
            <div className="input-group">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                className="form-control"
                value={inputData.newPassword}
                onChange={(e) =>
                  setInputData({ ...inputData, newPassword: e.target.value })
                }
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button type="submit" className="btton btton-primary">
            Save Changes
          </button>
        </form>
      </Container>
    </div>
  );
}

export default CustomerEditProfile;
