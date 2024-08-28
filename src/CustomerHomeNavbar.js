import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Container,
  IconButton,
  InputBase,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  ContactMail as ContactMailIcon,
  AccountCircle as AccountCircleIcon,
  Edit as EditIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";

const CustomerHomeNavbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElProfile, setAnchorElProfile] = React.useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleProfileMenuOpen = (event) =>
    setAnchorElProfile(event.currentTarget);
  const handleProfileMenuClose = () => setAnchorElProfile(null);

  const handleLogOut = () => {
    navigate("/customer-login");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(90deg, #C33764, #1D2671)",
        height: "80px",
      }}
    >
      <Container>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontSize: "25px",
              fontFamily: "Verdana",
              fontWeight: "bold",
              fontStyle: "italic",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <img
              src="https://static.vecteezy.com/system/resources/previews/003/223/499/non_2x/lpg-tank-gas-cylinder-icon-vector.jpg"
              alt="LPG Gas Cylinder"
              style={{ width: "60px", height: "60px", marginRight: "8px" }}
            />
            LPG Connect
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuOpen}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => navigate("/customer-home")}>
                  <HomeIcon sx={{ mr: 1 }} /> Home
                </MenuItem>
                <MenuItem onClick={handleProfileMenuOpen}>
                  <PersonIcon sx={{ mr: 1 }} /> Profile
                </MenuItem>
                <Menu
                  anchorEl={anchorElProfile}
                  open={Boolean(anchorElProfile)}
                  onClose={handleProfileMenuClose}
                >
                  <MenuItem onClick={() => navigate("/cusprofile")}>
                    <AccountCircleIcon sx={{ mr: 1 }} /> View Profile
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/edit-cusprofile")}>
                    <EditIcon sx={{ mr: 1 }} /> Edit Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogOut}>
                    <ExitToAppIcon sx={{ mr: 1 }} /> Log Out
                  </MenuItem>
                </Menu>
                <Divider />
                <MenuItem>
                  <InputBase
                    placeholder="Search"
                    sx={{
                      ml: 1,
                      flex: 1,
                      backgroundColor: "white",
                      borderRadius: "4px",
                      px: 1,
                    }}
                    startAdornment={<SearchIcon sx={{ mr: 1 }} />}
                  />
                </MenuItem>
              </Menu>
            </>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Button
                color="inherit"
                onClick={() => navigate("/customer-home")}
                startIcon={<HomeIcon />}
              >
                Home
              </Button>
              <Button
                color="inherit"
                onClick={handleProfileMenuOpen}
                startIcon={<PersonIcon />}
              >
                Profile
              </Button>
              <Menu
                anchorEl={anchorElProfile}
                open={Boolean(anchorElProfile)}
                onClose={handleProfileMenuClose}
              >
                <MenuItem onClick={() => navigate("/cusprofile")}>
                  <AccountCircleIcon sx={{ mr: 1 }} /> View Profile
                </MenuItem>
                <MenuItem onClick={() => navigate("/edit-cusprofile")}>
                  <EditIcon sx={{ mr: 1 }} /> Edit Profile
                </MenuItem>
                <MenuItem onClick={handleLogOut}>
                  <ExitToAppIcon sx={{ mr: 1 }} /> Log Out
                </MenuItem>
              </Menu>
              <div style={{ flexGrow: 1 }}>
                <InputBase
                  placeholder="Search"
                  sx={{
                    ml: 1,
                    flex: 1,
                    backgroundColor: "white",
                    borderRadius: "4px",
                    px: 1,
                  }}
                  startAdornment={<SearchIcon sx={{ mr: 1 }} />}
                />
              </div>
            </div>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default CustomerHomeNavbar;
