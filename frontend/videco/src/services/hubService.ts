// src/services/hubService.ts
import axios from 'axios';
import {
  VideoConsumptionStats,
  KnowledgeGrowthStats,
  HabitData,
  TimelineActivity,
  DashboardState,
} from '@/types/hub.types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 个人中心服务
 */
export const hubService = {
  /**
   * 获取仪表板数据
   */
  async getDashboardData(): Promise<{
    dashboard: DashboardState;
    videoStats: VideoConsumptionStats;
    knowledgeStats: KnowledgeGrowthStats;
  }> {
    // TODO: 替换为真实 API 调用
    // const response = await api.get('/hub/dashboard');
    // return response.data;

    // Mock 数据
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          dashboard: {
            widgets: [],
            lastUpdated: new Date().toISOString(),
            isLoading: false,
          },
          videoStats: {
            totalWatchTime: 1250,
            videosWatched: 45,
            averageWatchTime: 27.8,
            mostWatchedCategory: '旅行',
            watchTimeByCategory: [],
            watchTimeByDay: [],
            currentStreak: 7,
            longestStreak: 14,
          },
          knowledgeStats: {
            totalNotes: 128,
            totalTags: 45,
            notesThisWeek: 12,
            notesThisMonth: 48,
            growthTrend: [],
            topTags: [],
            knowledgeDensity: 2.84,
          },
        });
      }, 500);
    });
  },

  /**
   * 获取视频消费统计
   */
  async getVideoStats(timeRange?: string): Promise<VideoConsumptionStats> {
    // const response = await api.get('/hub/video-stats', { params: { timeRange } });
    // return response.data;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalWatchTime: 1250,
          videosWatched: 45,
          averageWatchTime: 27.8,
          mostWatchedCategory: '旅行',
          watchTimeByCategory: [
            { category: '旅行', watchTime: 450, percentage: 36, videoCount: 15 },
            { category: '学习', watchTime: 380, percentage: 30.4, videoCount: 12 },
          ],
          watchTimeByDay: [],
          currentStreak: 7,
          longestStreak: 14,
        });
      }, 300);
    });
  },

  /**
   * 获取知识增长统计
   */
  async getKnowledgeStats(timeRange?: string): Promise<KnowledgeGrowthStats> {
    // const response = await api.get('/hub/knowledge-stats', { params: { timeRange } });
    // return response.data;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalNotes: 128,
          totalTags: 45,
          notesThisWeek: 12,
          notesThisMonth: 48,
          growthTrend: [],
          topTags: [
            { tag: '咖啡', count: 23, growth: 15 },
            { tag: '日本旅行', count: 18, growth: 20 },
          ],
          knowledgeDensity: 2.84,
        });
      }, 300);
    });
  },

  /**
   * 获取习惯数据
   */
  async getHabits(): Promise<HabitData[]> {
    // const response = await api.get('/hub/habits');
    // return response.data;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'habit-1',
            name: '每日心流模式',
            description: '每天使用心流模式观看至少 30 分钟',
            targetFrequency: 'daily',
            currentStreak: 7,
            longestStreak: 14,
            completionHistory: [],
            relatedGoalId: 'goal-1',
          },
        ]);
      }, 300);
    });
  },

  /**
   * 创建习惯
   */
  async createHabit(habit: Omit<HabitData, 'id'>): Promise<HabitData> {
    // const response = await api.post('/hub/habits', habit);
    // return response.data;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: `habit-${Date.now()}`,
          ...habit,
        });
      }, 300);
    });
  },

  /**
   * 更新习惯
   */
  async updateHabit(habitId: string, updates: Partial<HabitData>): Promise<HabitData> {
    // const response = await api.patch(`/hub/habits/${habitId}`, updates);
    // return response.data;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: habitId,
          ...updates,
        } as HabitData);
      }, 300);
    });
  },

  /**
   * 完成习惯打卡
   */
  async completeHabit(habitId: string, date: string): Promise<void> {
    // await api.post(`/hub/habits/${habitId}/complete`, { date });

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 300);
    });
  },

  /**
   * 获取时间线活动
   */
  async getTimeline(limit?: number): Promise<TimelineActivity[]> {
    // const response = await api.get('/hub/timeline', { params: { limit } });
    // return response.data;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'activity-1',
            type: 'video-watched',
            title: '观看了《京都秋日漫步》',
            timestamp: new Date().toISOString(),
            metadata: {
              videoId: 'video-1',
              videoTitle: '京都秋日漫步',
              tags: ['旅行', '日本'],
            },
          },
          {
            id: 'activity-2',
            type: 'note-created',
            title: '创建了新笔记',
            description: '关于咖啡拉花的技巧',
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            metadata: {
              noteId: 'note-1',
              tags: ['咖啡', '技能'],
            },
          },
        ]);
      }, 300);
    });
  },

  /**
   * 保存仪表板配置
   */
  async saveDashboardConfig(dashboard: DashboardState): Promise<void> {
    // await api.put('/hub/dashboard/config', dashboard);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 300);
    });
  },
};
