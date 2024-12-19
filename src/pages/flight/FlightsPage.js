import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Card, CardContent, Divider, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading";

const FlightCard = styled(Card)({
  marginBottom: 16,
  padding: "16px",
  backgroundColor: "#f5f5f5",
});

const FlightsPage = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchFlights = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8222/api/v1/flights");
      setFlights(response.data);
    } catch (error) {
      console.error("Error fetching flights:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <Box sx={{ padding: 4, mt: 8 }}>
      {/* Add margin-top to avoid conflict with AppBar */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          Available Flights
        </Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#1E2A5E", color: "white" }}
          onClick={() => navigate("/flights/create")}
        >
          Create Flight
        </Button>
      </Box>
      {flights.map((flight) => (
        <FlightCard key={flight.flightId}>
          <CardContent>
            <Typography variant="h6">{`Flight Number: ${flight.flightNumber}`}</Typography>
            <Typography>{`Aircraft: ${flight.aircraftManufacturer} ${flight.aircraftModel}`}</Typography>
            <Typography>{`Departure: ${flight.departureAirportName} (${flight.departureAirportCode})`}</Typography>
            <Typography>{`Destination: ${flight.destinationAirportName} (${flight.destinationAirportCode})`}</Typography>
            <Typography>{`Departure Time: ${new Date(flight.departureTime).toLocaleString()}`}</Typography>
            <Typography>{`Arrival Time: ${new Date(flight.arrivalTime).toLocaleString()}`}</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" color="primary">
              {`Price: $${flight.flightCharge}`}
            </Typography>
          </CardContent>
        </FlightCard>
      ))}
    </Box>
  );
};

export default FlightsPage;
