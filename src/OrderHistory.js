import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, Box, Typography } from "@mui/material";
import CustomerSideBar from "./CustomerSideBar"; // Import the sidebar component

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true); // State to control sidebar visibility
  const customerID = sessionStorage.getItem('customerID'); // Retrieve customerID from session storage

  useEffect(() => {
    if (customerID) {
      fetchOrders(customerID);
    } else {
      console.error("No customerID found in session storage");
    }
  }, [customerID]);

  const fetchOrders = (customerID) => {
    axios
      .get("http://localhost:8787/bookingside/bookings")
      .then((response) => {
        // Filter orders for the specific customerID
        const filteredOrders = response.data.filter(order => 
          order.customer.customerID == customerID
        );
        setOrders(filteredOrders);
      })
      .catch((error) => {
        console.error("There was an error fetching the order history!", error);
      });
  };

  const handleCancel = (bookingID) => {
    axios
      .delete(`http://localhost:8787/bookingside/deletebooking/${bookingID}`)
      .then((response) => {
        if (response.data === "Success") {
          setOrders(orders.filter((order) => order.bookingID !== bookingID));
        } else {
          console.error("Failed to cancel the booking");
        }
      })
      .catch((error) => {
        console.error("There was an error canceling the booking!", error);
      });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CustomerSideBar open={sidebarOpen} handleDrawerClose={() => setSidebarOpen(false)} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <Container>
          <center><Typography variant="h4" component="h2" sx={{ color: 'white', mb: 3 }}>
            Order History
          </Typography></center>
          <Box sx={{ overflow: 'auto', width: '100%' }}>
            <table className="table border shadow table-striped" style={{ width: '100%' }}>
              <thead className="table-dark">
                <tr>
                  <th scope="col" style={{ padding: "20px", fontSize: "14px" }}>Order ID</th>
                  <th scope="col" style={{ padding: "20px", fontSize: "14px" }}>Customer ID</th>
                  <th scope="col" style={{ padding: "20px", fontSize: "14px" }}>Cylinders Required</th>
                  <th scope="col" style={{ padding: "20px", fontSize: "14px" }}>Status</th>
                  <th scope="col" style={{ padding: "20px", fontSize: "14px" }}>Booking Date</th>
                  <th scope="col" style={{ padding: "20px", fontSize: "14px" }}>Amount</th>
                  <th scope="col" style={{ padding: "20px", fontSize: "14px" }}>Delivery Staff</th>
                  <th scope="col" style={{ padding: "20px", fontSize: "14px" }}>Delivery Date</th>
                  <th scope="col" style={{ padding: "20px", fontSize: "14px" }}>Connection ID</th>
                  <th scope="col" style={{ padding: "20px", fontSize: "14px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.bookingID}>
                    <td style={{ padding: "20px", fontSize: "14px" }}>{order.bookingID}</td>
                    <td style={{ padding: "20px", fontSize: "14px" }}>
                      {order.customer ? order.customer.customerID : "N/A"}
                    </td>
                    <td style={{ padding: "20px", fontSize: "14px" }}>{order.cylindersRequired}</td>
                    <td style={{ padding: "20px", fontSize: "14px" }}>{order.status}</td>
                    <td style={{ padding: "20px", fontSize: "14px" }}>
                      {new Date(order.bookingDate).toLocaleDateString()}
                    </td>
                    <td style={{ padding: "20px", fontSize: "14px" }}>₹{order.amount}</td>
                    <td style={{ padding: "20px", fontSize: "14px" }}>
                      {order.deliverystaff ? order.deliverystaff.staffName : "N/A"}
                    </td>
                    <td style={{ padding: "20px", fontSize: "14px" }}>
                      {order.deliveryDate
                        ? new Date(order.deliveryDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td style={{ padding: "20px", fontSize: "14px" }}>
                      {order.connectionRequest
                        ? order.connectionRequest.connectionID
                        : "N/A"}
                    </td>
                    <td style={{ padding: "20px", fontSize: "14px" }}>
                      <Button
                        variant="contained"
                        color="error" // MUI color for danger
                        onClick={() => handleCancel(order.bookingID)}
                      >
                        Cancel
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default OrderHistory;
