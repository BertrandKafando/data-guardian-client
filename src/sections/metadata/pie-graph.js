import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Box, height, width } from '@mui/system';
import { Typography } from '@mui/material';

const PieGraph = ({ data = [], title = "", colors = [], height=300, width=300 }) => {
  const pieSvgRef = useRef();
  const legendSvgRef = useRef();

  useEffect(() => {
    
    const radius = Math.min(width, height) / 2;

    // Pie Chart SVG
    const pieSvg = d3.select(pieSvgRef.current).attr('width', width).attr('height', height);

    let color = d3.scaleOrdinal().range(['#66c2a5', '#fc8d62']);

    if (colors.length > 0){
      color = d3.scaleOrdinal().range(colors);
    }

    const pie = d3.pie().value((d) => d.value);

    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(radius);

    const arcs = pieSvg
      .selectAll('arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    arcs
      .append('path')
      .attr('fill', (d, i) => color(i))
      .attr('d', arc);

    

    arcs
      .append('text')
      .attr('transform', (d) => 'translate(' + arc.centroid(d) + ')')
      .style('text-anchor', 'middle')
      .text((d) => `${(d.data.value / d3.sum(data, (d) => d.value) * 100).toFixed(1)}%`);

    // Legend SVG
    const legendSvg = d3.select(legendSvgRef.current).attr('width', width+100).attr('height', 180);

    const legend = legendSvg
      .selectAll('.legend')
      .data(data.map((d) => d.label))
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => `translate(15, ${50*i + 5})`); // Adjust spacing and positioning

    legend
      .append('rect')
      .attr('width', 18)
      .attr('height', 18)
      .style('fill', (d, i) => color(i));

    legend
      .append('text')
      .attr('x', 24) // Adjust spacing between rect and text
      .attr('y', 9)
      .attr('dy', '.35em')
      .style('text-anchor', 'start')
      .text((d) => d);


  }, [data, title]);

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
      <Typography variant='h6' sx={{marginBottom: '12px', fontSize: '16px'}}>{title}</Typography>
      <svg ref={pieSvgRef}></svg>
      <svg ref={legendSvgRef}></svg>
    </Box>
  );
};

export default PieGraph;
