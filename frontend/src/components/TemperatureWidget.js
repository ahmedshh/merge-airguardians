import React from "react";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "var(--card-background)",
  color: "var(--text-color)",
  ...theme.typography.body2,
  padding: theme.spacing(1), // Reduced padding
  textAlign: "center",
  borderRadius: "8px",
  minHeight: "150px", // Reduced height
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const TemperatureWidget = ({ temperature }) => {
  return (
    <Item>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <ThermostatIcon sx={{ fontSize: "36px", color: "#ff5722" }} />
        </Grid>
        <Grid item>
          <Typography variant="h6">Room Temperature</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5">
            {temperature !== undefined ? `${temperature}°C` : "Loading..."}
          </Typography>
        </Grid>
      </Grid>
    </Item>
  );
};

export default TemperatureWidget;
