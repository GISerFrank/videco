// src/components/hub/dashboard/KnowledgeGrowthChart.tsx
import React from 'react';
import { useHubStore } from '@/store/hubStore';

/**
 * 知识增长图表
 * 展示笔记数量和标签统计
 */
export const KnowledgeGrowthChart: React.FC = () => {
  const { knowledgeStats } = useHubStore();

  if (!knowledgeStats) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  const { totalNotes, totalTags, notesThisWeek, notesThisMonth, topTags } =
    knowledgeStats;

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          知识增长
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          累计
        </span>
      </div>

      {/* 统计数据 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
            {totalNotes}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            总笔记数
          </div>
        </div>
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
            {totalTags}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            总标签数
          </div>
        </div>
      </div>

      {/* 增长趋势 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            本周新增
          </span>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            +{notesThisWeek} 笔记
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            本月新增
          </span>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            +{notesThisMonth} 笔记
          </span>
        </div>
      </div>

      {/* 热门标签 */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          热门标签
        </h3>
        <div className="space-y-2">
          {topTags.map((tag, index) => (
            <div
              key={tag.tag}
              className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
            >
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                  #{index + 1}
                </span>
                <span className="text-sm text-gray-900 dark:text-white">
                  {tag.tag}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {tag.count}
                </span>
                {tag.growth > 0 && (
                  <span className="text-xs text-green-600 dark:text-green-400">
                    +{tag.growth}%
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
