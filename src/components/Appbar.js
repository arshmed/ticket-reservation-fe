import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import logo from "../assets/images/logo.png";
import classes from "./DashBoard.module.css";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

const AppBarTemplate = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const AppBar = () => {
  return (
    <AppBarTemplate position="absolute">
      <Toolbar
        sx={{
          pr: "24px",
          bgcolor: "#1E2A5E",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link to="/dashboard" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
            <img className={classes["logo"]} alt="logo" src={logo} height={70} />
            <Typography
              variant="h5"
              color="inherit"
              sx={{ ml: 2, fontWeight: "bold", color: "white" }}
            >
              TravelX
            </Typography>
          </Link>
        </Box>
        <Box sx={{ ml: "auto", display: "flex", gap: 3 }}>
          <Link to="/flights" style={{ textDecoration: "none", color: "white" }}>
            <Typography variant="h6">Flights</Typography>
          </Link>
          <Link to="/aircrafts" style={{ textDecoration: "none", color: "white" }}>
            <Typography variant="h6">Aircraft Fleet</Typography>
          </Link>
          <Link to="/airports" style={{ textDecoration: "none", color: "white" }}>
            <Typography variant="h6">Airports</Typography>
          </Link>
        </Box>
      </Toolbar>
    </AppBarTemplate>
  );
};

export default AppBar;
