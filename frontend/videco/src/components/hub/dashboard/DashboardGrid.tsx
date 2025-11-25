// src/components/hub/dashboard/DashboardGrid.tsx
import React from 'react';
import { useHubStore } from '@/store/hubStore';
import { StatsCard } from './StatsCard';
import { VideoConsumptionChart } from './VideoConsumptionChart';
import { KnowledgeGrowthChart } from './KnowledgeGrowthChart';
import { GoalProgressWidget } from './GoalProgressWidget';
import { HabitTrackerWidget } from './HabitTrackerWidget';

/**
 * 仪表板网格布局
 * 展示各种统计卡片和图表
 */
export const DashboardGrid: React.FC = () => {
  const { videoStats, knowledgeStats, dashboard } = useHubStore();

  return (
    <div className="space-y-6">
      {/* 顶部统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="总观看时长"
          value={`${videoStats?.totalWatchTime || 0} 分钟`}
          subtitle={`${videoStats?.videosWatched || 0} 个视频`}
          icon="🎬"
          trend={{ value: 12, isPositive: true }}
          color="blue"
        />
        <StatsCard
          title="知识笔记"
          value={`${knowledgeStats?.totalNotes || 0}`}
          subtitle={`本月 +${knowledgeStats?.notesThisMonth || 0}`}
          icon="📝"
          trend={{ value: 8, isPositive: true }}
          color="green"
        />
        <StatsCard
          title="当前连续天数"
          value={`${videoStats?.currentStreak || 0} 天`}
          subtitle={`最长 ${videoStats?.longestStreak || 0} 天`}
          icon="🔥"
          color="orange"
        />
        <StatsCard
          title="知识密度"
          value={knowledgeStats?.knowledgeDensity?.toFixed(2) || '0.00'}
          subtitle="笔记/视频"
          icon="🧠"
          color="purple"
        />
      </div>

      {/* 图表区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VideoConsumptionChart />
        <KnowledgeGrowthChart />
      </div>

      {/* 目标和习惯追踪 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GoalProgressWidget />
        <HabitTrackerWidget />
      </div>
    </div>
  );
};
