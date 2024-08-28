import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";
import {
  Box,
  CssBaseline,
  Container,
  styled,
  Table,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import AdminSidebar from "./AdminSidebar";
import Swal from "sweetalert2";

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const AdminBooking = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [deliveryStaff, setDeliveryStaff] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(true);

  useEffect(() => {
    fetchOrders();
    fetchDeliveryStaff();
  }, []);

  const fetchOrders = () => {
    axios
      .get("http://localhost:8787/bookingside/bookings")
      .then((response) => setOrders(response.data))
      .catch((error) => console.error("Error fetching orders:", error));
  };

  const fetchDeliveryStaff = () => {
    axios
      .get("http://localhost:8787/adminside/deliveryStaffs")
      .then((response) => setDeliveryStaff(response.data))
      .catch((error) => console.error("Error fetching delivery staff:", error));
  };

  const handleShow = (order) => {
    setSelectedOrder(order);
    setModalShow(true);
  };

  const handleClose = () => setModalShow(false);

  const handleUpdate = () => {
    if (!selectedOrder) return;

    const today = new Date();
    const deliveryDate = new Date(selectedOrder.deliveryDate);

    if (deliveryDate <= today) {
      Swal.fire(
        "Invalid Date",
        "Delivery date must be a future date.",
        "warning"
      );
      return;
    }

    axios
      .put("http://localhost:8787/bookingside/updatebooking", selectedOrder)
      .then((response) => {
        console.log(response.data);
        handleClose();
        Swal.fire(
          "Success",
          "Delivery details updated successfully",
          "success"
        );
        fetchOrders();
      })
      .catch((error) => {
        console.error("Error updating delivery details:", error);
        Swal.fire(
          "Error",
          "Failed to update delivery details. Please try again later.",
          "error"
        );
      });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AdminSidebar
        open={openSidebar}
        handleDrawerClose={() => setOpenSidebar(!openSidebar)}
      />
      <MainContent>
        <Container>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              color: "#fff",
              textAlign: "center",
              mb: 3,
              fontFamily: "Verdana",
              fontWeight: "bold",
              fontStyle: "italic",
            }}
          >
            Order History
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="order history table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Order ID</StyledTableCell>
                  <StyledTableCell>Customer ID</StyledTableCell>
                  <StyledTableCell>Cylinders Required</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell>Booking Date</StyledTableCell>
                  <StyledTableCell>Amount</StyledTableCell>
                  <StyledTableCell>Delivery Staff</StyledTableCell>
                  <StyledTableCell>Delivery Date</StyledTableCell>
                  <StyledTableCell>Connection ID</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <StyledTableRow key={order.bookingID}>
                    <StyledTableCell>{order.bookingID}</StyledTableCell>
                    <StyledTableCell>
                      {order.customer ? order.customer.customerID : "N/A"}
                    </StyledTableCell>
                    <StyledTableCell>{order.cylindersRequired}</StyledTableCell>
                    <StyledTableCell>{order.status}</StyledTableCell>
                    <StyledTableCell>
                      {order.bookingDate
                        ? new Date(order.bookingDate).toLocaleDateString()
                        : "N/A"}
                    </StyledTableCell>
                    <StyledTableCell>₹{order.amount}</StyledTableCell>
                    <StyledTableCell>
                      {order.deliverystaff
                        ? order.deliverystaff.staffName
                        : "N/A"}
                    </StyledTableCell>
                    <StyledTableCell>
                      {order.deliveryDate
                        ? new Date(order.deliveryDate).toLocaleDateString()
                        : "N/A"}
                    </StyledTableCell>
                    <StyledTableCell>
                      {order.connectionRequest
                        ? order.connectionRequest.connectionID
                        : "N/A"}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Button
                        variant="danger"
                        onClick={() => handleShow(order)}
                      >
                        Update
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Modal show={modalShow} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Update Order</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedOrder && (
                <Form>
                  <Form.Group controlId="formOrderID">
                    <Form.Label>Order ID</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedOrder.bookingID}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group controlId="formCustomerID">
                    <Form.Label>Customer ID</Form.Label>
                    <Form.Control
                      type="text"
                      value={
                        selectedOrder.customer
                          ? selectedOrder.customer.customerID
                          : "N/A"
                      }
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group controlId="formCylindersRequired">
                    <Form.Label>Cylinders Required</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedOrder.cylindersRequired}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group controlId="formStatus">
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                      as="select"
                      value={selectedOrder.status}
                      onChange={(e) =>
                        setSelectedOrder({
                          ...selectedOrder,
                          status: e.target.value,
                        })
                      }
                    >
                      <option value="Ordered">Ordered</option>
                      <option value="Assigned">Assigned</option>
                      <option value="Delivered">Delivered</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="formDeliveryDate">
                    <Form.Label>Delivery Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={
                        selectedOrder.deliveryDate
                          ? new Date(selectedOrder.deliveryDate)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      onChange={(e) => {
                        const newDeliveryDate = e.target.value;
                        const today = new Date().toISOString().split("T")[0];

                        if (newDeliveryDate <= today) {
                          Swal.fire(
                            "Invalid Date",
                            "Delivery date must be a future date.",
                            "warning"
                          );
                          return;
                        }

                        setSelectedOrder({
                          ...selectedOrder,
                          deliveryDate: newDeliveryDate,
                        });
                      }}
                    />
                  </Form.Group>
                  <Form.Group controlId="formStaff">
                    <Form.Label>Assign Staff</Form.Label>
                    <Form.Control
                      as="select"
                      value={
                        selectedOrder.deliverystaff
                          ? selectedOrder.deliverystaff.staffID
                          : ""
                      }
                      onChange={(e) =>
                        setSelectedOrder({
                          ...selectedOrder,
                          deliverystaff: { staffID: e.target.value },
                        })
                      }
                    >
                      <option value="">Select Staff</option>
                      {deliveryStaff.map((staff) => (
                        <option key={staff.staffID} value={staff.staffID}>
                          {staff.staffID} - {staff.staffName}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Form>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="danger" onClick={handleUpdate}>
                Update
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </MainContent>
    </Box>
  );
};

export default AdminBooking;
