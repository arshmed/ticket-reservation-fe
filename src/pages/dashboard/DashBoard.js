import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import HomePage from "../home/HomePage";
import { Login } from "@mui/icons-material";
import { getEmail } from "../../store/auth-store";
import Loading from "../../components/loading";
import FlightsPage from "../flight/FlightsPage";
import AppBar from "../../components/Appbar";


// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
// }));

const defaultTheme = createTheme();

const DashBoard = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const email = getEmail();

  const fetchUser = () => {
    setLoading(true);
    axios
      .get(`http://localhost:8222/api/v1/customers/find-by-email/${email}`, {
      })
      .then((response) => {
        setUser(response?.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        // console.log(err.response?.data.message());
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {loading ? (
          <Loading />
        ) : (
          <>
            <AppBar position="absolute">
            </AppBar>

            <Box
              component="main"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: "100vh",
                overflow: "auto",
                width: "100%",
              }}
            >
              <Container maxWidth="xl" sx={{ mt: 10, mb: 4, width: "100%" }}>
                <Routes>
                  <Route path={"/"} element={<HomePage user={user} />} />
                  <Route path={"/flights"} element={<FlightsPage />} />
                  {/* <Route path={"dovizalsat/*"} element={<CurrencyExchangePage />} />
                <Route
                    path={"hesap-haraketleri"}
                    element={<TransactionsPage />}
                />
                  <Route
                      path={"doviz-kurları"}
                      element={<CurrencyRatesPage/>}
                  />

                <Route
                    path={"müsteri-yonetim/*"}
                    element={<CustomerManagementPage />}
                />
                <Route
                    path={"musteri-tanımla"}
                    element={<DefineCustomerPage />}
                /> */}

                  <>
                    <Route
                      path={"personel-update"}
                      element={<Login />}
                    />
                    <Route
                      path={"personel-define"}
                      element={<Login />}
                    />
                    <Route
                      path={"edit-personel"}
                      element={<Login />}
                    />
                  </>

                </Routes>
              </Container>
            </Box>
          </>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default DashBoard;
