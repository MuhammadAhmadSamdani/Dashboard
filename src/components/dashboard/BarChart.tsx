
import React, { useEffect, useState } from 'react';

interface BarChartData {
  label: string;
  values: {
    value: number;
    color: string;
  }[];
}

interface BarChartProps {
  data: BarChartData[];
  maxValue: number;
  title: string;
  legends: { label: string; color: string }[];
}

const BarChart: React.FC<BarChartProps> = ({ data, maxValue, title, legends }) => {
  const [animated, setAnimated] = useState(false);
  
  useEffect(() => {
    // Trigger animation after component mount
    const timer = setTimeout(() => {
      setAnimated(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="p-4 bg-white rounded-xl animate-fade-in">
      <h3 className="font-medium mb-2">{title}</h3>
      
      <div className="flex items-center space-x-3 mb-4">
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
      
      <div className="flex items-end justify-between h-[180px] mt-6">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="relative flex items-end justify-center w-full h-[150px]">
              {item.values.map((bar, barIndex) => {
                const barHeight = animated ? (bar.value / maxValue) * 150 : 0;
                return (
                  <div
                    key={barIndex}
                    className="bar-chart-bar mx-1 w-5 rounded-t-sm"
                    style={{
                      height: `${barHeight}px`,
                      backgroundColor: bar.color,
                      transition: `height 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.1}s`
                    }}
                  ></div>
                );
              })}
            </div>
            <div className="text-xs text-slate-600 mt-2">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChart;
