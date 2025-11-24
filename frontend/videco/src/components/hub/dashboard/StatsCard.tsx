// src/components/hub/dashboard/StatsCard.tsx
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'orange' | 'purple' | 'red';
  onClick?: () => void;
}

const colorClasses = {
  blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
  green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
  orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
  purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
  red: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
};

/**
 * 统计卡片组件
 * 用于展示关键指标
 */
export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  color = 'blue',
  onClick,
}) => {
  const isClickable = !!onClick;

  return (
    <div
      onClick={onClick}
      className={`
        p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm
        ${isClickable ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}
      `}
    >
      {/* 图标和趋势 */}
      <div className="flex items-start justify-between mb-3">
        {icon && (
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <span className="text-2xl">{icon}</span>
          </div>
        )}
        {trend && (
          <div
            className={`flex items-center text-sm ${
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {trend.isPositive ? (
              <TrendingUp className="h-4 w-4 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1" />
            )}
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>

      {/* 标题 */}
      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
        {title}
      </h3>

      {/* 数值 */}
      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
        {value}
      </div>

      {/* 副标题 */}
      {subtitle && (
        <p className="text-sm text-gray-500 dark:text-gray-500">{subtitle}</p>
      )}
    </div>
  );
};
