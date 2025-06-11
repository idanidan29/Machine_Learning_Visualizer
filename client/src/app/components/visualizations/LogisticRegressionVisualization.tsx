import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Card, CardContent, Typography, Slider } from '@mui/material';

interface Point {
  x: number;
  y: number;
  label: number;
}

const LogisticRegressionVisualization: React.FC = () => {
  const sigmoidRef = useRef<SVGSVGElement>(null);
  const classificationRef = useRef<SVGSVGElement>(null);
  const [inputValue, setInputValue] = useState<number>(0);
  const [outputValue, setOutputValue] = useState<number>(0.5);
  const [weight1, setWeight1] = useState<number>(1);
  const [weight2, setWeight2] = useState<number>(1);
  const [bias, setBias] = useState<number>(0);
  const [dataPoints] = useState<Point[]>(() => {
    const points: Point[] = [];
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * 8 - 4;
      const y = Math.random() * 8 - 4;
      const label = x + y > 0 ? 1 : 0;
      points.push({ x, y, label });
    }
    return points;
  });

  // Sigmoid function
  const sigmoid = (x: number): number => {
    return 1 / (1 + Math.exp(-x));
  };

  // Handle scroll for sigmoid point
  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (!sigmoidRef.current) return;
      
      const delta = event.deltaY > 0 ? -0.1 : 0.1;
      const newX = Math.max(-6, Math.min(6, inputValue + delta));
      const newY = sigmoid(newX);
      
      setInputValue(Number(newX.toFixed(2)));
      setOutputValue(Number(newY.toFixed(2)));
    };

    const sigmoidElement = sigmoidRef.current;
    if (sigmoidElement) {
      sigmoidElement.addEventListener('wheel', handleScroll);
    }

    return () => {
      if (sigmoidElement) {
        sigmoidElement.removeEventListener('wheel', handleScroll);
      }
    };
  }, [inputValue]);

  // Sigmoid visualization effect
  useEffect(() => {
    if (!sigmoidRef.current) return;

    // Clear previous content
    d3.select(sigmoidRef.current).selectAll("*").remove();

    // Set up dimensions
    const containerWidth = sigmoidRef.current.parentElement?.clientWidth || 800;
    const margin = { top: 20, right: 150, bottom: 40, left: 40 };
    const width = containerWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // Create SVG
    const svg = d3.select(sigmoidRef.current)
      .attr("width", "100%")
      .attr("height", height + margin.top + margin.bottom)
      .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create scales
    const xScale = d3.scaleLinear()
      .domain([-6, 6])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, 1])
      .range([height, 0]);

    // Create axes with white text
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .attr("color", "white");

    svg.append("g")
      .call(d3.axisLeft(yScale))
      .attr("color", "white");

    // Create sigmoid curve
    const line = d3.line<number>()
      .x(d => xScale(d))
      .y(d => yScale(sigmoid(d)))
      .curve(d3.curveBasis);

    const points = d3.range(-6, 6.1, 0.1);
    
    svg.append("path")
      .datum(points)
      .attr("fill", "none")
      .attr("stroke", "#8B5CF6")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Add labels with white text
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 5)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .text("z");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -margin.left + 15)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .text("σ(z)");

    // Add point with color based on classification
    svg.append("circle")
      .attr("cx", xScale(inputValue))
      .attr("cy", yScale(outputValue))
      .attr("r", 8)
      .attr("fill", outputValue >= 0.5 ? "#8B5CF6" : "#F472B6")
      .attr("cursor", "pointer");

    // Add value display with white text
    const valueDisplay = svg.append("g")
      .attr("transform", `translate(${width + 10}, 0)`);

    valueDisplay.append("text")
      .attr("class", "input-value")
      .attr("y", 20)
      .attr("fill", "white")
      .text(`Input (z): ${inputValue.toFixed(2)}`);

    valueDisplay.append("text")
      .attr("class", "output-value")
      .attr("y", 40)
      .attr("fill", "white")
      .text(`Output σ(z): ${outputValue.toFixed(2)}`);

    valueDisplay.append("text")
      .attr("class", "classification")
      .attr("y", 60)
      .attr("fill", outputValue >= 0.5 ? "#8B5CF6" : "#F472B6")
      .text(`Class: ${outputValue >= 0.5 ? "1" : "0"}`);

  }, [inputValue, outputValue]);

  // Classification visualization effect
  useEffect(() => {
    if (!classificationRef.current) return;

    // Clear previous content
    d3.select(classificationRef.current).selectAll("*").remove();

    // Set up dimensions
    const containerWidth = classificationRef.current.parentElement?.clientWidth || 800;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const width = containerWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // Create SVG
    const svg = d3.select(classificationRef.current)
      .attr("width", "100%")
      .attr("height", height + margin.top + margin.bottom)
      .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create scales
    const xScale = d3.scaleLinear()
      .domain([-4, 4])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([-4, 4])
      .range([height, 0]);

    // Create axes with white text
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .attr("color", "white");

    svg.append("g")
      .call(d3.axisLeft(yScale))
      .attr("color", "white");

    // Plot points
    svg.selectAll("circle")
      .data(dataPoints)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("r", 5)
      .attr("fill", d => d.label === 1 ? "#8B5CF6" : "#F472B6");

    // Draw decision boundary
    const line = d3.line<number>()
      .x(d => xScale(d))
      .y(d => yScale((-weight1 * d - bias) / weight2))
      .curve(d3.curveLinear);

    const boundaryPoints = d3.range(-4, 4.1, 0.1);
    
    svg.append("path")
      .datum(boundaryPoints)
      .attr("fill", "none")
      .attr("stroke", "#8B5CF6")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5")
      .attr("d", line);

    // Add probability heatmap
    const probabilityScale = d3.scaleSequential()
      .domain([0, 1])
      .interpolator(d3.interpolateRgb("#F472B6", "#8B5CF6"));

    const gridSize = 20;
    const xStep = width / gridSize;
    const yStep = height / gridSize;

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = xScale.invert(i * xStep);
        const y = yScale.invert(j * yStep);
        const probability = sigmoid(weight1 * x + weight2 * y + bias);
        
        svg.append("rect")
          .attr("x", i * xStep)
          .attr("y", j * yStep)
          .attr("width", xStep)
          .attr("height", yStep)
          .attr("fill", probabilityScale(probability))
          .attr("opacity", 0.2);
      }
    }

    // Add labels with white text
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 5)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .text("Feature 1");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -margin.left + 15)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .text("Feature 2");

  }, [dataPoints, weight1, weight2, bias]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      padding: '16px',
      backgroundColor: '#101828',
      color: 'white',
      minHeight: '100vh',
      maxWidth: '100%'
    }}>
      <Typography variant="h5" gutterBottom style={{ color: 'white' }}>
        Logistic Regression Visualization
      </Typography>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
        <Card style={{ backgroundColor: '#1F2937', color: 'white', width: '100%' }}>
          <CardContent style={{ width: '100%', overflow: 'hidden' }}>
            <Typography variant="h6" gutterBottom style={{ color: 'white' }}>
              Sigmoid Function
            </Typography>
            <Typography variant="body2" style={{ color: '#D1D5DB', marginBottom: '16px' }}>
              The sigmoid function σ(z) = 1/(1 + e^(-z)) maps any real number to a value between 0 and 1.
              Use the slider or mouse wheel to move the point along the curve.
            </Typography>
            
            <div style={{ marginBottom: '16px' }}>
              <Typography variant="body2" style={{ color: '#D1D5DB', marginBottom: '8px' }}>
                Input Value (z)
              </Typography>
              <Slider
                value={inputValue}
                onChange={(_, value) => {
                  const newX = value as number;
                  const newY = sigmoid(newX);
                  setInputValue(Number(newX.toFixed(2)));
                  setOutputValue(Number(newY.toFixed(2)));
                }}
                min={-6}
                max={6}
                step={0.1}
                sx={{ color: '#8B5CF6' }}
              />
            </div>

            <div style={{ width: '100%', overflow: 'hidden' }}>
              <svg ref={sigmoidRef}></svg>
            </div>
          </CardContent>
        </Card>

        <Card style={{ backgroundColor: '#1F2937', color: 'white', width: '100%' }}>
          <CardContent style={{ width: '100%', overflow: 'hidden' }}>
            <Typography variant="h6" gutterBottom style={{ color: 'white' }}>
              Classification Visualization
            </Typography>
            <Typography variant="body2" style={{ color: '#D1D5DB', marginBottom: '16px' }}>
              This visualization shows how logistic regression separates two classes using a decision boundary.
              Purple points represent class 1, pink points represent class 0.
            </Typography>

            <div style={{ marginBottom: '24px' }}>
              <Typography variant="subtitle1" style={{ color: 'white', marginBottom: '8px' }}>
                Model Parameters
              </Typography>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                <div style={{ flex: 1 }}>
                  <Typography variant="body2" style={{ color: '#D1D5DB' }}>Weight 1</Typography>
                  <Slider
                    value={weight1}
                    onChange={(_, value) => setWeight1(value as number)}
                    min={-2}
                    max={2}
                    step={0.1}
                    sx={{ color: '#8B5CF6' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <Typography variant="body2" style={{ color: '#D1D5DB' }}>Weight 2</Typography>
                  <Slider
                    value={weight2}
                    onChange={(_, value) => setWeight2(value as number)}
                    min={-2}
                    max={2}
                    step={0.1}
                    sx={{ color: '#8B5CF6' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <Typography variant="body2" style={{ color: '#D1D5DB' }}>Bias</Typography>
                  <Slider
                    value={bias}
                    onChange={(_, value) => setBias(value as number)}
                    min={-2}
                    max={2}
                    step={0.1}
                    sx={{ color: '#8B5CF6' }}
                  />
                </div>
              </div>
            </div>

            <div style={{ width: '100%', overflow: 'hidden' }}>
              <svg ref={classificationRef}></svg>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LogisticRegressionVisualization;
