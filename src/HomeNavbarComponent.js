import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";

const LPG_ICON_URL =
  "https://static.vecteezy.com/system/resources/previews/003/223/499/non_2x/lpg-tank-gas-cylinder-icon-vector.jpg";

const HomeNavbarComponent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElAdmin, setAnchorElAdmin] = React.useState(null);
  const [anchorElCustomer, setAnchorElCustomer] = React.useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleAdminMenuOpen = (event) => setAnchorElAdmin(event.currentTarget);
  const handleAdminMenuClose = () => setAnchorElAdmin(null);
  const handleCustomerMenuOpen = (event) =>
    setAnchorElCustomer(event.currentTarget);
  const handleCustomerMenuClose = () => setAnchorElCustomer(null);

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(90deg, #C33764, #1D2671)", // Celestial color gradient
        height: "80px", // Increased height
      }}
    >
      <Container>
        <Toolbar sx={{ height: "100%" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontFamily: "Verdana",
              fontWeight: "bold",
              fontStyle: "italic",
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: "24px",
            }}
          >
            <img
              src={LPG_ICON_URL}
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
                sx={{ mr: 2, fontSize: "30px" }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Button
                      startIcon={<HomeIcon sx={{ fontSize: "20px" }} />}
                      sx={{ fontSize: "16px" }}
                    >
                      Home
                    </Button>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleAdminMenuOpen}>
                  <Button
                    startIcon={
                      <AdminPanelSettingsIcon sx={{ fontSize: "20px" }} />
                    }
                    sx={{ fontSize: "16px" }}
                  >
                    Admin
                  </Button>
                </MenuItem>
                <Menu
                  anchorEl={anchorElAdmin}
                  open={Boolean(anchorElAdmin)}
                  onClose={handleAdminMenuClose}
                >
                  <MenuItem onClick={handleAdminMenuClose}>
                    <Link
                      to="/admin-login"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Button
                        startIcon={<LoginIcon sx={{ fontSize: "20px" }} />}
                        sx={{ fontSize: "16px" }}
                      >
                        Login
                      </Button>
                    </Link>
                  </MenuItem>
                </Menu>
                <MenuItem onClick={handleCustomerMenuOpen}>
                  <Button
                    startIcon={<PersonAddIcon sx={{ fontSize: "20px" }} />}
                    sx={{ fontSize: "16px" }}
                  >
                    Customer
                  </Button>
                </MenuItem>
                <Menu
                  anchorEl={anchorElCustomer}
                  open={Boolean(anchorElCustomer)}
                  onClose={handleCustomerMenuClose}
                >
                  <MenuItem onClick={handleCustomerMenuClose}>
                    <Link
                      to="/customer-register"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Button
                        startIcon={<PersonAddIcon sx={{ fontSize: "20px" }} />}
                        sx={{ fontSize: "16px" }}
                      >
                        Register
                      </Button>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCustomerMenuClose}>
                    <Link
                      to="/customer-login"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Button
                        startIcon={<LoginIcon sx={{ fontSize: "20px" }} />}
                        sx={{ fontSize: "16px" }}
                      >
                        Login
                      </Button>
                    </Link>
                  </MenuItem>
                </Menu>
              </Menu>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/"
                startIcon={<HomeIcon sx={{ fontSize: "20px" }} />}
                sx={{ fontSize: "18px" }}
              >
                Home
              </Button>
              <Button
                color="inherit"
                onClick={handleAdminMenuOpen}
                startIcon={<AdminPanelSettingsIcon sx={{ fontSize: "20px" }} />}
                sx={{ fontSize: "18px" }}
              >
                Admin
              </Button>
              <Menu
                anchorEl={anchorElAdmin}
                open={Boolean(anchorElAdmin)}
                onClose={handleAdminMenuClose}
              >
                <MenuItem onClick={handleAdminMenuClose}>
                  <Link
                    to="/admin-login"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Button
                      startIcon={<LoginIcon sx={{ fontSize: "20px" }} />}
                      sx={{ fontSize: "16px" }}
                    >
                      Login
                    </Button>
                  </Link>
                </MenuItem>
              </Menu>
              <Button
                color="inherit"
                onClick={handleCustomerMenuOpen}
                startIcon={<PersonAddIcon sx={{ fontSize: "20px" }} />}
                sx={{ fontSize: "18px" }}
              >
                Customer
              </Button>
              <Menu
                anchorEl={anchorElCustomer}
                open={Boolean(anchorElCustomer)}
                onClose={handleCustomerMenuClose}
              >
                <MenuItem onClick={handleCustomerMenuClose}>
                  <Link
                    to="/customer-register"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Button
                      startIcon={<PersonAddIcon sx={{ fontSize: "20px" }} />}
                      sx={{ fontSize: "16px" }}
                    >
                      Register
                    </Button>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCustomerMenuClose}>
                  <Link
                    to="/customer-login"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Button
                      startIcon={<LoginIcon sx={{ fontSize: "20px" }} />}
                      sx={{ fontSize: "16px" }}
                    >
                      Login
                    </Button>
                  </Link>
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default HomeNavbarComponent;
