import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import CustomerSideBar from "./CustomerSideBar"; // Adjust the path as needed
import "./AllRequests.css";

export default function AllRequests() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true); // State to control sidebar

  const loadAllRequests = useCallback(async () => {
    try {
      const result = await axios.get(
        `http://localhost:8787/requestside/getConnectionRequests`
      );

      if (Array.isArray(result.data)) {
        // Retrieve customerID from session storage
        const storedCustomerID = sessionStorage.getItem("customerID");

        if (storedCustomerID) {
          // Filter requests based on stored customerID
          const filteredRequests = result.data.filter(
            request => request.customer.customerID == storedCustomerID
          );
          setRequests(filteredRequests);
        } else {
          // If no customerID is found in session storage, show all requests
          setRequests(result.data);
        }
      } else {
        console.error("Expected an array but got:", result.data);
        setRequests([]);
      }
    } catch (error) {
      console.error("Error fetching all requests:", error);
      setError("Error fetching requests.");
    }
  }, []);

  useEffect(() => {
    loadAllRequests();
  }, [loadAllRequests]);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <CustomerSideBar open={sidebarOpen} handleDrawerClose={handleSidebarToggle} />

      {/* Main Content */}
      <main style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
        <center>
          <h2 className="distribution-title">Connection Requests</h2>
        </center>
        <div id="all-requests-container">
          {error ? (
            <h4>{error}</h4>
          ) : requests.length === 0 ? (
            <h4>No Requests Found!</h4>
          ) : (
            <div className="table-container">
              <table className="table border shadow table-striped">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Request ID</th>
                    <th scope="col">Customer ID</th>
                    <th scope="col">Date of Birth</th>
                    <th scope="col">Address</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Aadhar Number</th>
                    <th scope="col">Pan Number</th>
                    <th scope="col">Status</th>
                    <th scope="col">Connection Date</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <tr key={request.connectionID}>
                      <td>{request.connectionID}</td>
                      <td>{request.customer.customerID}</td>
                      <td>{new Date(request.dateOfBirth).toLocaleDateString()}</td>
                      <td>{request.address}</td>
                      <td>{request.gender}</td>
                      <td>{request.aadharNumber}</td>
                      <td>{request.panNumber}</td>
                      <td>{request.status}</td>
                      <td>{new Date(request.connectionDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}


