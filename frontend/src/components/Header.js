import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import { styled } from '@mui/material/styles';
import logo from '../images/logo.png';

const CustomAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#06402B', // Custom background color
}));

const NavLink = styled('a')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: 'inherit',
  gap: theme.spacing(0.5),
  padding: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  transition: 'color 0.3s ease',
  '&:hover': {
    color: '#F2A365', // Change text color on hover
  },
}));

const Header = () => {
  return (
    <CustomAppBar position="static">
      <Toolbar>
        <Box component="img" 
            src={logo}
            alt="AirGuardians Logo" 
            sx={{ height: 30, width: 40, marginRight: 1 }} 
        />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          AirGuardians
        </Typography>

        {/* Navigation */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <NavLink href="/">
            <DashboardIcon />
            <Typography variant="body1">Dashboard</Typography>
          </NavLink>

          <NavLink href="/about">
            <InfoIcon />
            <Typography variant="body1">About</Typography>
          </NavLink>

          {/* <NavLink href="/settings">
            <SettingsIcon />
            <Typography variant="body1">Settings</Typography>
          </NavLink> */}
        </Box>
      </Toolbar>
    </CustomAppBar>
  );
};

export default Header;
