
import React, { useEffect, useState } from 'react';

interface LineChartData {
  points: number[];
  color: string;
  strokeWidth?: number;
}

interface LineChartProps {
  data: LineChartData[];
  labels: string[];
  maxValue: number;
  title: string;
  legends: { label: string; color: string }[];
  filterOptions?: string[];
  selectedFilter?: string;
  onFilterChange?: (filter: string) => void;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  labels,
  maxValue,
  title,
  legends,
  filterOptions,
  selectedFilter,
  onFilterChange
}) => {
  const [animated, setAnimated] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimated(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const chartHeight = 150;
  const chartWidth = 280;
  const padding = 20;
  
  // Calculate the spacing between points
  const spacing = (chartWidth - 2 * padding) / (labels.length - 1);
  
  const renderPath = (points: number[], color: string, strokeWidth = 2) => {
    if (!animated) return null;
    
    let path = `M ${padding},${chartHeight - (points[0] / maxValue) * chartHeight + padding}`;
    
    for (let i = 1; i < points.length; i++) {
      const x = i * spacing + padding;
      const y = chartHeight - (points[i] / maxValue) * chartHeight + padding;
      path += ` L ${x},${y}`;
    }
    
    return (
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        className="line-chart-line"
      />
    );
  };
  
  return (
    <div className="p-4 bg-white rounded-xl animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">{title}</h3>
        
        {filterOptions && (
          <div className="flex">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                className={`text-xs px-3 py-1 rounded-full transition-colors ${
                  selectedFilter === filter
                    ? 'bg-slate-200 text-slate-800'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
                onClick={() => onFilterChange && onFilterChange(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-4 mb-4">
        {legends.map((legend, index) => (
          <div key={index} className="flex items-center">
            <span
              className="inline-block w-3 h-3 rounded-full mr-1"
              style={{ backgroundColor: legend.color }}
            ></span>
            <span className="text-xs text-slate-600">{legend.label}</span>
          </div>
        ))}
      </div>
      
      <div className="relative h-[190px]">
        <svg width="100%" height="100%" viewBox={`0 0 ${chartWidth + padding * 2} ${chartHeight + padding * 2}`}>
          {/* Y-axis labels */}
          <text x="0" y={padding} className="text-[10px] fill-slate-400">
            {maxValue}
          </text>
          <text x="0" y={chartHeight / 2 + padding} className="text-[10px] fill-slate-400">
            {maxValue / 2}
          </text>
          <text x="0" y={chartHeight + padding} className="text-[10px] fill-slate-400">
            0
          </text>
          
          {/* X-axis labels */}
          {labels.map((label, i) => (
            <text
              key={i}
              x={i * spacing + padding}
              y={chartHeight + padding * 2}
              textAnchor="middle"
              className="text-[10px] fill-slate-400"
            >
              {label}
            </text>
          ))}
          
          {/* Render lines */}
          {data.map((line, index) => renderPath(line.points, line.color, line.strokeWidth))}
        </svg>
      </div>
    </div>
  );
};

export default LineChart;
