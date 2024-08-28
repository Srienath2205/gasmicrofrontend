import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import AdminLogin from "./AdminLogin";
import CustomerRegister from "./CustomerRegister";
import AdminHome from "./AdminHome";
import CustomerHome from "./CustomerHome";
import ConnectionRequestForm from "./ConnectionRequestForm";
import CylinderBookingForm from "./CylinderBookingForm";
import CustomerLogin from "./CustomerLogin";
import ConnectionDistribution from "./ConnectionDistribution";
import ViewConnections from "./ViewConnections";
import AdminViewConnections from "./AdminViewConnections";
import AddDeliveryStaff from "./AddDeliveryStaff";
import ViewDeliveryStaff from "./ViewDeliveryStaff";
import PendingRequest from "./PendingRequest";
import AdminViewProfile from "./AdminViewProfile";
import AdminEditProfile from "./AdminEditProfile";
import CustomerViewProfile from "./CustomerViewProfile";
import CustomerEditProfile from "./CustomerEditProfile";
import RejectedRequest from "./RejectedRequest";
import ViewConnectionRequests from "./ViewConnectionRequests";
import ApprovedRequest from "./ApprovedRequest";
import OrderHistory from "./OrderHistory";
import AdminBooking from "./AdminBooking";
import "./index.css";
import AdminDashboard from "./AdminDashboard";
import CustomerDashboard from "./CustomerDashboard";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Admin Side */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/view-admin" element={<AdminViewProfile />} />
          <Route path="/edit-admin" element={<AdminEditProfile />} />
          <Route path="/admin-home" element={<AdminHome />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route
            path="/connection-distribution"
            element={<ConnectionDistribution />}
          />
          <Route
            path="/adminview-connections"
            element={<AdminViewConnections />}
          />
          <Route path="/add-staff" element={<AddDeliveryStaff />} />
          <Route path="/view-staff" element={<ViewDeliveryStaff />} />
          <Route path="/pendingrequest" element={<PendingRequest />} />
          <Route path="/approvedrequest" element={<ApprovedRequest />} />
          <Route path="/rejectedrequest" element={<RejectedRequest />} />
          <Route path="/adminbooking" element={<AdminBooking />} />

          {/* Customer Side */}
          <Route path="/customer-login" element={<CustomerLogin />} />
          <Route path="/customer-register" element={<CustomerRegister />} />
          <Route path="/customer-home" element={<CustomerHome />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/view-connections" element={<ViewConnections />} />
          <Route
            path="/connectionrequest"
            element={<ConnectionRequestForm />}
          />
          <Route path="/cylinder-booking" element={<CylinderBookingForm />} />
          <Route path="/cusprofile" element={<CustomerViewProfile />} />
          <Route path="/edit-cusprofile" element={<CustomerEditProfile />} />
          <Route path="/orderhistory" element={<OrderHistory />} />

          <Route path="/view-requests" element={<ViewConnectionRequests />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
