import { useRef, useEffect } from "react";
import * as d3 from "d3";

const Donut = ({ entity, data }) => {
    const svgRef = useRef();

    const defaultChartData = [
        { name: "residualValue", value: 100 - data },
        { name: "actualValue", value: data },
    ];

    const aqiChartData = [
        { name: "residualValue", value: 500 - data },
        { name: "actualValue", value: data },
    ];

    const details = {
        entity: entity.toLowerCase() === "humidity" ? "Humidity" : entity.toLowerCase() === "aqi" ? "AQI" : "Value",
        value: entity.toLowerCase() === "humidity" ? `${data}%` : data,
        remark:
            entity.toLowerCase() === "humidity"
                ? data > 60
                    ? "High"
                    : data < 30
                        ? "Low"
                        : "Optimal"
                : data <= 50
                    ? "Good"
                    : data <= 100
                        ? "Moderate"
                        : data <= 150
                            ? "Not Good"
                            : data <= 200
                                ? "Unhealthy"
                                : data <= 300
                                    ? "Very Unhealthy"
                                    : "Hazardous",
        color:
            entity.toLowerCase() === "humidity"
                ? data > 60
                    ? "#FF0000" // High: Red
                    : data < 30
                        ? "#FFA500" // Low: Orange
                        : "#008000" // Optimal: Green
                : data <= 50
                    ? "#008000" // Good: Green
                    : data <= 100
                        ? "#FFFF00" // Moderate: Yellow
                        : data <= 150
                            ? "#FFA500" // Unhealthy for Sensitive Groups: Orange
                            : data <= 200
                                ? "#FF0000" // Unhealthy: Red
                                : data <= 300
                                    ? "#800080" // Very Unhealthy: Purple
                                    : "#800000", // Hazardous: Maroon
    };

    useEffect(() => {
        const width = 350;
        const height = 350;
        const margin = 30;
        const radius = Math.min(width, height) / 2 - margin;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const g = svg
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);

        const pie = d3.pie().value((d) => d.value);
        const dataReady = pie(entity.toLowerCase() === "aqi" ? aqiChartData : defaultChartData);

        g.selectAll("path")
            .data(dataReady)
            .join("path")
            .attr(
                "d",
                d3
                    .arc()
                    .innerRadius(90) // Size of the donut hole
                    .outerRadius(radius)
            )
            .attr("fill", (d) => {
                if (d.data.name === "residualValue") {
                    return "grey";
                }
                return details.color;
            })
            .attr("stroke", "black")
            .style("stroke-width", "2px")
            .style("opacity", 0.7);

        // DONUT'S CENTER DETAILS (ENTITY, VALUE, REMARK)
        g.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "-1.5em")
            .style("font-size", "20px")
            .style("font-weight", "bold")
            .style("fill", "#333")
            .text(details.entity);

        g.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "0em")
            .style("font-size", "24px")
            .style("font-weight", "bold")
            .style("fill", "#000")
            .text(details.value);

        g.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "1.5em")
            .style("font-size", "16px")
            .style("fill", details.color)
            .text(details.remark);
    }, [data, details]);

    return <svg ref={svgRef}></svg>;
};

export default Donut;

// TODO: Reduce size of the donut chart
// TODO: Choose right colors
// TODO: Make sure the DETAILS are displayed properly (centralized and styled properly)

// TODO: Add responsiveness, animations, and transitions, etc.