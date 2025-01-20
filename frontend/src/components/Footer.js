import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900], // Dark background
  color: theme.palette.common.white, // White text
  padding: theme.spacing(3, 2), // Padding
  textAlign: 'center',
}));

const FooterLinks = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(1.5), // Space between elements
}));

const Footer = () => {
  const getCurrentYear = () => new Date().getFullYear();

  return (
    <FooterContainer component="footer">
      {/* Company Name and Year */}
      <Typography variant="body2" gutterBottom>
        &copy; {getCurrentYear()} AirGuardians. All rights reserved.
      </Typography>

      {/* Links */}
      <FooterLinks>
        <Link href="#" underline="hover" color="inherit">
          Privacy Policy
        </Link>
        <Typography variant="body2" component="span">
          |
        </Typography>
        <Link href="#" underline="hover" color="inherit">
          Terms of Service
        </Link>
      </FooterLinks>
    </FooterContainer>
  );
};

export default Footer;
