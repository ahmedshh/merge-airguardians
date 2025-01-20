import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/about"; 
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Alerts from "./components/Alerts";
import Footer from "./components/Footer";
import Settings from "./components/Settings";
import Summary from "./components/Summary";
import ChartDisplayWrapper from "./components/ChartDisplayWrapper";
import TimeLapseControl from "./components/TimeLapseControl";
import "./styles/app.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import SensorsIcon from "@mui/icons-material/Sensors";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssessmentIcon from "@mui/icons-material/Assessment";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "var(--card-background)",
  color: "var(--text-color)",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
}));

const App = () => {
  const [humidity, setHumidity] = useState(0);
  const [airQuality, setAirQuality] = useState(0);
  const [temperature, setTemperature] = useState(0); // New state for temperature
  const [historicalData, setHistoricalData] = useState([]);
  const [currentTimeIndex, setCurrentTimeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [chartType, setChartType] = useState("histogram");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

   // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/");
        const data = await response.json();
        setAirQuality(data.air_quality_level);
        setHumidity(data.air_humidity_level);
	setTemperature(data.temperature)
        setHistoricalData((prev) => [
          // ...prev.slice(-10), // changed this line
          ...prev.slice(-1), // changed this line
          {
            time: new Date().toLocaleTimeString(),
            humidity: data.air_humidity_level,
            airQuality: data.air_quality_level,
	    temperature: data.temperature
           },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    // const interval = setInterval(fetchData, 5000); // Fetch every 5 seconds
    const interval = setInterval(fetchData, 200); // Fetch every 100 micro second

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    if (isPlaying) {
      const playbackInterval = setInterval(() => {
        setCurrentTimeIndex((prev) =>
          prev < historicalData.length - 1 ? prev + 1 : 0
        );
      }, 1000);

      return () => clearInterval(playbackInterval);
    }
  }, [isPlaying, historicalData]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const togglePlayback = () => {
    setIsPlaying((prev) => !prev);
  };

  const toggleChartType = () => {
    setChartType((prevType) => (prevType === "histogram" ? "line" : "histogram"));
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Header />
              <main>
                <Box sx={{ flexGrow: 1, margin: 2 }}>
                  <Grid container spacing={2}>
                    <Grid size={6}>
                      <Item>
                        <Grid container alignItems="center">
                          <Grid item>
                            <SensorsIcon sx={{ marginRight: 1 }} />
                          </Grid>
                          <Grid item>
                            <Typography variant="h5" gutterBottom align="left">
                              Sensors Information
                            </Typography>
                          </Grid>
                        </Grid>
                        <Dashboard
                          humidity={historicalData[currentTimeIndex]?.humidity || humidity}
                          airQuality={historicalData[currentTimeIndex]?.airQuality || airQuality}
                          temperature={historicalData[currentTimeIndex]?.temperature || temperature} // Pass temperature
                        />
                      </Item>
                    </Grid>
                    <Grid size={3}>
                      <Item>
                        <Grid container alignItems="center">
                          <Grid item>
                            <NotificationsIcon sx={{ marginRight: 1 }} />
                          </Grid>
                          <Grid item>
                            <Typography variant="h5" gutterBottom align="left">
                              Notifications
                            </Typography>
                          </Grid>
                        </Grid>
                        <Alerts
                          humidity={historicalData[currentTimeIndex]?.humidity || humidity}
                          airQuality={historicalData[currentTimeIndex]?.airQuality || airQuality}
                        />
                      </Item>
                      <Item sx={{ marginTop: 2, height: "215px" }}>
                        <Grid container alignItems="center">
                          <Grid item>
                            <AssignmentIcon sx={{ marginRight: 1 }} />
                          </Grid>
                          <Grid item>
                            <Typography variant="h5" gutterBottom align="left">
                              Summary
                            </Typography>
                          </Grid>
                        </Grid>
                        <Summary data={historicalData} />
                      </Item>
                    </Grid>
                    <Grid size={3}>
                      <Item>
                        <Grid container alignItems="center">
                          <Grid item>
                            <SettingsIcon sx={{ marginRight: 1 }} />
                          </Grid>
                          <Grid item>
                            <Typography variant="h5" gutterBottom align="left">
                              Settings
                            </Typography>
                          </Grid>
                        </Grid>
                        <Settings theme={theme} toggleTheme={toggleTheme} />
                      </Item>
                      <Item sx={{ marginTop: 2 }}>
                        <TimeLapseControl
                          isPlaying={isPlaying}
                          onTogglePlayback={togglePlayback}
                          historicalData={historicalData}
                          currentTimeIndex={currentTimeIndex}
                        />
                      </Item>
                    </Grid>
                    <Grid size={12}>
                      <Item>
                        <Grid container alignItems="center">
                          <Grid item>
                            <AssessmentIcon sx={{ marginRight: 1 }} />
                          </Grid>
                          <Grid item>
                            <Typography variant="h5" gutterBottom align="left">
                              Information Graph
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid item sx={{ width: "850px", margin: "0 auto" }}>
                          <ChartDisplayWrapper
                            data={historicalData.slice(0, currentTimeIndex + 1)}
                            chartType={chartType}
                            toggleChartType={toggleChartType}
                          />
                        </Grid>
                      </Item>
                    </Grid>
                  </Grid>
                </Box>
              </main>
              <Footer />
            </div>
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
