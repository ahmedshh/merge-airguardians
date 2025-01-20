import styles from "../styles/alerts.module.css";

const Alerts = ({ humidity, airQuality }) => {
  return (
    <div className={styles.mainContainer}>
      <p className={styles.alertItem}>
        {humidity > 60
          ? "High humidity! Use a dehumidifier."
          : humidity < 30
          ? "Low humidity! Use a humidifier."
          : "Humidity levels are optimal."}
      </p>
      <p className={styles.alertItem}>
        {airQuality > 100
          ? "Poor air quality! Avoid outdoor activities."
          : airQuality > 50
          ? "Moderate air quality. Be cautious."
          : "Air quality is good."}
      </p>
    </div>
  );
};

export default Alerts;
