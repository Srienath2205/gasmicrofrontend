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
} from "@mui/material";
import {
  Home,
  ExpandMore,
  ExpandLess,
  ExitToApp,
  ViewList,
  AddCircle,
  ArrowBack,
  Book,
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

const CustomerSidebar = ({ open, handleDrawerClose }) => {
  const [anchorElConnections, setAnchorElConnections] = useState(null);
  const [openMenuConnections, setOpenMenuConnections] = useState(false);
  const [anchorElBookings, setAnchorElBookings] = useState(null);
  const [openMenuBookings, setOpenMenuBookings] = useState(false);
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const [openMenuProfile, setOpenMenuProfile] = useState(false);
  const navigate = useNavigate();

  const handleClickConnections = (event) => {
    setAnchorElConnections(event.currentTarget);
    setOpenMenuConnections(!openMenuConnections);
  };

  const handleCloseConnections = () => {
    setAnchorElConnections(null);
    setOpenMenuConnections(false);
  };

  const handleClickBookings = (event) => {
    setAnchorElBookings(event.currentTarget);
    setOpenMenuBookings(!openMenuBookings);
  };

  const handleCloseBookings = () => {
    setAnchorElBookings(null);
    setOpenMenuBookings(false);
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
    navigate("/");
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
            <span>Services</span>
          </Title>

          {/* Home Link */}
          <ListItemStyled button component={Link} to="/customer-dashboard">
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
              to="/view-connections"
              onClick={handleCloseConnections}
            >
              <ListItemIcon>
                <ViewList sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="View Connections" />
            </MenuItem>
            <MenuItem
              component={Link}
              to="/view-requests"
              onClick={handleCloseConnections}
            >
              <ListItemIcon>
                <ViewList sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="View Requests" />
            </MenuItem>
          </Menu>

          {/* Bookings Menu */}
          <ListItemStyled button onClick={handleClickBookings}>
            <ListItemIcon>
              <Book sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Bookings" />
            <RightArrow
              sx={{
                color: "#fff",
                transform: openMenuBookings ? "rotate(90deg)" : "rotate(0deg)",
              }}
            />
          </ListItemStyled>
          <Menu
            anchorEl={anchorElBookings}
            open={openMenuBookings}
            onClose={handleCloseBookings}
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
              to="/orderhistory"
              onClick={handleCloseBookings}
            >
              <ListItemIcon>
                <ViewList sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="View Bookings" />
            </MenuItem>
            <MenuItem
              component={Link}
              to="/cylinder-booking"
              onClick={handleCloseBookings}
            >
              <ListItemIcon>
                <AddCircle sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Add Booking" />
            </MenuItem>
          </Menu>
        </List>
      </SidebarContent>

      {/* Logout Button at the Bottom */}
      <Divider />
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

export default CustomerSidebar;
