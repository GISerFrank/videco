// src/pages/PersonalHubPage.tsx
import React, { useEffect } from 'react';
import { useHubStore } from '@/store/hubStore';
import { useGoalStore } from '@/store/goalStore';
import { useInsightsStore } from '@/store/insightsStore';
import { DashboardGrid } from '@/components/hub/dashboard/DashboardGrid';
import { InsightsPanel } from '@/components/hub/insights/InsightsPanel';

/**
 * 个人中心页面
 * 生态系统的核心枢纽，展示用户的成长数据、目标进度、AI 洞察等
 */
export const PersonalHubPage: React.FC = () => {
  const { fetchDashboardData, isLoading, error } = useHubStore();
  const { fetchGoals } = useGoalStore();
  const { fetchInsights } = useInsightsStore();

  useEffect(() => {
    // 加载所有必要数据
    const loadData = async () => {
      await Promise.all([
        fetchDashboardData(),
        fetchGoals(),
        fetchInsights(),
      ]);
    };

    loadData();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-2">加载失败</div>
          <div className="text-gray-600 dark:text-gray-400">{error}</div>
          <button
            onClick={() => fetchDashboardData()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            个人中心
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            查看你的视频生活轨迹和成长数据
          </p>
        </header>

        {/* AI 洞察面板 */}
        <div className="mb-6">
          <InsightsPanel />
        </div>

        {/* 仪表板网格 */}
        <div className="mb-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <DashboardGrid />
          )}
        </div>

        {/* 快捷操作 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickActionCard
            title="创建目标"
            description="设定新的学习或实践目标"
            icon="🎯"
            onClick={() => {
              // TODO: 打开创建目标弹窗
              console.log('创建目标');
            }}
          />
          <QuickActionCard
            title="浏览视频"
            description="发现新的精彩内容"
            icon="🎬"
            onClick={() => {
              window.location.href = '/video-space';
            }}
          />
          <QuickActionCard
            title="查看知识图谱"
            description="探索你的知识网络"
            icon="🧠"
            onClick={() => {
              window.location.href = '/knowledge-graph';
            }}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * 快捷操作卡片
 */
const QuickActionCard: React.FC<{
  title: string;
  description: string;
  icon: string;
  onClick: () => void;
}> = ({ title, description, icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow text-left"
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </button>
  );
};
