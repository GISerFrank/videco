// src/components/hub/dashboard/GoalProgressWidget.tsx
import React from 'react';
import { useGoalStore } from '@/store/goalStore';
import { Link } from 'react-router-dom';
import { Target, TrendingUp } from 'lucide-react';

/**
 * 目标进度小组件
 * 展示活跃目标的进度
 */
export const GoalProgressWidget: React.FC = () => {
  const { goals } = useGoalStore();

  // 获取进行中的目标
  const activeGoals = goals.filter((g) => g.status === 'in-progress').slice(0, 3);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            目标进度
          </h2>
        </div>
        <Link
          to="/goals"
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          查看全部
        </Link>
      </div>

      {activeGoals.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-400 dark:text-gray-500 mb-2">
            还没有进行中的目标
          </div>
          <Link
            to="/goals/create"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            创建第一个目标
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {activeGoals.map((goal) => (
            <div
              key={goal.id}
              className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    {goal.title}
                  </h3>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>{goal.type}</span>
                    {goal.targetDate && (
                      <>
                        <span>•</span>
                        <span>
                          目标日期:{' '}
                          {new Date(goal.targetDate).toLocaleDateString('zh-CN')}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-sm font-semibold text-blue-600 dark:text-blue-400">
                  <TrendingUp className="h-4 w-4" />
                  <span>{goal.progress}%</span>
                </div>
              </div>

              {/* 进度条 */}
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div
                  className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>

              {/* 里程碑进度 */}
              {goal.milestones.length > 0 && (
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  {goal.milestones.filter((m) => m.isCompleted).length} /{' '}
                  {goal.milestones.length} 里程碑已完成
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
