import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CircularProgressProps {
  progress: number;
}

export function CircularProgress({ progress }: CircularProgressProps) {
  const [displayProgress, setDisplayProgress] = useState(0);
  const size = 200;
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayProgress / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayProgress(progress);
    }, 100);
    return () => clearTimeout(timer);
  }, [progress]);

  const getProgressColor = () => {
    if (progress <= 40) return '#EF4444'; // red
    if (progress <= 70) return '#F59E0B'; // yellow
    if (progress <= 90) return '#6CCF8E'; // green
    return '#7091F5'; // blue
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* Progress Circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getProgressColor()}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{
            duration: 1.5,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      </svg>
      
      {/* Percentage Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-gray-900"
          style={{ fontSize: '48px', fontWeight: 700 }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {displayProgress}%
        </motion.span>
        <span className="text-gray-600" style={{ fontSize: '14px', fontWeight: 500 }}>
          Kesiapan
        </span>
      </div>
    </div>
  );
}
