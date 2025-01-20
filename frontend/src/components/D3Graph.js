import { useRef, useEffect } from "react";
import * as d3 from "d3";
import "../styles/D3Graph.css";

const D3Graph = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    // Set dimensions and margins
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create SVG container
    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Parse data
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.time))
      .range([0, width])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => Math.max(d.humidity, d.airQuality))])
      .nice()
      .range([height, 0]);

    // Add X axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat((d, i) => (i % 2 === 0 ? d : "")))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-0.8em")
      .attr("dy", "0.15em")
      .attr("transform", "rotate(-40)");

    // Add Y axis
    svg.append("g").call(d3.axisLeft(y));

    // Add bars for Humidity
    svg
      .selectAll(".bar-humidity")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar-humidity")
      .attr("x", (d) => x(d.time))
      .attr("y", (d) => y(d.humidity))
      .attr("width", x.bandwidth() / 2)
      .attr("height", (d) => height - y(d.humidity))
      .attr("fill", "#007bff");

    // Add bars for Air Quality
    svg
      .selectAll(".bar-airquality")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar-airquality")
      .attr("x", (d) => x(d.time) + x.bandwidth() / 2)
      .attr("y", (d) => y(d.airQuality))
      .attr("width", x.bandwidth() / 2)
      .attr("height", (d) => height - y(d.airQuality))
      .attr("fill", "#28a745");
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default D3Graph;
