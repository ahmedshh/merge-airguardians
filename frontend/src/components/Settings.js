import React, { useState } from "react";
import {
  Switch,
  Typography,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import styles from "../styles/settings.module.css";

const Settings = ({ theme, toggleTheme }) => {
  // State variables for Freeze System Behavior
  const [isFreezeEnabled, setFreezeEnabled] = useState(false);
  const [responseTimeout, setResponseTimeout] = useState(1); // Default timeout is 1 minute
  const [showBackdrop, setShowBackdrop] = useState(false); // Backdrop visibility

  // Handlers
  const handleToggleFreeze = () => {
    setFreezeEnabled((prev) => !prev);
    if (!isFreezeEnabled) {
      setShowBackdrop(true);
      setTimeout(() => {
        setShowBackdrop(false);
      }, responseTimeout * 60 * 1000); // Convert minutes to milliseconds
    }
  };

  const handleTimeoutChange = (event) => {
    setResponseTimeout(event.target.value);
  };

  return (
    <div className={styles.mainContainer}>
      {/* Backdrop */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Theme Toggle */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography variant="body1">
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </Typography>
        <Switch
          checked={theme === "dark"}
          onChange={toggleTheme}
          inputProps={{ "aria-label": "theme toggle" }}
        />
      </Box>

      {/* Freeze System Behavior */}
      <Box sx={{ maxWidth: 400, margin: "0 auto", textAlign: "center" }}>
        {/* Enable/Disable System Freeze */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Typography variant="body1">Enable System Freeze</Typography>
          <Switch
            checked={isFreezeEnabled}
            onChange={handleToggleFreeze}
            inputProps={{ "aria-label": "Enable System Freeze" }}
          />
        </Box>

        {/* Response Timeout Configuration */}
        <FormControl size="small">
          <InputLabel
            id="response-timeout-label"
            sx={{
              color: theme === "dark" ? "white" : "inherit", // Change text color based on theme
            }}
          >
            Timeout
          </InputLabel>
          <Select
            labelId="response-timeout-label"
            value={responseTimeout}
            onChange={handleTimeoutChange}
            label="Timeout"
            sx={{
              color: theme === "dark" ? "white" : "inherit",
            }}
            disabled={isFreezeEnabled}
          >
            <MenuItem value={1}>1 Minute</MenuItem>
            <MenuItem value={5}>5 Minutes</MenuItem>
            <MenuItem value={10}>10 Minutes</MenuItem>
            <MenuItem value={30}>30 Minutes</MenuItem>
          </Select>
        </FormControl>

        {/* Status Display */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "50px",
            overflow: "hidden",
            marginTop: "5px",
          }}
        >
          <Typography variant="body2">
            Freeze is currently {isFreezeEnabled ? "Enabled" : "Disabled"}.
          </Typography>
          {isFreezeEnabled && (
            <Typography
              variant="body2"
              sx={{ textAlign: "center", marginTop: "8px" }}
            >
              Response Timeout: {responseTimeout} minute(s).
            </Typography>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Settings;
