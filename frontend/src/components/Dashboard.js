import Donut from "./Donut";
import TemperatureWidget from "./TemperatureWidget";
import styles from "../styles/dashboard.module.css";
import { Grid } from "@mui/material";

const Dashboard = ({ humidity, airQuality, temperature }) => {
  return (
    <Grid container spacing={2} className={styles.mainContainer}>
      {/* Room Temperature */}
      <Grid item xs={12} className={styles.centeredWidget}>
        <TemperatureWidget temperature={temperature} />
      </Grid>

      {/* Donut Charts Side by Side */}
      <Grid item xs={12}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {/* Humidity Donut Chart */}
          <Grid item xs={12} sm={6} className={styles.donutChart}>
            <Donut entity={"Humidity"} data={humidity} />
          </Grid>

          {/* AQI Donut Chart */}
          <Grid item xs={12} sm={6} className={styles.donutChart}>
            <Donut entity={"AQI"} data={airQuality} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
