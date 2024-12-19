import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import NotFoundPage from "./pages/not-found/NotFoundPage";
import DashBoard from "./pages/dashboard/DashBoard";
import { Toaster } from "react-hot-toast";
import { getAuthenticated } from "./store/auth-store";
import AppBar from "./components/Appbar";
import FlightsPage from "./pages/flight/FlightsPage";
import AircraftFleetPage from "./pages/aircraft/AircraftFleetPage";
import AirportsPage from "./pages/airport/AirportsPage";
import FlightCreationPage from "./pages/flight/FlightCreationPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(getAuthenticated());
  const location = useLocation();

  // Determine whether the AppBar should be shown
  const showAppBar =
    isAuthenticated && !["/", "/register"].includes(location.pathname);

  return (
    <div>
      <Toaster />
      {showAppBar && <AppBar />}
      <Routes>
        <Route
          path="/"
          element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
        />
        {(isAuthenticated || getAuthenticated()) && (
          <Route path="/dashboard/*" element={<DashBoard />} />
        )}
        <Route path="/flights" element={<FlightsPage />} />
        <Route path="/flights/create" element={<FlightCreationPage />} />
        <Route path="/aircrafts" element={<AircraftFleetPage />} />
        <Route path="/airports" element={<AirportsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
