import { useRef, useEffect } from "react";
import * as d3 from "d3";

const ChartDisplay = ({ data, chartType }) => {
  const svgRef = useRef();

  useEffect(() => {
    // Clear the previous chart
    d3.select(svgRef.current).selectAll("*").remove();

    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", [0, 0, width, height])
      .style("overflow", "visible");

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.time))
      .range([margin.left, width - margin.right + 100])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => Math.max(d.humidity, d.airQuality))])
      .range([height - margin.bottom, margin.top]);

    // Add axes
    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickSizeOuter(0));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale));

    // Draw the appropriate chart
    if (chartType === "histogram") {
      // Histogram: bars for humidity and air quality
      svg
        .selectAll(".bar-humidity")
        .data(data)
        .join("rect")
        .attr("class", "bar-humidity")
        .attr("x", (d) => xScale(d.time))
        .attr("y", (d) => yScale(d.humidity))
        .attr("width", xScale.bandwidth() / 4)
        .attr("height", (d) => yScale(0) - yScale(d.humidity))
        .attr("fill", "steelblue");

      svg
        .selectAll(".bar-air-quality")
        .data(data)
        .join("rect")
        .attr("class", "bar-air-quality")
        .attr("x", (d) => xScale(d.time) + xScale.bandwidth() / 4)
        .attr("y", (d) => yScale(d.airQuality))
        .attr("width", xScale.bandwidth() / 4)
        .attr("height", (d) => yScale(0) - yScale(d.airQuality))
        .attr("fill", "green");
    } else {
      // Line Chart: humidity and air quality trends
      const lineHumidity = d3
        .line()
        .x((d) => xScale(d.time) + xScale.bandwidth() / 2)
        .y((d) => yScale(d.humidity))
        .curve(d3.curveMonotoneX);

      const lineAirQuality = d3
        .line()
        .x((d) => xScale(d.time) + xScale.bandwidth() / 2)
        .y((d) => yScale(d.airQuality))
        .curve(d3.curveMonotoneX);

      svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", lineHumidity);

      svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "green")
        .attr("stroke-width", 2)
        .attr("d", lineAirQuality);
    }
  }, [data, chartType]);

  return <svg ref={svgRef}></svg>;
};

export default ChartDisplay;
