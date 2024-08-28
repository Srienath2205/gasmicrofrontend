import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminHomeNavbar from "./AdminHomeNavbar";
import Footer from "./Footer";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import "./AdminHome.css";

const GradientButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #C33764 30%, #1D2671 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 48,
  padding: "0 30px",
  fontSize: "16px",
  textTransform: "none",
  "&:hover": {
    background: "linear-gradient(45deg, #1D2671 30%, #C33764 90%)",
  },
}));

function AdminHome() {
  return (
    <div className="admin-home">
      <AdminHomeNavbar />
      <div className="content">
        <div className="text-block">
          <center>
            <h1
              style={{
                marginTop: "50px",
                fontSize: "25px",
                fontFamily: "verdana",
                fontWeight: "bold",
                fontStyle: "italic",
              }}
              role="Admin Home Title"
            >
              Admin Home
            </h1>
          </center>
          <br />
          <center>
            <p
              style={{
                fontSize: "25px",
                fontStyle: "italic",
                textDecoration: "none",
              }}
              role="Welcome Message"
            >
              Welcome to your admin account.
            </p>
          </center>
          <center>
            <p
              style={{
                fontSize: "25px",
                fontStyle: "italic",
                textDecoration: "none",
              }}
              role="Manage Info"
            >
              Manage customers, staff, connections, and bookings.
            </p>
          </center>
          <center>
            <Link
              to="/admin-dashboard"
              style={{ textDecoration: "none" }}
              role="Get Started"
            >
              <GradientButton>Get Started</GradientButton>
            </Link>
          </center>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminHome;
