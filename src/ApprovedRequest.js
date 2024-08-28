import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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

export default function ApprovedRequest() {
  const [requests, setRequests] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    loadApprovedRequests();
  }, []);

  const loadApprovedRequests = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8787/requestside/getApprovedRequestList"
      );
      setRequests(result.data);
    } catch (error) {
      console.error("Error fetching approved requests:", error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AdminSidebar
        open={sidebarOpen}
        handleDrawerClose={() => setSidebarOpen(!sidebarOpen)}
      />

      <Box sx={{ flex: 1, padding: "20px" }}>
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
          Approved Connection Requests
        </Typography>

        <Box
          sx={{
            width: "100%",
            maxWidth: "1200px",
            margin: "auto",
            overflowX: "auto",
          }}
        >
          {requests.length === 0 ? (
            <Typography
              variant="h6"
              sx={{ color: "#fff", textAlign: "center" }}
            >
              No Approved Requests!
            </Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Request ID</StyledTableCell>
                    <StyledTableCell>Customer ID</StyledTableCell>
                    <StyledTableCell>Date of Birth</StyledTableCell>
                    <StyledTableCell>Address</StyledTableCell>
                    <StyledTableCell>Gender</StyledTableCell>
                    <StyledTableCell>Aadhar Number</StyledTableCell>
                    <StyledTableCell>Pan Number</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                    <StyledTableCell>Connection Date</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {requests.map((request) => (
                    <StyledTableRow key={request.connectionID}>
                      <StyledTableCell>{request.connectionID}</StyledTableCell>
                      <StyledTableCell>
                        {request.customer.customerID}
                      </StyledTableCell>
                      <StyledTableCell>
                        {new Date(request.dateOfBirth).toLocaleDateString()}
                      </StyledTableCell>
                      <StyledTableCell>{request.address}</StyledTableCell>
                      <StyledTableCell>{request.gender}</StyledTableCell>
                      <StyledTableCell>{request.aadharNumber}</StyledTableCell>
                      <StyledTableCell>{request.panNumber}</StyledTableCell>
                      <StyledTableCell>{request.status}</StyledTableCell>
                      <StyledTableCell>
                        {new Date(request.connectionDate).toLocaleDateString()}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>
    </Box>
  );
}
