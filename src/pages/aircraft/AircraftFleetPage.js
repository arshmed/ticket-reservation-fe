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

const AircraftCard = styled(Card)({
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

const AircraftFleetPage = () => {
  const [aircrafts, setAircrafts] = useState([]);
  const [expandedAircraft, setExpandedAircraft] = useState(null);
  const [flights, setFlights] = useState({});
  const [loadingFlights, setLoadingFlights] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchAircrafts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8222/api/v1/aircraft");
      setAircrafts(response.data);
    } catch (error) {
      console.error("Error fetching aircrafts:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFlights = async (tailNumber) => {
    setLoadingFlights(true);
    try {
      const response = await axios.get(
        `http://localhost:8222/api/v1/flights/aircraft-flights/${tailNumber}`
      );
      setFlights((prev) => ({
        ...prev,
        [tailNumber]: response.data,
      }));
    } catch (error) {
      console.error("Error fetching flights:", error);
    } finally {
      setLoadingFlights(false);
    }
  };

  const handleAircraftClick = (tailNumber) => {
    if (expandedAircraft === tailNumber) {
      setExpandedAircraft(null); // Collapse if already expanded
    } else {
      setExpandedAircraft(tailNumber); // Expand the clicked aircraft
      if (!flights[tailNumber]) {
        fetchFlights(tailNumber); // Fetch flights if not already fetched
      }
    }
  };

  useEffect(() => {
    fetchAircrafts();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Aircraft Fleet
      </Typography>
      {aircrafts.map((aircraft) => (
        <div key={aircraft.id}>
          <AircraftCard onClick={() => handleAircraftClick(aircraft.tailNumber)}>
            <CardContent>
              <Typography variant="h6">{`Tail Number: ${aircraft.tailNumber}`}</Typography>
              <Typography>{`Manufacturer: ${aircraft.manufacturer}`}</Typography>
              <Typography>{`Model: ${aircraft.model}`}</Typography>
              <Typography>{`Number of Seats: ${aircraft.seatNumber}`}</Typography>
            </CardContent>
          </AircraftCard>
          <Collapse in={expandedAircraft === aircraft.tailNumber}>
            {loadingFlights && expandedAircraft === aircraft.tailNumber ? (
              <CircularProgress />
            ) : (
              (flights[aircraft.tailNumber] || []).map((flight) => (
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

export default AircraftFleetPage;
