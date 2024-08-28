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
  FormHelperText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { styled } from "@mui/material/styles";
import AdminSidebar from "./AdminSidebar";
import Swal from "sweetalert2";
import {
  AddCircle as AddCircleIcon,
  Cancel as CancelIcon,
  Image as ImageIcon,
  Description as DescriptionIcon,
  Star as StarIcon,
  LocationOn as LocationOnIcon,
} from "@mui/icons-material";

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

const ConnectionDistribution = () => {
  const [connections, setConnections] = useState([]);
  const [newConnection, setNewConnection] = useState({
    name: "",
    description: "",
    image: null,
    ratings: 0,
    reviews: "",
    location: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleAddConnection = () => {
    setShowAddForm(true);
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
  };

  const validateInputs = () => {
    const errors = {};
    let isValid = true;

    if (!newConnection.name.trim()) {
      errors.name = "Company Name is required.";
      isValid = false;
    }

    if (!newConnection.description.trim()) {
      errors.description = "Description is required.";
      isValid = false;
    }

    if (!newConnection.image) {
      errors.image = "Image is required.";
      isValid = false;
    } else if (!newConnection.image.type.startsWith("image/")) {
      errors.image = "File must be an image.";
      isValid = false;
    }

    if (newConnection.ratings < 0 || newConnection.ratings > 5) {
      errors.ratings = "Ratings must be between 0 and 5.";
      isValid = false;
    }

    if (!newConnection.location.trim()) {
      errors.location = "Location is required.";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewConnection({ ...newConnection, [name]: value });
  };

  const handleFileChange = (event) => {
    setNewConnection({ ...newConnection, image: event.target.files[0] });
  };

  const handleAddConnectionSubmit = (event) => {
    event.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const formData = new FormData();
    formData.append("name", newConnection.name);
    formData.append("description", newConnection.description);
    formData.append("ratings", newConnection.ratings);
    formData.append("reviews", newConnection.reviews);
    formData.append("location", newConnection.location);
    formData.append("cropsImage", newConnection.image);

    axios
      .post("http://localhost:8787/adminside/addconnection", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setConnections([...connections, response.data]);
        setNewConnection({
          name: "",
          description: "",
          image: null,
          ratings: 0,
          reviews: "",
          location: "",
        });
        setShowAddForm(false);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Details added successfully!",
          confirmButtonColor: "#1D2671",
        });
        navigate("/adminview-connections");
      })
      .catch((error) => {
        console.error("There was an error adding the connection!", error);
        setError("Failed to add connection. Please try again.");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add connection. Please try again.",
          confirmButtonColor: "#1D2671",
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
            Connection Details
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              onClick={handleAddConnection}
              sx={{
                background: "linear-gradient(45deg, #C33764, #1D2671)",
                color: "#fff",
                "&:hover": {
                  background: "linear-gradient(45deg, #C33764, #1D2671)",
                },
              }}
            >
              <AddCircleIcon sx={{ mr: 1 }} />
              Add New Connection
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
              {" "}
              {/* Increased width */}
              <CardContent>
                <form onSubmit={handleAddConnectionSubmit}>
                  <FormControl fullWidth margin="normal">
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Typography
                        sx={{
                          flex: "0 0 30%",
                          fontWeight: "bold",
                          minWidth: "150px",
                        }}
                      >
                        <AddCircleIcon sx={{ mr: 1 }} />
                        Company Name:
                      </Typography>
                      <StyledTextField
                        id="name"
                        name="name"
                        placeholder="Enter company name"
                        value={newConnection.name}
                        onChange={handleInputChange}
                        error={!!validationErrors.name}
                        helperText={validationErrors.name}
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
                        <DescriptionIcon sx={{ mr: 1 }} />
                        Description:
                      </Typography>
                      <StyledTextField
                        id="description"
                        name="description"
                        placeholder="Enter description"
                        value={newConnection.description}
                        onChange={handleInputChange}
                        error={!!validationErrors.description}
                        helperText={validationErrors.description}
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
                        <ImageIcon sx={{ mr: 1 }} />
                        Image:
                      </Typography>
                      <Box sx={{ flex: 1 }}>
                        <input
                          type="file"
                          id="image"
                          name="image"
                          onChange={handleFileChange}
                          style={{ width: "100%" }}
                        />
                        {validationErrors.image && (
                          <FormHelperText error sx={{ color: "#fff" }}>
                            {validationErrors.image}
                          </FormHelperText>
                        )}
                      </Box>
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
                        <StarIcon sx={{ mr: 1 }} />
                        Ratings:
                      </Typography>
                      <StyledTextField
                        id="ratings"
                        name="ratings"
                        type="number"
                        placeholder="Enter ratings (0-5)"
                        value={newConnection.ratings}
                        onChange={handleInputChange}
                        error={!!validationErrors.ratings}
                        helperText={validationErrors.ratings}
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
                        <LocationOnIcon sx={{ mr: 1 }} />
                        Location:
                      </Typography>
                      <StyledTextField
                        id="location"
                        name="location"
                        placeholder="Enter location"
                        value={newConnection.location}
                        onChange={handleInputChange}
                        error={!!validationErrors.location}
                        helperText={validationErrors.location}
                        sx={{ flex: 1 }}
                      />
                    </Box>
                  </FormControl>
                  <Box
                    sx={{ mt: 2, display: "flex", justifyContent: "center" }}
                  >
                    <GradientButton type="submit">
                      <AddCircleIcon sx={{ mr: 1 }} />
                      Add Connection
                    </GradientButton>
                    <WarningButton onClick={handleCancelAdd} sx={{ ml: 2 }}>
                      <CancelIcon sx={{ mr: 1 }} />
                      Cancel
                    </WarningButton>
                  </Box>
                  {error && (
                    <Typography
                      variant="body2"
                      color="error"
                      sx={{ mt: 2, color: "#fff" }}
                    >
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

export default ConnectionDistribution;
