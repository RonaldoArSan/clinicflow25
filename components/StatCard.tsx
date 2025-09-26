import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  color?: string;
  prefix?: string;
  suffix?: string;
  darkMode?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  color = "blue", 
  prefix = "", 
  suffix = "",
  darkMode = false 
}) => {
  return (
    <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-6 rounded-lg shadow-sm border transition-colors`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            {title}
          </p>
          <p className={`text-2xl font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
            {prefix}{value}{suffix}
          </p>
          {change !== undefined && (
            <p className={`text-sm ${change > 0 
              ? darkMode ? "text-green-400" : "text-green-600" 
              : darkMode ? "text-red-400" : "text-red-600"
            }`}>
              {change > 0 ? "+" : ""}{change}% este mês
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${darkMode ? `bg-${color}-900/30` : `bg-${color}-100`}`}>
          <Icon className={`w-6 h-6 ${darkMode ? `text-${color}-400` : `text-${color}-600`}`} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;