import Grid from "@mui/material/Grid";
import DashboardItem from "../../components/DashboardItem";
import React from "react";
import {useNavigate} from "react-router-dom";
import classes from "./HomePage.module.css"
import logo from "../../assets/images/logo-2.jpeg"

const HomePage = (props) => {
    const navigate = useNavigate();
    const handleCurrencyExchangeClick = () => {
        navigate('dovizalsat');
    };

    const handleTransactionsClick = () => {
        navigate('hesap-haraketleri');
    };
    const handleCustomerDefineClick = () => {
        navigate('musteri-tanımla');
    };

    const handleCurrencyRatesClick = () => {
        navigate('doviz-kurları');
    };

    return(
        <React.Fragment>
            <h2 className={classes['h2']}>Hoş geldiniz, {props.user.firstname + " " + props.user.lastname}</h2>
            <div className={classes['home-page-container']}>
                <Grid container direction="row" spacing={4}>
                    <Grid item md={12} display='flex' justifyContent="center" alignItems="center">
                        <img className={classes['logo']} src={logo} alt="logo" />
                    </Grid>
                    <Grid item md={12} >
                        <Grid container
                              direction="row"
                              justifyContent="center"
                              width = "100%"
                              spacing={4}
                              alignItems="center">
                            <DashboardItem onClick={handleCurrencyExchangeClick} title="Döviz Al/Sat" />
                            <DashboardItem onClick={handleCurrencyRatesClick} title="Güncel Döviz Kurları" />
                            <DashboardItem onClick={handleTransactionsClick} title="Hareketler"/>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    );
}

export default HomePage;