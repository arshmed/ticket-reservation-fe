import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from "react-router-dom";
import classes from "./LoginPage.module.css";
import {authTokenCheck, setAuthToken} from "../../store/auth-store";
import useMediaQuery from '@mui/material/useMediaQuery';
import loginBackground from '../../assets/images/background-3.jpeg';
import axios from "axios";
import { useTheme } from '@mui/material/styles';
import {toast, Toaster} from "react-hot-toast";
import { setAuthenticated } from '../../store/auth-store';
import { setEmail } from '../../store/auth-store';



const Login = (props) => {
    const defaultTheme = createTheme();
    const theme = useTheme();
    const[email,setemail]=useState("");
    const[password,setPassword]=useState("");
    const[error,setError]=useState("");
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const navigate=useNavigate();

    const handleLogin = async ()=> {
        try {
            const response = await axios.post("http://localhost:8222/api/v1/auth/login", {
                email,
                password,
            });

            if (response?.status == 200) {
                toast.success("Login Successfull!", {
                    position: "top-right",
                    autoClose: 100,
                    hideProgressBar: false,
                    progress: undefined,
                    theme: "light",
                });
                setAuthenticated(true);
                props.setIsAuthenticated(true);
                setEmail(email);
                navigate("/dashboard");
            } else if (response?.data.status === "PASSIVE") {
                const error = response?.data;
                toast.error(error.message, {
                    position: "top-right",
                    autoClose: 100,
                    hideProgressBar: false,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (error) {
            if(error.response){
                toast.error(error.response?.data.message);
            }else{
                toast.error("Bir sorun oluştu!",{duration:10});
            }
        }
    }

    return(
        <ThemeProvider theme={defaultTheme}>
          <Grid container component="main" sx={{ height: '100vh',
              backgroundImage: `url(${loginBackground})`,
              backgroundSize: 'contain',
              backgroundPosition: 'left',
              backgroundRepeat: 'no-repeat'
                }}>
              <CssBaseline />
              <Grid
                  item
                  xs={false}
                  sm={4}
                  md={8}
              />
              <Grid item xs={12} sm={8} md={4} sx={{backgroundColor: isSmallScreen ? '#F9F9F7' : 'inherit',display:'flex',alignItems:'center'}}>
                  <Box
                      sx={{
                          mb:5,
                          mx: 4,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                      }}
                  >
                      <Avatar sx={{ m: 1, bgcolor: '#1E2A5E' }}>
                          <LockOutlinedIcon />
                      </Avatar>
                      <Typography component="h1" variant="h4">
                          Login
                      </Typography>
                      <Box noValidate sx={{ mt: 1 }}>
                          <TextField
                              margin="normal"
                              required
                              fullWidth
                              id="email"
                              label="email"
                              name="email"
                              autoComplete="email"
                              autoFocus
                              value={email}
                              onChange={(e) => setemail(e.target.value)}
                          />
                          <TextField
                              margin="normal"
                              required
                              fullWidth
                              name="password"
                              label="password"
                              type="password"
                              id="password"
                              autoComplete="current-password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                          />
                          <Button
                              onClick={handleLogin}
                              fullWidth
                              variant="contained"
                              sx={{ mt: 2, mb: 2 }}
                              className={classes["login-btn"]}
                          >
                              LOGIN
                          </Button>
                          <Button
                              onClick={handleLogin}
                              fullWidth
                              variant="contained"
                              sx={{ mt: 0.5, mb: 2 }}
                              className={classes["login-btn"]}
                          >
                              REGISTER
                          </Button>
                          <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
                              <Grid item md={4}>
                                  <Link href="/forgot-password" variant="body2" sx={{color:'#1E2A5E'}}>
                                      Forgot Your Password?
                                  </Link>
                              </Grid>
                          </Grid>
                      </Box>
                  </Box>
              </Grid>
          </Grid>
        </ThemeProvider>
    );
};

export default Login;