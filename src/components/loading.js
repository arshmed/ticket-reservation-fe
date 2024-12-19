import React from "react";
import logo from "../assets/images/logo.png";
import classes from "./loading.module.css";

const Loading = () => {
  return (
    <div className={classes.loadingContainer}>
      <img src={logo} alt="loading" className={classes.logo} />
    </div>
  );
};

export default Loading;
