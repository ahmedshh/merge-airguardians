import styles from "../styles/summary.module.css";

const Summary = ({ data }) => {
  const highestHumidity = Math.max(...data.map((d) => d.humidity));
  const lowestAirQuality = Math.min(...data.map((d) => d.airQuality));

  return (
    <div className={styles.mainContainer}>
      <p className={styles.summaryItem}>Highest Humidity: {highestHumidity}%</p>
      <p className={styles.summaryItem}>Lowest Air Quality: {lowestAirQuality}</p>
    </div>
  );
};

export default Summary;
