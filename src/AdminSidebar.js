import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Divider,
  IconButton,
} from "@mui/material";
import {
  Home,
  Pending,
  CheckCircle,
  Cancel,
  ExpandMore,
  ExpandLess,
  ArrowBack,
  ExitToApp,
  AddCircle,
  ViewList,
  Add,
  Person,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const drawerWidth = 240;

const Sidebar = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  display: "flex",
  flexDirection: "column",
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    background: "linear-gradient(45deg, #C33764, #1D2671)",
    color: "#fff",
  },
}));

const Title = styled("div")(({ theme }) => ({
  textAlign: "center",
  margin: "20px 0",
  color: "#fff",
}));

const ListItemStyled = styled(ListItem)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const RightArrow = styled(ExpandMore)(({ theme }) => ({
  transition: "transform 0.3s",
}));

const SidebarContent = styled("div")(({ theme }) => ({
  flex: 1,
}));

const AdminSidebar = ({ open, handleDrawerClose }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorElConnections, setAnchorElConnections] = useState(null);
  const [openMenuConnections, setOpenMenuConnections] = useState(false);
  const [anchorElBooking, setAnchorElBooking] = useState(null);
  const [openMenuBooking, setOpenMenuBooking] = useState(false);
  const [anchorElStaff, setAnchorElStaff] = useState(null);
  const [openMenuStaff, setOpenMenuStaff] = useState(false);
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const [openMenuProfile, setOpenMenuProfile] = useState(false);
  const navigate = useNavigate();

  const handleClickRequests = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(!openMenu);
  };

  const handleCloseRequests = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleClickConnections = (event) => {
    setAnchorElConnections(event.currentTarget);
    setOpenMenuConnections(!openMenuConnections);
  };

  const handleCloseConnections = () => {
    setAnchorElConnections(null);
    setOpenMenuConnections(false);
  };

  const handleClickBooking = (event) => {
    setAnchorElBooking(event.currentTarget);
    setOpenMenuBooking(!openMenuBooking);
  };

  const handleCloseBooking = () => {
    setAnchorElBooking(null);
    setOpenMenuBooking(false);
  };

  const handleClickStaff = (event) => {
    setAnchorElStaff(event.currentTarget);
    setOpenMenuStaff(!openMenuStaff);
  };

  const handleCloseStaff = () => {
    setAnchorElStaff(null);
    setOpenMenuStaff(false);
  };

  const handleClickProfile = (event) => {
    setAnchorElProfile(event.currentTarget);
    setOpenMenuProfile(!openMenuProfile);
  };

  const handleCloseProfile = () => {
    setAnchorElProfile(null);
    setOpenMenuProfile(false);
  };

  const handleLogout = () => {
    navigate("/admin-login");
  };

  return (
    <Sidebar variant="persistent" anchor="left" open={open}>
      <SidebarContent>
        <List>
          {/* Back Arrow */}
          <ListItem button onClick={() => navigate("/admin-home")}>
            <ListItemIcon>
              <ArrowBack sx={{ color: "#fff" }} />
            </ListItemIcon>
          </ListItem>

          {/* Admin Dashboard Title */}
          <Title>
            <span>Admin Services</span>
          </Title>

          {/* Dashboard Link */}
          <ListItemStyled button component={Link} to="/admin-dashboard">
            <ListItemIcon>
              <Home sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemStyled>

          {/* Connections Menu */}
          <ListItemStyled button onClick={handleClickConnections}>
            <ListItemIcon>
              <AddCircle sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Connections" />
            <RightArrow
              sx={{
                color: "#fff",
                transform: openMenuConnections
                  ? "rotate(90deg)"
                  : "rotate(0deg)",
              }}
            />
          </ListItemStyled>
          <Menu
            anchorEl={anchorElConnections}
            open={openMenuConnections}
            onClose={handleCloseConnections}
            PaperProps={{
              style: {
                width: 200,
                background: "linear-gradient(45deg, #C33764, #1D2671)",
                color: "#fff",
                marginLeft: drawerWidth,
              },
            }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem
              component={Link}
              to="/connection-distribution"
              onClick={handleCloseConnections}
            >
              <ListItemIcon>
                <Add sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Add Connection" />
            </MenuItem>
            <MenuItem
              component={Link}
              to="/adminview-connections"
              onClick={handleCloseConnections}
            >
              <ListItemIcon>
                <ViewList sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="View Connections" />
            </MenuItem>
          </Menu>

          {/* Requests Menu */}
          <ListItemStyled button onClick={handleClickRequests}>
            <ListItemIcon>
              <Pending sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Requests" />
            <RightArrow
              sx={{
                color: "#fff",
                transform: openMenu ? "rotate(90deg)" : "rotate(0deg)",
              }}
            />
          </ListItemStyled>
          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleCloseRequests}
            PaperProps={{
              style: {
                width: 200,
                background: "linear-gradient(45deg, #C33764, #1D2671)",
                color: "#fff",
                marginLeft: drawerWidth,
              },
            }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem
              component={Link}
              to="/pendingrequest"
              onClick={handleCloseRequests}
            >
              <ListItemIcon>
                <Pending sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Pending Requests" />
            </MenuItem>
            <MenuItem
              component={Link}
              to="/approvedrequest"
              onClick={handleCloseRequests}
            >
              <ListItemIcon>
                <CheckCircle sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Approved Requests" />
            </MenuItem>
            <MenuItem
              component={Link}
              to="/rejectedrequest"
              onClick={handleCloseRequests}
            >
              <ListItemIcon>
                <Cancel sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Rejected Requests" />
            </MenuItem>
          </Menu>

          {/* Booking Menu */}
          <ListItemStyled button onClick={handleClickBooking}>
            <ListItemIcon>
              <Add sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Booking" />
            <RightArrow
              sx={{
                color: "#fff",
                transform: openMenuBooking ? "rotate(90deg)" : "rotate(0deg)",
              }}
            />
          </ListItemStyled>
          <Menu
            anchorEl={anchorElBooking}
            open={openMenuBooking}
            onClose={handleCloseBooking}
            PaperProps={{
              style: {
                width: 200,
                background: "linear-gradient(45deg, #C33764, #1D2671)",
                color: "#fff",
                marginLeft: drawerWidth,
              },
            }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem
              component={Link}
              to="/adminbooking"
              onClick={handleCloseBooking}
            >
              <ListItemIcon>
                <ViewList sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="View Bookings" />
            </MenuItem>
          </Menu>

          {/* Staff Menu */}
          <ListItemStyled button onClick={handleClickStaff}>
            <ListItemIcon>
              <AddCircle sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Staff" />
            <RightArrow
              sx={{
                color: "#fff",
                transform: openMenuStaff ? "rotate(90deg)" : "rotate(0deg)",
              }}
            />
          </ListItemStyled>
          <Menu
            anchorEl={anchorElStaff}
            open={openMenuStaff}
            onClose={handleCloseStaff}
            PaperProps={{
              style: {
                width: 200,
                background: "linear-gradient(45deg, #C33764, #1D2671)",
                color: "#fff",
                marginLeft: drawerWidth,
              },
            }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem
              component={Link}
              to="/add-staff"
              onClick={handleCloseStaff}
            >
              <ListItemIcon>
                <Add sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Add Delivery Staff" />
            </MenuItem>
            <MenuItem
              component={Link}
              to="/view-staff"
              onClick={handleCloseStaff}
            >
              <ListItemIcon>
                <ViewList sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="View Delivery Staff" />
            </MenuItem>
          </Menu>
        </List>
      </SidebarContent>
      {/* Profile Menu */}
      <ListItemStyled button onClick={handleClickProfile}>
        <ListItemIcon>
          <Person sx={{ color: "#fff" }} />
        </ListItemIcon>
        <ListItemText primary="Profile" />
        <RightArrow
          sx={{
            color: "#fff",
            transform: openMenuProfile ? "rotate(90deg)" : "rotate(0deg)",
          }}
        />
      </ListItemStyled>
      <Menu
        anchorEl={anchorElProfile}
        open={openMenuProfile}
        onClose={handleCloseProfile}
        PaperProps={{
          style: {
            width: 200,
            background: "linear-gradient(45deg, #C33764, #1D2671)",
            color: "#fff",
            marginLeft: drawerWidth,
          },
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem
          component={Link}
          to="/cusprofile"
          onClick={handleCloseProfile}
        >
          <ListItemIcon>
            <ViewList sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="View Profile" />
        </MenuItem>
        <MenuItem
          component={Link}
          to="/edit-cusprofile"
          onClick={handleCloseProfile}
        >
          <ListItemIcon>
            <AddCircle sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Edit Profile" />
        </MenuItem>
      </Menu>

      {/* Logout Button at the Bottom */}
      <Divider />
      <List>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <ExitToApp sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItem>
      </List>
    </Sidebar>
  );
};

export default AdminSidebar;
