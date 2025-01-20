import React from "react";
import { Box, Container, Typography, Avatar, Paper, Button, Card, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from '@mui/material/Grid2';
import logo from '../images/logo.png';

const HeroSection = styled(Box)(({ theme }) => ({
  backgroundColor: '#06402B',
  color: theme.palette.common.white,
  padding: theme.spacing(6, 2),
  textAlign: "center",
}));

const Section = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(6),
}));

const TeamAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(8),
  height: theme.spacing(8),
  marginBottom: theme.spacing(1),
}));

const Footer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[800],
  color: theme.palette.common.white,
  padding: theme.spacing(4),
  textAlign: "center",
}));

// Styled Card with hover effect
const HoverCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[5],
  },
}));

const AboutPage = () => {
  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
      <Box component="img" 
              src={logo}
              alt="AirGuardians Logo" 
              sx={{ height: 60, width: 80, marginRight: 1 }} 
          />
        <Typography variant="h3" gutterBottom>
          Welcome to AirGuardians
        </Typography>
        <Typography variant="h5">
          Breathe Easy, Live Healthy
        </Typography>
       
      </HeroSection>

      <Container>
        {/* Introduction Section */}
        <Section mt={2}>
          <Typography variant="h4" gutterBottom>
            Introduction
          </Typography>
          <Typography variant="body1">
            AirGuardians is your personal indoor air quality companion. Our system monitors humidity levels
            and air quality in real-time to ensure a safe and productive indoor environment. Designed for
            modern living, AirGuardians empowers users with actionable insights to improve their indoor air
            quality and overall well-being.
          </Typography>
        </Section>

        {/* Key Features Section */}
        <Section>
          <Typography variant="h4" gutterBottom>
            Key Features
          </Typography>
          <Paper elevation={3} style={{ padding: 16 }}>
            <Typography variant="body1">
              • Real-Time Monitoring: Stay updated with live air quality and humidity readings.
            </Typography>
            <Typography variant="body1">
              • Actionable Insights: Receive tailored recommendations to improve your environment.
            </Typography>
            <Typography variant="body1">
              • Interactive Dashboard: View trends and make informed decisions effortlessly.
            </Typography>
            <Typography variant="body1">
              • Critical Alerts: Be notified of dangerous air quality levels with freeze functionality for safety.
            </Typography>
          </Paper>
        </Section>

        {/* How It Works Section */}
        <Section>
          <Typography variant="h4" gutterBottom>
            How It Works
          </Typography>
          <Typography variant="body1">
            Our system uses advanced sensors to continuously monitor indoor air quality and humidity. The
            data is processed in real-time and visualized on an interactive dashboard. Users are notified of
            critical issues and guided on steps to improve their indoor environment.
          </Typography>
        </Section>

        {/* Mission and Vision Section */}
       {/* Mission and Vision Section */}
       <Section>
       <Typography variant="h4" gutterBottom align="center" mb={3}>
            Misson and Vision
          </Typography>
          <Grid container spacing={4}>
            {/* Mission Card */}
            <Grid size ={6}>
              <HoverCard  sx={{ minHeight: 150 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Mission
                  </Typography>
                  <Typography variant="body1">
                    To enhance indoor air awareness and encourage healthier living.
                  </Typography>
                </CardContent>
              </HoverCard>
            </Grid>

            {/* Vision Card */}
            <Grid size ={6}>
              <HoverCard  sx={{ minHeight: 150 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Vision
                  </Typography>
                  <Typography variant="body1">
                    To create a safer and healthier environment for every individual, especially in
                    work-from-home and urban settings.
                  </Typography>
                </CardContent>
              </HoverCard>
            </Grid>
          </Grid>
        </Section>

        {/* About the Team Section */}
        <Section>
          <Typography variant="h4" gutterBottom align="center" mb={3}>
            Meet the AirGuardians Team
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid size={6} textAlign="center" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              <TeamAvatar alt="Frontend" src="/path-to-avatar-1.jpg" />
              <Typography variant="body1">Frontend Team</Typography>
              <Typography variant="caption">Creating an intuitive and interactive dashboard.</Typography>
            </Grid>
            <Grid item size={6} textAlign="center" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              <TeamAvatar alt="Backend" src="/path-to-avatar-2.jpg" />
              <Typography variant="body1">Backend Team</Typography>
              <Typography variant="caption">Ensuring reliable data processing and communication.</Typography>
            </Grid>
            <Grid item size={6} textAlign="center" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              <TeamAvatar alt="Hardware" src="/path-to-avatar-3.jpg" />
              <Typography variant="body1">Hardware Team</Typography>
              <Typography variant="caption">Configuring sensors for real-time monitoring.</Typography>
            </Grid>
            <Grid item size={6} textAlign="center" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              <TeamAvatar alt="Data" src="/path-to-avatar-4.jpg" />
              <Typography variant="body1">Data Team</Typography>
              <Typography variant="caption">Processing and integrating sensor data seamlessly.</Typography>
            </Grid>
          </Grid>
        </Section>

        {/* Contact Information Section */}
        <Section>
          <Typography variant="h4" gutterBottom align="center">
            Contact Information
          </Typography>
          <Typography variant="body1" align="center">
            If you have any feedback or questions, feel free to contact us at:
          </Typography>
          <Typography variant="body1" align="center">
            Email: <Button href="mailto:support@airguardians.com">support@airguardians.com</Button>
          </Typography>
        </Section>
      </Container>

      {/* Footer Section */}
      <Footer>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} AirGuardians. All rights reserved.
        </Typography>
      </Footer>
    </Box>
  );
};

export default AboutPage;
