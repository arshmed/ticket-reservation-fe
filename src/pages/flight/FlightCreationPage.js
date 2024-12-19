import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FlightCreationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    flightNumber: "",
    aircraftTailNumber: "",
    departureAirportCode: "",
    destinationAirportCode: "",
    departureDate: "",
    arrivalDate: "",
    departureTime: "",
    arrivalTime: "",
    flightCharge: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8222/api/v1/flights", {
        ...formData,
        flightCharge: parseFloat(formData.flightCharge),
      });
      toast.success("Flight created successfully!");
      navigate("/flights");
    } catch (error) {
      // Extract the main error message
      const errorMessage = error.response?.data?.message || "An error occurred";

      // Extract the validation errors from the "fields" array
      const fieldErrors = error.response?.data?.fields || [];

      // Display the main error message
      toast.error(errorMessage);

      // Display each validation error as a separate toast
      fieldErrors.forEach((fieldError) => {
        toast.error(fieldError);
      });
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create a New Flight
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Flight Number"
          name="flightNumber"
          value={formData.flightNumber}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Aircraft Tail Number"
          name="aircraftTailNumber"
          value={formData.aircraftTailNumber}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Departure Airport Code"
          name="departureAirportCode"
          value={formData.departureAirportCode}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Destination Airport Code"
          name="destinationAirportCode"
          value={formData.destinationAirportCode}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Departure Date"
          name="departureDate"
          type="date"
          value={formData.departureDate}
          onChange={handleChange}
          margin="normal"
          required
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Arrival Date"
          name="arrivalDate"
          type="date"
          value={formData.arrivalDate}
          onChange={handleChange}
          margin="normal"
          required
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Departure Time"
          name="departureTime"
          type="datetime-local"
          value={formData.departureTime}
          onChange={handleChange}
          margin="normal"
          required
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Arrival Time"
          name="arrivalTime"
          type="datetime-local"
          value={formData.arrivalTime}
          onChange={handleChange}
          margin="normal"
          required
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Flight Charge"
          name="flightCharge"
          type="number"
          value={formData.flightCharge}
          onChange={handleChange}
          margin="normal"
          required
        />
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

export default FlightCreationPage;
