// src/components/hub/dashboard/VideoConsumptionChart.tsx
import React from 'react';
import { useHubStore } from '@/store/hubStore';

/**
 * 视频消费统计图表
 * 展示不同类别的观看时长分布
 */
export const VideoConsumptionChart: React.FC = () => {
  const { videoStats } = useHubStore();

  if (!videoStats) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  const { watchTimeByCategory } = videoStats;

  // 计算总时长用于百分比计算
  const totalTime = watchTimeByCategory.reduce(
    (sum, cat) => sum + cat.watchTime,
    0
  );

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          视频消费分布
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          本月
        </span>
      </div>

      {/* 分类列表 */}
      <div className="space-y-4">
        {watchTimeByCategory.map((category, index) => {
          const percentage = (category.watchTime / totalTime) * 100;
          const colors = [
            'bg-blue-500',
            'bg-green-500',
            'bg-orange-500',
            'bg-purple-500',
            'bg-pink-500',
          ];
          const color = colors[index % colors.length];

          return (
            <div key={category.category}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {category.category}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {category.videoCount} 个视频
                  </span>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {category.watchTime} 分钟
                </span>
              </div>

              {/* 进度条 */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`${color} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* 总结 */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            总计
          </span>
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            {totalTime} 分钟
          </span>
        </div>
      </div>
    </div>
  );
};
