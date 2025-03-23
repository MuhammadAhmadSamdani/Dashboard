
import React from 'react';

interface PieChartData {
  value: number;
  color: string;
  label: string;
}

interface PieChartProps {
  data: PieChartData[];
  totalLabel: string;
  totalValue: number;
  legendItems: { label: string; value: string | number; color: string }[];
}

const PieChart: React.FC<PieChartProps> = ({ data, totalLabel, totalValue, legendItems }) => {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const center = 100;
  
  let currentOffset = 0;
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="flex flex-col items-center">
      <div className="pie-chart-container w-[200px] h-[200px]">
        <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
          {data.map((segment, i) => {
            const segmentPercentage = segment.value / total;
            const segmentSize = segmentPercentage * circumference;
            const dashArray = `${segmentSize} ${circumference - segmentSize}`;
            const offsetStroke = currentOffset;
            currentOffset += segmentSize;
            
            return (
              <circle
                key={i}
                cx={center}
                cy={center}
                r={radius}
                fill="transparent"
                stroke={segment.color}
                strokeWidth="30"
                strokeDasharray={dashArray}
                strokeDashoffset={-offsetStroke}
                className="transition-all duration-1000 ease-out"
                style={{ transition: `stroke-dashoffset 1s ease ${i * 0.2}s` }}
              />
            );
          })}
          
          {/* Inner circle */}
          <circle
            cx={center}
            cy={center}
            r="60"
            fill="white"
          />
        </svg>
        
        <div className="pie-chart-center">
          <span className="block text-3xl font-bold">{totalValue}</span>
          <span className="text-sm text-slate-500">{totalLabel}</span>
        </div>
      </div>
      
      <div className="flex justify-center mt-4 space-x-6">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center">
            <span 
              className="inline-block w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: item.color }}
            ></span>
            <span className="text-sm">
              {item.label}: <span className="font-medium">{item.value}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;
