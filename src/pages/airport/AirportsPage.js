import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Collapse,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Loading from "../../components/loading";

const AirportCard = styled(Card)({
  marginBottom: 16,
  padding: "16px",
  backgroundColor: "#f5f5f5",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#e0e0e0",
  },
});

const FlightCard = styled(Card)({
  marginBottom: 8,
  padding: "12px",
  backgroundColor: "#f0f0f0",
});

const AirportsPage = () => {
  const [airports, setAirports] = useState([]);
  const [expandedAirport, setExpandedAirport] = useState(null);
  const [flights, setFlights] = useState({});
  const [loadingFlights, setLoadingFlights] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchAirports = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8222/api/v1/airports");
      setAirports(response.data);
    } catch (error) {
      console.error("Error fetching airports:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFlights = async (airportCode) => {
    setLoadingFlights(true);
    try {
      const response = await axios.get(
        `http://localhost:8222/api/v1/flights/airport-flights/${airportCode}`
      );
      setFlights((prev) => ({
        ...prev,
        [airportCode]: response.data,
      }));
    } catch (error) {
      console.error("Error fetching flights:", error);
    } finally {
      setLoadingFlights(false);
    }
  };

  const handleAirportClick = (airportCode) => {
    if (expandedAirport === airportCode) {
      setExpandedAirport(null); // Collapse if already expanded
    } else {
      setExpandedAirport(airportCode); // Expand the clicked airport
      if (!flights[airportCode]) {
        fetchFlights(airportCode); // Fetch flights if not already fetched
      }
    }
  };

  useEffect(() => {
    fetchAirports();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Airports
      </Typography>
      {airports.map((airport) => (
        <div key={airport.id}>
          <AirportCard onClick={() => handleAirportClick(airport.airportCode)}>
            <CardContent>
              <Typography variant="h6">{`Airport Name: ${airport.airportName}`}</Typography>
              <Typography>{`Code: ${airport.airportCode}`}</Typography>
              <Typography>{`City: ${airport.city}`}</Typography>
              <Typography>{`Country: ${airport.country}`}</Typography>
              <Typography>{`State: ${airport.state}`}</Typography>
            </CardContent>
          </AirportCard>
          <Collapse in={expandedAirport === airport.airportCode}>
            {loadingFlights && expandedAirport === airport.airportCode ? (
              <CircularProgress />
            ) : (
              (flights[airport.airportCode] || []).map((flight) => (
                <FlightCard key={flight.flightId}>
                  <CardContent>
                    <Typography>{`Flight Number: ${flight.flightNumber}`}</Typography>
                    <Typography>{`Departure: ${flight.departureAirportName} (${flight.departureAirportCode})`}</Typography>
                    <Typography>{`Destination: ${flight.destinationAirportName} (${flight.destinationAirportCode})`}</Typography>
                    <Typography>{`Departure Time: ${new Date(flight.departureTime).toLocaleString()}`}</Typography>
                    <Typography>{`Arrival Time: ${new Date(flight.arrivalTime).toLocaleString()}`}</Typography>
                    <Typography>{`Price: $${flight.flightCharge}`}</Typography>
                    <Divider sx={{ my: 1 }} />
                  </CardContent>
                </FlightCard>
              ))
            )}
          </Collapse>
        </div>
      ))}
    </Box>
  );
};

export default AirportsPage;
