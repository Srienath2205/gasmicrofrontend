import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Button,
  Modal,
  TextField,
  Typography,
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import AdminSidebar from "./AdminSidebar";
import Swal from "sweetalert2";

const MainContent = styled("div")(({ theme }) => ({
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

function ViewDeliveryStaff() {
  const navigate = useNavigate();
  const [deliveryStaff, setDeliveryStaff] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatedStaff, setUpdatedStaff] = useState({
    staffName: "",
    phoneNumber: "",
    assignedArea: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8787/adminside/deliveryStaffs")
      .then((res) => {
        setDeliveryStaff(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        Swal.fire(
          "Error",
          "Failed to load delivery staff. Please try again later.",
          "error"
        );
      });
  }, []);

  const handleUpdate = (staff) => {
    setSelectedStaff(staff);
    setUpdatedStaff({
      staffName: staff.staffName,
      phoneNumber: staff.phoneNumber,
      assignedArea: staff.assignedArea,
    });
    setShowUpdateModal(true);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    const isValidPhoneNumber = (number) => /^[0-9]{10}$/.test(number);
    const isValidName = (name) => /^[a-zA-Z\s]{5,}$/.test(name);
    const isValidAssignedArea = (area) => /^[a-zA-Z\s]+$/.test(area);

    if (!isValidPhoneNumber(updatedStaff.phoneNumber)) {
      Swal.fire(
        "Invalid Phone Number",
        "Phone number must be exactly 10 digits.",
        "warning"
      );
      return;
    }

    if (!isValidName(updatedStaff.staffName)) {
      Swal.fire(
        "Invalid Name",
        "Staff name must be at least 5 characters long and contain only letters and spaces.",
        "warning"
      );
      return;
    }

    if (!isValidAssignedArea(updatedStaff.assignedArea)) {
      Swal.fire(
        "Invalid Area",
        "Assigned area must not contain any symbols or numbers.",
        "warning"
      );
      return;
    }

    axios
      .put("http://localhost:8787/adminside/updatedeliveryStaff", {
        ...selectedStaff,
        ...updatedStaff,
      })
      .then(() => {
        setDeliveryStaff(
          deliveryStaff.map((staff) =>
            staff.staffID === selectedStaff.staffID
              ? { ...staff, ...updatedStaff }
              : staff
          )
        );
        setShowUpdateModal(false);
        Swal.fire("Updated", "Delivery staff updated successfully.", "success");
      })
      .catch((err) => {
        console.error("Error updating staff:", err);
        Swal.fire(
          "Error",
          "Failed to update delivery staff. Please try again later.",
          "error"
        );
      });
  };

  const handleDelete = (staffID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this staff!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `http://localhost:8787/adminside/deletedeliveryStaff/${staffID}`
          )
          .then(() => {
            setDeliveryStaff(
              deliveryStaff.filter((staff) => staff.staffID !== staffID)
            );
            Swal.fire("Deleted!", "The staff has been deleted.", "success");
          })
          .catch((err) => {
            console.error("Error deleting staff:", err);
            Swal.fire(
              "Error",
              "Failed to delete delivery staff. Please try again later.",
              "error"
            );
          });
      }
    });
  };

  return (
    <Grid container>
      <Grid item xs={2}>
        <AdminSidebar open={true} handleDrawerClose={() => {}} />{" "}
      </Grid>
      <Grid item xs={10}>
        <MainContent>
          <Container>
            <Typography
              variant="h4"
              sx={{ color: "#fff", mb: 2, textAlign: "center" }}
            >
              View Delivery Staff
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>ID</StyledTableCell>
                    <StyledTableCell align="right">Name</StyledTableCell>
                    <StyledTableCell align="right">
                      Phone Number
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      Assigned Area
                    </StyledTableCell>
                    <StyledTableCell align="right">Update</StyledTableCell>
                    <StyledTableCell align="right">Delete</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {deliveryStaff.length > 0 ? (
                    deliveryStaff.map((staff) => (
                      <StyledTableRow key={staff.staffID}>
                        <StyledTableCell component="th" scope="row">
                          {staff.staffID}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {staff.staffName}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {staff.phoneNumber}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {staff.assignedArea}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <Button
                            variant="contained"
                            color="warning"
                            onClick={() => handleUpdate(staff)}
                          >
                            Update
                          </Button>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleDelete(staff.staffID)}
                          >
                            Delete
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))
                  ) : (
                    <StyledTableRow>
                      <StyledTableCell colSpan={6} align="center">
                        No data available
                      </StyledTableCell>
                    </StyledTableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Update Modal */}
            {selectedStaff && (
              <Modal
                open={showUpdateModal}
                onClose={() => setShowUpdateModal(false)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    width: 400,
                    p: 2,
                    bgcolor: "background.paper",
                    borderRadius: 1,
                    boxShadow: 24,
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Update Delivery Staff
                  </Typography>
                  <form onSubmit={handleUpdateSubmit}>
                    <TextField
                      label="Name"
                      fullWidth
                      margin="normal"
                      value={updatedStaff.staffName}
                      onChange={(e) =>
                        setUpdatedStaff({
                          ...updatedStaff,
                          staffName: e.target.value,
                        })
                      }
                      required
                    />
                    <TextField
                      label="Phone Number"
                      type="tel"
                      fullWidth
                      margin="normal"
                      value={updatedStaff.phoneNumber}
                      onChange={(e) =>
                        setUpdatedStaff({
                          ...updatedStaff,
                          phoneNumber: e.target.value,
                        })
                      }
                      required
                    />
                    <TextField
                      label="Assigned Area"
                      fullWidth
                      margin="normal"
                      value={updatedStaff.assignedArea}
                      onChange={(e) =>
                        setUpdatedStaff({
                          ...updatedStaff,
                          assignedArea: e.target.value,
                        })
                      }
                      required
                    />
                    <Box sx={{ mt: 2, textAlign: "right" }}>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => setShowUpdateModal(false)}
                      >
                        Close
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{ ml: 2 }}
                      >
                        Save Changes
                      </Button>
                    </Box>
                  </form>
                </Box>
              </Modal>
            )}
          </Container>
        </MainContent>
      </Grid>
    </Grid>
  );
}

export default ViewDeliveryStaff;
