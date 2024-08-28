import React, { useState, useEffect } from "react";
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
  Select,
  MenuItem,
  IconButton,
  InputAdornment
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment-timezone";
import { styled } from "@mui/material/styles";
import CustomerSideBar from "./CustomerSideBar";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Swal from 'sweetalert2';

// Styled components
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

const StyledLabel = styled('label')(({ theme }) => ({
  color: "#fff",
  fontWeight: "bold",
  fontSize: "0.875rem",
}));

const CylinderBookingForm = () => {
  const [inputData, setInputData] = useState({
    cylindersRequired: "",
    status: "Ordered",
    bookingDate: "",
    paymentMethod: "",
    connectionID: "",
    customerID: "",
    amount: "",
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
  });

  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [approvedConnections, setApprovedConnections] = useState([]);
  const [errors, setErrors] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showCardCvv, setShowCardCvv] = useState(false);
  const [showBankIfsc, setShowBankIfsc] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApprovedConnections = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8787/requestside/getApprovedRequestList"
        );
        setApprovedConnections(response.data);
      } catch (err) {
        console.error("Failed to fetch approved connections", err);
      }
    };

    fetchApprovedConnections();
  }, []);

  const getCurrentDate = () => moment().tz("Asia/Kolkata").format("YYYY-MM-DD");

  const validateValues = (data) => {
    const newErrors = {};
    let isValid = true;

    if (!data.cylindersRequired) {
      newErrors.cylindersRequired = "Please enter cylinders required!";
      isValid = false;
    }

    if (!data.connectionID) {
      newErrors.connectionID = "Please select a connection request!";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validatePayment = (data) => {
    const newErrors = {};
    const {
      paymentMethod,
      cardNumber,
      cardholderName,
      expiryDate,
      cvv,
      bankName,
      accountNumber,
      ifscCode,
    } = data;

    if (paymentMethod === "Credit Card" || paymentMethod === "Debit Card") {
      if (!cardNumber || !/^\d{16}$/.test(cardNumber)) {
        newErrors.cardNumber = "Please enter a valid 16-digit card number.";
      }

      if (!cardholderName) {
        newErrors.cardholderName = "Cardholder name is required.";
      }

      if (!expiryDate || new Date(expiryDate) < new Date()) {
        newErrors.expiryDate = "Please enter a valid expiry date that is in the future.";
      }

      if (!cvv || !/^\d{3}$/.test(cvv)) {
        newErrors.cvv = "Please enter a valid 3-digit CVV.";
      }
    }

    if (paymentMethod === "Internet Banking") {
      if (!bankName) {
        newErrors.bankName = "Bank name is required.";
      }

      if (!accountNumber || !/^\d{10,12}$/.test(accountNumber)) {
        newErrors.accountNumber = "Please enter a valid account number (10-12 digits).";
      }

      if (!ifscCode || !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode)) {
        newErrors.ifscCode = "Please enter a valid IFSC code (usually 11 characters).";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "cylindersRequired") {
      const amount = value ? value * 780 : "";
      setInputData((prevState) => ({
        ...prevState,
        [name]: value,
        amount: amount
      }));
    } else {
      setInputData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    const customerID = sessionStorage.getItem("customerID");
    if (!customerID) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Customer ID not found in session storage.',
      });
      return;
    }

    const currentDate = getCurrentDate();
    const bookingData = {
      ...inputData,
      customerID,
      bookingDate: currentDate,
      amount: inputData.amount,
    };

    if (validateValues(bookingData)) {
      try {
        await axios.post(
          "http://localhost:8787/bookingside/addbooking",
          {
            cylindersRequired: bookingData.cylindersRequired,
            status: bookingData.status,
            bookingDate: bookingData.bookingDate,
            connectionRequest: { connectionID: bookingData.connectionID },
            customer: { customerID: bookingData.customerID },
            amount: bookingData.amount,
          }
        );

        setBookingSubmitted(true);
        Swal.fire({
          icon: 'success',
          title: 'Booking Successful',
          text: 'Your booking has been created. Please proceed to payment.',
        });
      } catch (err) {
        console.error("Failed to create booking.", err);
        Swal.fire({
          icon: 'error',
          title: 'Booking Failed',
          text: 'Failed to create booking. Please try again.',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please enter valid inputs!',
      });
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (validatePayment(inputData)) {
      Swal.fire({
        icon: 'success',
        title: 'Payment Successful',
        text: 'Booking and Payment successful!',
      }).then(() => {
        navigate("/orderhistory");
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Payment Error',
        text: 'Please enter valid payment details!',
      });
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CustomerSideBar open={sidebarOpen} handleDrawerClose={() => setSidebarOpen(false)} />

      <Container sx={{ flex: 1, padding: '20px', marginTop: '50px', marginLeft: sidebarOpen ? '240px' : '0', transition: 'margin-left 0.3s' }}>
        <GradientCard sx={{ width: '100%', maxWidth: '800px', margin: 'auto' }}>
          <CardContent>
            <center><Typography variant="h4" gutterBottom>
              Cylinder Booking
            </Typography></center>

            <form onSubmit={handleBookingSubmit}>
              <FormControl fullWidth margin="normal">
                <StyledLabel htmlFor="cylindersRequired">Cylinders Required</StyledLabel>
                <StyledTextField
                  type="number"
                  id="cylindersRequired"
                  name="cylindersRequired"
                  value={inputData.cylindersRequired}
                  onChange={handleInputChange}
                  error={!!errors.cylindersRequired}
                  helperText={errors.cylindersRequired}
                />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <StyledLabel htmlFor="connectionID">Connection ID</StyledLabel>
                <Select
                  id="connectionID"
                  name="connectionID"
                  value={inputData.connectionID}
                  onChange={handleInputChange}
                >
                  {approvedConnections.map((connection) => (
                    <MenuItem key={connection.connectionID} value={connection.connectionID}>
                      {connection.connectionID}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error={!!errors.connectionID}>{errors.connectionID}</FormHelperText>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <StyledLabel htmlFor="amount">Amount (₹)</StyledLabel>
                <StyledTextField
                  type="text"
                  id="amount"
                  name="amount"
                  value={inputData.amount || ""}
                  readOnly
                />
              </FormControl>

              {!bookingSubmitted ? (
                <GradientButton type="submit" variant="contained">
                  Submit Booking
                </GradientButton>
              ) : (
                <GradientButton
                  type="button"
                  variant="contained"
                  onClick={() => setShowPaymentForm(true)}
                >
                  Pay
                </GradientButton>
              )}
            </form>

            {showPaymentForm && (
              <Box sx={{ marginTop: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Payment Details
                </Typography>
                <Typography variant="body1" gutterBottom sx={{ color: "#fff" }}>
                  Amount to be Paid: ₹{inputData.amount}
                </Typography>
                <form onSubmit={handlePaymentSubmit}>
                  <FormControl fullWidth margin="normal">
                    <StyledLabel htmlFor="paymentMethod">Payment Method</StyledLabel>
                    <Select
                      id="paymentMethod"
                      name="paymentMethod"
                      value={inputData.paymentMethod}
                      onChange={handleInputChange}
                      sx={{ color: "#000", backgroundColor: "#fff" }}
                    >
                      <MenuItem value="Credit Card">Credit Card</MenuItem>
                      <MenuItem value="Debit Card">Debit Card</MenuItem>
                      <MenuItem value="Internet Banking">Internet Banking</MenuItem>
                    </Select>
                    <FormHelperText error={!!errors.paymentMethod}>{errors.paymentMethod}</FormHelperText>
                  </FormControl>

                  {inputData.paymentMethod === "Credit Card" || inputData.paymentMethod === "Debit Card" ? (
                    <>
                      <FormControl fullWidth margin="normal">
                        <StyledLabel htmlFor="cardNumber">Card Number</StyledLabel>
                        <StyledTextField
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={inputData.cardNumber}
                          onChange={handleInputChange}
                          error={!!errors.cardNumber}
                          helperText={errors.cardNumber}
                        />
                      </FormControl>

                      <FormControl fullWidth margin="normal">
                        <StyledLabel htmlFor="cardholderName">Cardholder Name</StyledLabel>
                        <StyledTextField
                          type="text"
                          id="cardholderName"
                          name="cardholderName"
                          value={inputData.cardholderName}
                          onChange={handleInputChange}
                          error={!!errors.cardholderName}
                          helperText={errors.cardholderName}
                        />
                      </FormControl>

                      <FormControl fullWidth margin="normal">
                        <StyledLabel htmlFor="expiryDate">Expiry Date</StyledLabel>
                        <StyledTextField
                          type="date"
                          id="expiryDate"
                          name="expiryDate"
                          value={inputData.expiryDate}
                          onChange={handleInputChange}
                          error={!!errors.expiryDate}
                          helperText={errors.expiryDate}
                          InputLabelProps={{ shrink: true }}
                        />
                      </FormControl>

                      <FormControl fullWidth margin="normal">
                        <StyledLabel htmlFor="cvv">CVV</StyledLabel>
                        <StyledTextField
                          type={showCardCvv ? "text" : "password"}
                          id="cvv"
                          name="cvv"
                          value={inputData.cvv}
                          onChange={handleInputChange}
                          error={!!errors.cvv}
                          helperText={errors.cvv}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShowCardCvv((prev) => !prev)}
                                  edge="end"
                                >
                                  {showCardCvv ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </FormControl>
                    </>
                  ) : (
                    <>
                      <FormControl fullWidth margin="normal">
                        <StyledLabel htmlFor="bankName">Bank Name</StyledLabel>
                        <StyledTextField
                          type="text"
                          id="bankName"
                          name="bankName"
                          value={inputData.bankName}
                          onChange={handleInputChange}
                          error={!!errors.bankName}
                          helperText={errors.bankName}
                        />
                      </FormControl>

                      <FormControl fullWidth margin="normal">
                        <StyledLabel htmlFor="accountNumber">Account Number</StyledLabel>
                        <StyledTextField
                          type="text"
                          id="accountNumber"
                          name="accountNumber"
                          value={inputData.accountNumber}
                          onChange={handleInputChange}
                          error={!!errors.accountNumber}
                          helperText={errors.accountNumber}
                        />
                      </FormControl>

                      <FormControl fullWidth margin="normal">
                        <StyledLabel htmlFor="ifscCode">IFSC Code</StyledLabel>
                        <StyledTextField
                          type={showBankIfsc ? "text" : "password"}
                          id="ifscCode"
                          name="ifscCode"
                          value={inputData.ifscCode}
                          onChange={handleInputChange}
                          error={!!errors.ifscCode}
                          helperText={errors.ifscCode}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShowBankIfsc((prev) => !prev)}
                                  edge="end"
                                >
                                  {showBankIfsc ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </FormControl>
                    </>
                  )}

                  <GradientButton type="submit" variant="contained">
                    Complete Payment
                  </GradientButton>
                </form>
              </Box>
            )}
          </CardContent>
        </GradientCard>
      </Container>
    </Box>
  );
};

export default CylinderBookingForm;


