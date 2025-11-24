// src/components/hub/dashboard/HabitTrackerWidget.tsx
import React from 'react';
import { useHubStore } from '@/store/hubStore';
import { CheckCircle, Circle } from 'lucide-react';

/**
 * 习惯追踪小组件
 * 展示今日习惯完成情况
 */
export const HabitTrackerWidget: React.FC = () => {
  const { habits } = useHubStore();

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          今日习惯
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {habits.filter((h) =>
            h.completionHistory.some(
              (c) => c.date === today && c.completed
            )
          ).length}{' '}
          / {habits.length} 已完成
        </span>
      </div>

      {habits.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-400 dark:text-gray-500 mb-2">
            还没有创建习惯
          </div>
          <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            创建第一个习惯
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {habits.map((habit) => {
            const isCompletedToday = habit.completionHistory.some(
              (c) => c.date === today && c.completed
            );

            return (
              <div
                key={habit.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-3 flex-1">
                  {isCompletedToday ? (
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  )}
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {habit.name}
                    </div>
                    {habit.description && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {habit.description}
                      </div>
                    )}
                  </div>
                </div>

                {/* 连续天数 */}
                {habit.currentStreak > 0 && (
                  <div className="flex items-center space-x-1 text-sm">
                    <span className="text-orange-600 dark:text-orange-400">
                      🔥
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {habit.currentStreak}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 最长连续记录 */}
      {habits.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              最长连续记录
            </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {Math.max(...habits.map((h) => h.longestStreak), 0)} 天
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
