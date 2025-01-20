import styles from "../styles/timeLapseControl.module.css";

const TimeLapseControl = ({
    isPlaying,
    onTogglePlayback,
    historicalData,
    currentTimeIndex
}) => (
    <div className={styles.mainContainer}>
        <button onClick={onTogglePlayback} className={styles.playbackButton}>
            {isPlaying ? "Pause" : "Play"}
        </button>
        <span className={styles.timeDisplay}>
            Time:{" "}
            {historicalData[currentTimeIndex]
                ? historicalData[currentTimeIndex].time
                : "No Data"}
        </span>
    </div>
);

export default TimeLapseControl;