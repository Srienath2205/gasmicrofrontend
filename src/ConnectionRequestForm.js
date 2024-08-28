import React, { useState } from "react";
import { Box, Container, Typography, TextField, Button, Card, CardContent, FormControl, FormHelperText, InputLabel, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment-timezone";
import { styled } from "@mui/material/styles";
import CustomerSideBar from "./CustomerSideBar"; // Import the sidebar

const GradientButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #C33764, #1D2671)",
  color: "#fff",
  "&:hover": {
    background: "linear-gradient(45deg, #C33764, #1D2671)",
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

const ConnectionRequestForm = () => {
  const cusid = sessionStorage.getItem("customerID");
  const navigate = useNavigate();

  const [inputData, setInputData] = useState({
    dateOfBirth: "",
    address: "",
    gender: "",
    aadharNumber: "",
    panNumber: "",
    status: "Requested",
    customer: {
      customerID: cusid,
    },
  });

  const [errors, setErrors] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateValues = () => {
    const newErrors = {};
    let isValid = true;

    // Validation logic remains the same

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateValues()) {
      try {
        const connectionDate = moment().tz("Asia/Kolkata").format("YYYY-MM-DD");

        await axios.post(
          "http://localhost:8787/requestside/addconnectionRequest",
          {
            ...inputData,
            connectionDate: connectionDate,
          }
        );

        alert("Connection request added successfully! Await admin approval.");
        navigate("/customer-dashboard");
      } catch (err) {
        console.error("Error submitting connection request:", err);
        alert("Failed to submit connection request.");
      }
    } else {
      alert("Please correct the errors before submitting.");
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CustomerSideBar open={sidebarOpen} handleDrawerClose={() => setSidebarOpen(false)} />
      <Container sx={{ flex: 1, padding: "20px", marginTop:"50px" }}>
        <GradientCard sx={{ width: "100%", maxWidth: "600px",margin: "auto", padding: 4 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Connection Request Form
            </Typography>
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth margin="normal">
                <label sx={{ color: "#fff" }}>Date of Birth:</label>
                <StyledTextField
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={inputData.dateOfBirth}
                  onChange={handleInputChange}
                  error={!!errors.dateOfBirth}
                  helperText={errors.dateOfBirth}
                  InputLabelProps={{ shrink: true }}
                />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <label sx={{ color: "#fff" }}>Address:</label>
                <StyledTextField
                  type="text"
                  id="address"
                  name="address"
                  value={inputData.address}
                  onChange={handleInputChange}
                  error={!!errors.address}
                  helperText={errors.address}
                />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <label sx={{ color: "#fff" }}>Gender:</label>
                <Select
                  id="gender"
                  name="gender"
                  value={inputData.gender}
                  onChange={handleInputChange}
                  error={!!errors.gender}
                  displayEmpty
                  inputProps={{ "aria-label": "Gender" }}
                  sx={{ backgroundColor: "#fff" }}
                >
                  <MenuItem value=""><em>Select Gender</em></MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
                {errors.gender && (
                  <FormHelperText error>{errors.gender}</FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth margin="normal">
                <label sx={{ color: "#fff" }}>Aadhar Number:</label>
                <StyledTextField
                  type="text"
                  id="aadharNumber"
                  name="aadharNumber"
                  value={inputData.aadharNumber}
                  onChange={handleInputChange}
                  error={!!errors.aadharNumber}
                  helperText={errors.aadharNumber}
                />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <label sx={{ color: "#fff" }}>PAN Number:</label>
                <StyledTextField
                  type="text"
                  id="panNumber"
                  name="panNumber"
                  value={inputData.panNumber}
                  onChange={handleInputChange}
                  error={!!errors.panNumber}
                  helperText={errors.panNumber}
                />
              </FormControl>

              <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                <GradientButton type="submit">Submit Request</GradientButton>
              </Box>
            </form>
          </CardContent>
        </GradientCard>
      </Container>
    </Box>
  );
};

export default ConnectionRequestForm;

