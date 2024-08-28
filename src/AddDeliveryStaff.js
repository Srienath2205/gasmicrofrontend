import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { styled } from "@mui/material/styles";
import AdminSidebar from "./AdminSidebar";
import {
  AddCircle as AddCircleIcon,
  Cancel as CancelIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Work as WorkIcon,
} from "@mui/icons-material";
import Swal from "sweetalert2"; // Import SweetAlert2

const GradientButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #C33764, #1D2671)",
  color: "#fff",
  "&:hover": {
    background: "linear-gradient(45deg, #C33764, #1D2671)",
  },
}));

const WarningButton = styled(Button)(({ theme }) => ({
  background: "#f44336",
  color: "#fff",
  "&:hover": {
    background: "#c62828",
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: "#fff",
  "& .MuiInputLabel-root": {
    color: "#fff",
    fontWeight: "bold",
    fontSize: "0.875rem",
  },
  "& .MuiInputBase-input": {
    color: "#000",
    fontSize: "0.875rem",
    padding: "0.5rem",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "& fieldset": {
      borderColor: "#fff",
    },
    "&:hover fieldset": {
      borderColor: "#fff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#fff",
    },
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#454545",
  },
}));

const GradientCard = styled(Card)(({ theme }) => ({
  background: "linear-gradient(45deg, #C33764, #1D2671)",
  color: "#fff",
  padding: theme.spacing(3),
  border: "1px solid #fff",
  borderRadius: "12px",
}));

const drawerWidth = 240;

const AddDeliveryStaff = () => {
  const [staffDetails, setStaffDetails] = useState({
    staffName: "",
    phoneNumber: "",
    assignedArea: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleAddStaff = () => {
    setShowAddForm(true);
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
  };

  const validateInputs = () => {
    const errors = {};
    let isValid = true;

    if (!staffDetails.staffName.trim()) {
      errors.staffName = "Name is required.";
      isValid = false;
    }

    if (!staffDetails.phoneNumber.trim() || isNaN(staffDetails.phoneNumber)) {
      errors.phoneNumber = "Valid phone number is required.";
      isValid = false;
    }

    if (!staffDetails.assignedArea.trim()) {
      errors.assignedArea = "Assigned Area is required.";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStaffDetails({ ...staffDetails, [name]: value });
  };

  const handleAddStaffSubmit = (event) => {
    event.preventDefault();

    if (!validateInputs()) {
      return;
    }

    axios
      .post("http://localhost:8787/adminside/adddeliveryStaff", staffDetails)
      .then((response) => {
        setStaffDetails({
          staffName: "",
          phoneNumber: "",
          assignedArea: "",
        });
        setShowAddForm(false);
        Swal.fire({
          title: 'Success!',
          text: 'Staff added successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => navigate("/view-staff"));
      })
      .catch((error) => {
        console.error("There was an error adding the staff!", error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to add staff. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AdminSidebar
        open={sidebarOpen}
        handleDrawerClose={() => setSidebarOpen(false)}
      />
      <Container>
        <Box sx={{ textAlign: "center", mb: 3, mt: 4 }}>
          <Typography variant="h4" sx={{ color: "#fff", mb: 2 }}>
            Add Delivery Staff
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              onClick={handleAddStaff}
              sx={{
                background: "linear-gradient(45deg, #C33764, #1D2671)",
                color: "#fff",
                "&:hover": {
                  background: "linear-gradient(45deg, #C33764, #1D2671)",
                },
              }}
            >
              <AddCircleIcon sx={{ mr: 1 }} />
              Add New Staff
            </Button>
          </Box>
        </Box>

        {showAddForm && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 4,
              mb: 4,
            }}
          >
            <GradientCard sx={{ maxWidth: 800, width: "100%" }}>
              <CardContent>
                <form onSubmit={handleAddStaffSubmit}>
                  <FormControl fullWidth margin="normal">
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Typography
                        sx={{
                          flex: "0 0 30%",
                          fontWeight: "bold",
                          minWidth: "150px",
                        }}
                      >
                        <PersonIcon sx={{ mr: 1 }} />
                        Name:
                      </Typography>
                      <StyledTextField
                        id="staffName"
                        name="staffName"
                        placeholder="Enter staff name"
                        value={staffDetails.staffName}
                        onChange={handleInputChange}
                        error={!!validationErrors.staffName}
                        helperText={validationErrors.staffName}
                        sx={{ flex: 1 }}
                      />
                    </Box>
                  </FormControl>
                  <FormControl fullWidth margin="normal">
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Typography
                        sx={{
                          flex: "0 0 30%",
                          fontWeight: "bold",
                          minWidth: "150px",
                        }}
                      >
                        <PhoneIcon sx={{ mr: 1 }} />
                        Phone:
                      </Typography>
                      <StyledTextField
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="Enter phone number"
                        value={staffDetails.phoneNumber}
                        onChange={handleInputChange}
                        error={!!validationErrors.phoneNumber}
                        helperText={validationErrors.phoneNumber}
                        sx={{ flex: 1 }}
                      />
                    </Box>
                  </FormControl>
                  <FormControl fullWidth margin="normal">
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Typography
                        sx={{
                          flex: "0 0 30%",
                          fontWeight: "bold",
                          minWidth: "150px",
                        }}
                      >
                        <WorkIcon sx={{ mr: 1 }} />
                        Assigned Area:
                      </Typography>
                      <StyledTextField
                        id="assignedArea"
                        name="assignedArea"
                        placeholder="Enter assigned area"
                        value={staffDetails.assignedArea}
                        onChange={handleInputChange}
                        error={!!validationErrors.assignedArea}
                        helperText={validationErrors.assignedArea}
                        sx={{ flex: 1 }}
                      />
                    </Box>
                  </FormControl>
                  <Box
                    sx={{ mt: 2, display: "flex", justifyContent: "center" }}
                  >
                    <GradientButton type="submit">
                      <AddCircleIcon sx={{ mr: 1 }} />
                      Add Staff
                    </GradientButton>
                    <WarningButton onClick={handleCancelAdd} sx={{ ml: 2 }}>
                      <CancelIcon sx={{ mr: 1 }} />
                      Cancel
                    </WarningButton>
                  </Box>
                  {error && (
                    <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                      {error}
                    </Typography>
                  )}
                </form>
              </CardContent>
            </GradientCard>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default AddDeliveryStaff;

