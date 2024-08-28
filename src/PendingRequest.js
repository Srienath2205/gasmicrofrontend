import React, { useEffect, useState } from "react";
import {
  Button,
  Navbar,
  Container,
  Nav,
  NavDropdown,
  DropdownDivider,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import AdminSidebar from "./AdminSidebar";

const PendingRequests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8787/requestside/getPendingRequestList")
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the pending requests!", error);
        Swal.fire({
          title: "Error",
          text: "There was an error fetching the pending requests!",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  }, []);

  const handleApprove = async (connectionID) => {
    try {
      const response = await axios.put(
        `http://localhost:8787/requestside/updaterequest/${connectionID}`
      );
      if (response.data) {
        setRequests(
          requests.filter((req) => req.connectionID !== connectionID)
        );
        Swal.fire({
          title: "Request Approved",
          text: "An approval email has been sent to the concerned person.",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/approvedrequest");
      }
    } catch (error) {
      console.error("Error approving the request!", error);
      Swal.fire({
        title: "Error",
        text: "There was an error approving the request!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleReject = async (connectionID) => {
    try {
      const response = await axios.put(
        `http://localhost:8787/requestside/rejectrequest/${connectionID}`
      );
      if (response.data) {
        setRequests(
          requests.filter((req) => req.connectionID !== connectionID)
        );
        Swal.fire({
          title: "Request Rejected",
          text: "A rejection email has been sent to the concerned person.",
          icon: "warning",
          confirmButtonText: "OK",
        });
        navigate("/rejectedrequest");
      }
    } catch (error) {
      console.error("Error rejecting the request!", error);
      Swal.fire({
        title: "Error",
        text: "There was an error rejecting the request!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar
        open={sidebarOpen}
        handleDrawerClose={() => setSidebarOpen(!sidebarOpen)}
      />

      <div style={{ flex: 1, padding: "20px" }}>
        <center>
          <h2
            className="distribution-title"
            style={{
              marginTop: "30px",
              fontSize: "25px",
              fontFamily: "verdana",
              fontWeight: "bold",
              fontStyle: "italic",
            }}
            aria-label="Pending Requests"
          >
            Pending Requests
          </h2>
        </center>{" "}
        <table className="table border shadow table-striped">
          <thead className="table-dark">
            <tr>
              <th scope="col" style={{ padding: "20px" }}>
                Request ID
              </th>
              <th scope="col" style={{ padding: "20px" }}>
                Customer ID
              </th>
              <th scope="col" style={{ padding: "20px" }}>
                Date of Birth
              </th>
              <th scope="col" style={{ padding: "20px" }}>
                Address
              </th>
              <th scope="col" style={{ padding: "20px" }}>
                Gender
              </th>
              <th scope="col" style={{ padding: "20px" }}>
                Aadhar Number
              </th>
              <th scope="col" style={{ padding: "20px" }}>
                Pan Number
              </th>
              <th scope="col" style={{ padding: "20px" }}>
                Status
              </th>
              <th scope="col" style={{ padding: "20px" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.connectionID}>
                <td style={{ padding: "20px" }}>{request.connectionID}</td>
                <td style={{ padding: "20px" }}>
                  {request.customer.customerID}
                </td>
                <td style={{ padding: "20px" }}>{request.dateOfBirth}</td>
                <td style={{ padding: "20px" }}>{request.address}</td>
                <td style={{ padding: "20px" }}>{request.gender}</td>
                <td style={{ padding: "20px" }}>{request.aadharNumber}</td>
                <td style={{ padding: "20px" }}>{request.panNumber}</td>
                <td style={{ padding: "20px" }}>{request.status}</td>
                <td style={{ padding: "20px" }}>
                  <Button
                    className="btn btn-success"
                    onClick={() => handleApprove(request.connectionID)}
                  >
                    Approve
                  </Button>
                  <Button
                    className="btn btn-danger ms-2"
                    onClick={() => handleReject(request.connectionID)}
                  >
                    Reject
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingRequests;
