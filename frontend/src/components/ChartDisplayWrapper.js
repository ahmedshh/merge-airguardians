import ChartDisplay from "./ChartDisplay";
import styles from "../styles/chartDisplayWrapper.module.css";

const ChartDisplayWrapper = ({
    data,
    chartType,
    toggleChartType,
}) => {
    return (
        <div>
            <div className={styles.chartControls}>
                <button onClick={toggleChartType} className={styles.chartTypeToggleBtn}>
                    Switch to {chartType === "histogram" ? "Line Chart" : "Histogram"}
                </button>
            </div>
            <ChartDisplay data={data} chartType={chartType} />
        </div>
    );
}

export default ChartDisplayWrapper;